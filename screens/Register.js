import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// Import Utils
import { isSignUpEnabledCheck, validateRegistrationFields } from '../utils/validationUtil';

// Import Configs
import { db, auth } from '../config/FirebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import Logo from '../components/Logo';
import RegisterationForm from '../components/RegistrationForm';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignUpEnabled: false,
      errors: {},
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      hobbies: '',
      movieGenres: '',
      favors: '',
      degrees: '',
    }
  }

  handleChange = (key, value) => {
    const errors = validateRegistrationFields(key, value, this.state.password, this.state.errors);
    const isSignUpEnabled = isSignUpEnabledCheck(this.state.firstName, this.state.lastName, this.state.email, this.state.phone, this.state.gender, this.state.dateOfBirth, this.state.password, this.state.confirmPassword, errors);

    this.setState({[key]: value, 'errors': errors, 'isSignUpEnabled': isSignUpEnabled});
  };

  onRegister = async () => {
    try {
      const email = this.state.email;
      const password = this.state.password;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth,
        hobbies: this.state.hobbies,
        movieGenres: this.state.movieGenres,
        favors: this.state.favors,
        degrees: this.state.degrees,
      });

      Alert.alert('User Registered Successfully');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error occurred while registering a new user');
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
        <RegisterationForm
          firstName={this.state.firstName}
          handleChange={this.handleChange}
          lastName={this.state.lastName}
          email={this.state.email}
          phone={this.state.phone}
          gender={this.state.gender}
          dateOfBirth={this.state.dateOfBirth}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          hobbies={this.state.hobbies}
          movieGenres={this.state.movieGenres}
          favors={this.state.favors}
          degrees={this.state.degrees}
          errors={this.state.errors}
          onFormSubmit={this.onRegister} />
      </View>
    );
  }
}
