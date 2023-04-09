import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../config/FirebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Componenets
import Logo from '../components/Logo';
import RegisterationForm from '../components/RegistrationForm';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
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

  handleGenderChange = (gender) => {
    this.setState({ gender: gender }); ``
  };

  handleDateOfBirthChange = (dateOfBirth) => {
    this.setState({ dateOfBirth: dateOfBirth }); ``
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword: confirmPassword });
  };

  handleHobbiesChange = (hobbies) => {
    this.setState({ hobbies: hobbies });
  };

  handleMovieGenresChange = (movieGenres) => {
    this.setState({ movieGenres: movieGenres });
  };

  handleFavorsChange = (favors) => {
    this.setState({ favors: favors });
  };

  handleDegreesChange = (degrees) => {
    this.setState({ degrees: degrees });
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
          handleFirstNameChange={this.handleFirstNameChange}
          lastName={this.state.lastName}
          handleLastNameChange={this.handleLastNameChange}
          email={this.state.email}
          handleEmailChange={this.handleEmailChange}
          phone={this.state.phone}
          handlePhoneChange={this.handlePhoneChange}
          gender={this.state.gender}
          handleGenderChange={this.handleGenderChange}
          dateOfBirth={this.state.dateOfBirth}
          handleDateOfBirthChange={this.handleDateOfBirthChange}
          password={this.state.password}
          handlePasswordChange={this.handlePasswordChange}
          confirmPassword={this.state.confirmPassword}
          handleConfirmPasswordChange={this.handleConfirmPasswordChange}
          hobbies={this.state.hobbies}
          handleHobbiesChange={this.handleHobbiesChange}
          movieGenres={this.state.movieGenres}
          handleMovieGenresChange={this.handleMovieGenresChange}
          favors={this.state.favors}
          handleFavorsChange={this.handleFavorsChange}
          degrees={this.state.degrees}
          handleDegreesChange={this.handleDegreesChange}
          onFormSubmit={this.onRegister} />
      </View>
    );
  }
}
