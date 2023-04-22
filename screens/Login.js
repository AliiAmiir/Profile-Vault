import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";

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
      isSignedIn: false,
      email: '',
      password: '',
    }
  }

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleRegistrationNavigation = () => {
    const { navigation } = this.props;
    navigation.navigate('Register');
  };

  onLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
        Alert.alert('Incorrect Email or Password');
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
          <FormInputText keyboardType="email-address" label="Email" placeholder="john.smith@comany.com" value={this.state.email} onChangeText={this.handleEmailChange} />
          <FormInputText label="Password" placeholder="password" value={this.state.password} onChangeText={this.handlePasswordChange} secureTextEntry />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton title='Login' onPress={this.onLogin} />
          <FormButton title='New User? Sign Up Here!' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleRegistrationNavigation} />
        </View>
      </View>
    );
  }
}
