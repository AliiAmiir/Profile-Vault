import React, { Component } from 'react';
import { View } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/FirebaseConfig';
import Logo from '../components/Logo';
import { containerStyles } from '../styles/globalStyle';
import RegisterationForm from '../components/RegisterationForm';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
      username: null,
      password: '',
    }
  }

  onRegister = async () => {
    try {
      const username = this.state.username;
      const password = this.state.password;

      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
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
        <RegisterationForm />
      </View>
    );
  }
}
