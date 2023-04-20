import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchUserById, updateUser } from '../repository/userRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';

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
      newPassword: '',
      dateOfBirth: '',
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

  handleSaveUser = async () => {
    try {
      if (!this.state.currentPassword || !this.state.newPassword) {
        Alert.alert('Please enter current and new password');
        return;
      }

      const userDetails = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        dateOfBirth: this.state.dateOfBirth
      };

      await updateUser(auth.currentUser.uid, userDetails);
    } catch (error) {
      console.log(error);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>

        {this.state.showEditUserForm && (<FormButton title='Done' onPress={this.handleShowEditUserForm} />)}

        {!this.state.showEditUserForm && (<FormButton title='Edit User Details' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditUserForm} />)}

        {this.state.showEditUserForm && (
          <ScrollView>
            <View style={containerStyles.textInputContainer}>
              <FormInputText label="First Name" value={this.state.firstName} onChangeText={(value) => this.handleChange('firstName', value)} autoCapitalize="sentences" />
              <FormInputText label="Last Name" value={this.state.lastName} onChangeText={(value) => this.handleChange('lastName', value)} autoCapitalize="sentences" />
              <FormInputText label="Date of Birth" value={this.state.dateOfBirth} onChangeText={(value) => this.handleChange('dateOfBirth', value)} autoCapitalize="sentences" />
              <FormInputText label="Email" value={this.state.email} onChangeText={(value) => this.handleChange('email', value)} autoCapitalize="sentences" />
              <FormInputText label="Phone" value={this.state.phone} onChangeText={(value) => this.handleChange('phone', value)} autoCapitalize="sentences" />

              {this.state.enablePasswordChange && (<FormButton title='Done' onPress={this.handleEnablePasswordChange} />)}

              {!this.state.enablePasswordChange && (<FormButton title='Edit Password' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleEnablePasswordChange} />)}

              {this.state.enablePasswordChange && (
                <View>
                  <FormInputText label="Current Password" value={this.state.currentPassword} onChangeText={(value) => this.handleChange('currentPassword', value)} secureTextEntry />
                  <FormInputText label="New Password" value={this.state.newPassword} onChangeText={(value) => this.handleChange('newPassword', value)} secureTextEntry />
                </View>
              )}
            </View>
            <View style={containerStyles.buttonContainer}>
              <FormButton title='Save Changes' onPress={this.handleSaveUser} />
              <FormButton title='Logout' color={'#CD5151'} textColor={'#FFFFFF'} onPress={this.handleSignOut} />
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
