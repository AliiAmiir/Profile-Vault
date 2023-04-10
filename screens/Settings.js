import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { auth } from '../config/FirebaseConfig';
import { collection, query, where, doc, getDocs, limit } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Componenets
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
      phone: ''
    }
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
    const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs[0].data();

    this.setState({
      loading: false,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
      phone: userData.phone
    });
  }

  handleFirstNameChange = (firstName) => {
    this.setState({ firstName: firstName }); ``
  };

  handleLastNameChange = (lastName) => {
    this.setState({ lastName: lastName }); ``
  };

  handleEmailChange = (email) => {
    this.setState({ email: email }); ``
  };

  handlePhoneChange = (phone) => {
    this.setState({ phone: phone }); ``
  };

  handleDateOfBirthChange = (dateOfBirth) => {
    this.setState({ dateOfBirth: dateOfBirth }); ``
  };

  handleCurrentPasswordChange = (currentPassword) => {
    this.setState({ currentPassword: currentPassword });
  };

  handleNewPasswordChange = (newPassword) => {
    this.setState({ newPassword: newPassword });
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <ScrollView>
          <View style={containerStyles.textInputContainer}>
            <FormInputText label="First Name" value={this.state.firstName} onChangeText={this.handleFirstNameChange} autoCapitalize="sentences" />
            <FormInputText label="Last Name" value={this.state.lastName} onChangeText={this.handleLastNameChange} autoCapitalize="sentences" />
            <FormInputText label="Date of Birth" value={this.state.dateOfBirth} onChangeText={this.handleDateOfBirthChange} autoCapitalize="sentences" />
            <FormInputText label="Email" value={this.state.email} onChangeText={this.handleEmailChange} autoCapitalize="sentences" />
            <FormInputText label="Phone" value={this.state.phone} onChangeText={this.handlePhoneChange} autoCapitalize="sentences" />
            <FormInputText label="Current Password" value={this.state.gender} onChangeText={this.handleCurrentPasswordChange} secureTextEntry />
            <FormInputText label="New Password" value={this.state.gender} onChangeText={this.handleNewPasswordChange} secureTextEntry />
          </View>
          <View style={containerStyles.buttonContainer}>
            <FormButton title='Save Changes' />
            <FormButton title='Logout' color={'#CD5151'} textColor={'#FFFFFF'} onPress={this.handleSignOut} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
