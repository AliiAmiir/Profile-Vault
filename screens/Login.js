import React, { Component } from 'react';
import { View } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Componenets
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
      const email = this.state.email;
      const password = this.state.password;

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential)

      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
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
          <FormInputText label="Email" placeholder="john.smith@comany.com" value={this.state.email} onChangeText={this.handleEmailChange} autoCapitalize="sentences" />
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
