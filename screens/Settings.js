import React, { Component } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchUserById, updateUser } from '../repository/userRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
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
      email: '',
      currentPassword: '',
      confirmPassword: '',
      newPassword: '',
      dateOfBirth: new Date(),
      phone: '',
      enablePasswordChange: false,
      showEditUserForm: false,
    }
  }

  handleShowEditUserForm = () => {
    this.setState({ showEditUserForm: !this.state.showEditUserForm });
  }

  handleEnablePasswordChange = () => {
    this.setState({ enablePasswordChange: !this.state.enablePasswordChange });
  }

  handleSignOut = async () => {
    try {
      await auth.signOut();

      const { navigation } = this.props;
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUserData();
  }

  componentWillUnmount() {
    if (this.fetchUserData) {
      this.fetchUserData();
    }
  }

  async fetchUserData() {
    try {
      const userData = await fetchUserById(auth.currentUser.uid);

      this.setState({
        loading: false,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone
      });
    } catch (error) {
      console.log(error);
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
      if (error.message.includes('wrong-password')) {
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
      console.log(error);
      throw error;
    }
  }

  handleUpdateUser = async () => {
    try {
      let passwordValidation = await this.handlePasswordValidation();

      console.log(passwordValidation);
      // if (this.state.enablePasswordChange && !this.state.newPassword) {
      //   Alert.alert('New password can not be empty');
      //   return;
      // }

      // if (!this.state.currentPassword || (this.state.currentPassword !== this.state.confirmPassword)) {
      //   Alert.alert('Current and Confirm Password do not match');
      //   return;
      // }

      // const userDetails = {
      //   firstName: this.state.firstName,
      //   lastName: this.state.lastName,
      //   email: this.state.email,
      //   phone: this.state.phone,
      //   dateOfBirth: this.state.dateOfBirth
      // };

      // await updateUser(auth.currentUser.uid, userDetails);
    } catch (error) {
      console.log(error);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>

        {this.state.showEditUserForm && (<FormButton title='Cancel' onPress={this.handleShowEditUserForm} />)}

        {!this.state.showEditUserForm && (<FormButton title='Edit User Details' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditUserForm} />)}

        {this.state.showEditUserForm && (
          <ScrollView>
            <View style={containerStyles.textInputContainer}>
              <FormInputText label="First Name" value={this.state.firstName} onChangeText={(value) => this.handleChange('firstName', value)} autoCapitalize="sentences" />
              <FormInputText label="Last Name" value={this.state.lastName} onChangeText={(value) => this.handleChange('lastName', value)} autoCapitalize="sentences" />
              <CustomDatePicker label={'Date of Birth'} dateOfBirth={this.state.dateOfBirth} showDatePicker={this.state.showDatePicker} handleDateChange={this.state.handleDateChange} handleShowDatePicker={this.handleShowDatePicker} />
              <FormInputText label="Email" value={this.state.email} onChangeText={(value) => this.handleChange('email', value)} autoCapitalize="sentences" />
              <FormInputText label="Phone" value={this.state.phone} onChangeText={(value) => this.handleChange('phone', value)} autoCapitalize="sentences" />

              <FormInputText label="Current Password" value={this.state.currentPassword} onChangeText={(value) => this.handleChange('currentPassword', value)} secureTextEntry />
              <FormInputText label="Confirm Password" value={this.state.confirmPassword} onChangeText={(value) => this.handleChange('confirmPassword', value)} secureTextEntry />

              {this.state.enablePasswordChange && (<FormButton title='Done' onPress={this.handleEnablePasswordChange} />)}

              {!this.state.enablePasswordChange && (<FormButton title='Edit Password' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleEnablePasswordChange} />)}

              {this.state.enablePasswordChange && (
                <FormInputText label="New Password" value={this.state.newPassword} onChangeText={(value) => this.handleChange('newPassword', value)} secureTextEntry />
              )}
            </View>
            <View style={containerStyles.buttonContainer}>
              <FormButton title='Save Changes' onPress={this.handleUpdateUser} />
              <FormButton title='Logout' color={'#CD5151'} textColor={'#FFFFFF'} onPress={this.handleSignOut} />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
