import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { sendPasswordResetEmail } from "firebase/auth";

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import Logo from '../components/Logo';
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: '',
      isResetEnabled: false,
    }
  }

  handleChange = (key, value) => {
    if (key === 'email' && !value || value === '') {
      this.setState({ [key]: value, isResetEnabled: false });
      return;
    }

    const isResetEnabled = this.state.email;
    this.setState({ [key]: value, isResetEnabled: isResetEnabled });
  };

  onResetPassword = async () => {
    try {
      if (!this.state.email) {
        Alert.alert('Required fields missing');
        return;
      }

      await sendPasswordResetEmail(auth, this.state.email);
      Alert.alert('Password Reset Email Sent');

      const { navigation } = this.props;
      navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/missing-password') {
        Alert.alert('Incorrect Email or Password');
      } else {
        Alert.alert('Unexpected Error Occured');
      }
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <Logo />
        <View style={containerStyles.textInputContainer}>
          <FormInputText keyboardType="email-address" label="Email" placeholder="john.smith@comany.com" value={this.state.email} onChangeText={(value) => this.handleChange('email', value)} />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton style title='Reset Password' opacity={this.state.isResetEnabled ? 1 : 0.5} onPress={this.state.isResetEnabled ? this.onResetPassword : null} />
        </View>
      </View>
    );
  }
}
