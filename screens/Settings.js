import React, { Component } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchUserById, updateUser } from '../repository/userRepository';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormText from '../components/FormText';
import FormInputText from '../components/FormInputText';
import CustomDatePicker from '../components/CustomDatePicker';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      currentPassword: '',
      confirmPassword: '',
      newPassword: '',
      dateOfBirth: new Date(),
      phone: '',
      userDocKey: '',
      showDatePicker: false,
      enablePasswordChange: false,
      showEditUserForm: false,
    }
  }

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dateOfBirth;
    this.setState({ dateOfBirth: currentDate });
  };

  handleShowEditUserForm = () => {
    this.setState({ showEditUserForm: !this.state.showEditUserForm });
  }

  handleEnablePasswordChange = () => {
    this.setState({ enablePasswordChange: !this.state.enablePasswordChange });
  }

  handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.fetchUserData();
  }

  componentWillUnmount() {

  }

  async fetchUserData() {
    try {
      const response = await fetchUserById(auth.currentUser.uid);
      
      if (!response || !response.success) {
        Alert.alert('Unable to fetch user details');
        return;
      }

      const userData = response.data;

      this.setState({
        loading: false,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone,
        userDocKey: userData.userDocKey,
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleUserReauthentication = async () => {
    try {
      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(user.email, this.state.currentPassword);

      await reauthenticateWithCredential(user, credentials);

      return true;
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Invalid password');
        return false;
      } else {
        throw error;
      }
    }
  }

  handlePasswordValidation = async () => {
    try {
      if (!this.state.currentPassword) {
        Alert.alert('Current password can not be empty');
        return false;
      }

      if (this.state.currentPassword !== this.state.confirmPassword) {
        Alert.alert('Current and Confirm Password do not match');
        return false;
      }

      const reAuthValidation = await this.handleUserReauthentication();

      return reAuthValidation;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  handleUpdatePassword = async () => {
    try {
      const passwordValidation = await this.handlePasswordValidation();

      if (passwordValidation) {
        await updatePassword(auth.currentUser, this.state.newPassword);

        Alert.alert('Password Updated');
        this.handleShowEditUserForm();
      }
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/weak-password') {
        Alert.alert('Weak password, less than 6 characters');
      } else {
        Alert.alert('Unexpected Error Occurred');
      }
    }
  };

  handleUpdateUser = async () => {
    try {
      const passwordValidation = await this.handlePasswordValidation();

      if (passwordValidation) {
        const userDetails = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phone: this.state.phone,
          dateOfBirth: this.state.dateOfBirth
        };

        const response = await updateUser(this.state.userDocKey, userDetails);

        if (response.success) {
          Alert.alert('User Updated');
          this.handleShowEditUserForm();
        } else {
          Alert.alert('Unexpected Error Occurred');
        }
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        {!this.state.showEditUserForm && (
          <ScrollView>
            <View style={containerStyles.textInputContainer}>
              <View style={containerStyles.rowContainer}>
                <FormText label="First Name" value={this.state.firstName} />
                <FormText label="Last Name" value={this.state.lastName} />
              </View>
              <FormText label="Gender" value={this.state.gender} />
              <FormText label={'Date of Birth'} value={this.state.dateOfBirth.toLocaleDateString()} />
              <FormText label="Email" value={this.state.email} />
              <FormText label="Phone" keyboardType={'phone-pad'} value={this.state.phone} />
            </View>
            <View style={containerStyles.buttonContainer}>
              <FormButton title='Logout' color={'#CD5151'} textColor={'#FFFFFF'} onPress={this.handleSignOut} />
            </View>
          </ScrollView>
        )}

        {this.state.showEditUserForm && (<FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditUserForm} />)}

        {!this.state.showEditUserForm && (<FormButton title='Edit User Details' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditUserForm} />)}

        {this.state.showEditUserForm && (
          <ScrollView>
            <View style={containerStyles.textInputContainer}>
              <View style={containerStyles.rowContainer}>
                <FormInputText label="First Name" value={this.state.firstName} onChangeText={(value) => this.handleChange('firstName', value)} autoCapitalize="sentences" />
                <FormInputText label="Last Name" value={this.state.lastName} onChangeText={(value) => this.handleChange('lastName', value)} autoCapitalize="sentences" />
              </View>
              <CustomDatePicker label={'Date of Birth'} dateOfBirth={this.state.dateOfBirth} showDatePicker={this.state.showDatePicker} handleDateChange={this.handleDateChange} handleShowDatePicker={this.handleShowDatePicker} maximumDate={new Date()} />
              <FormText label="Email (Not Editable)" value={this.state.email} />
              <FormInputText label="Phone" keyboardType={'phone-pad'} value={this.state.phone} onChangeText={(value) => this.handleChange('phone', value)} autoCapitalize="sentences" />
              <FormInputText label="Current Password" value={this.state.currentPassword} onChangeText={(value) => this.handleChange('currentPassword', value)} secureTextEntry />
              <FormInputText label="Confirm Password" value={this.state.confirmPassword} onChangeText={(value) => this.handleChange('confirmPassword', value)} secureTextEntry />

              {this.state.enablePasswordChange && (<FormButton title='Cancel Password Update' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleEnablePasswordChange} />)}
              {!this.state.enablePasswordChange && (<FormButton title='Edit Password' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleEnablePasswordChange} />)}

              {this.state.enablePasswordChange && (
                <View>
                  <FormInputText label="New Password" value={this.state.newPassword} onChangeText={(value) => this.handleChange('newPassword', value)} secureTextEntry />
                  <FormButton title='Update Password' onPress={this.handleUpdatePassword} />
                  <Text style={textStyles.subText}>This button will only update the password</Text>
                </View>
              )}
            </View>
            <View style={containerStyles.buttonContainer}>
              <FormButton title='Save Changes' onPress={this.handleUpdateUser} />
              <Text style={textStyles.subText}>This button will only update the user details</Text>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
