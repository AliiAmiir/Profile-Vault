import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";

// Import Utils
import { isSignUpEnabledCheck, validateRegistrationFields } from '../utils/validationUtil';
import { genderPickerOptions } from '../utils/pickerOptions';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import Logo from '../components/Logo';
import RegisterationForm from '../components/RegistrationForm';

// Import Repositories
import { saveUser } from '../repository/userRepository';
import { saveFavorCategoriesBatch } from '../repository/favorsRepository';
import { saveMoviePreferences } from '../repository/preferencesRepository';

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
      showGenderPicker: false,
      dateOfBirth: new Date(),
      showDatePicker: false,
      password: '',
      confirmPassword: '',
      movieGenres: '',
      favors: '',
    }
  }

  handleShowGenderPicker = () => {
    this.setState({ showGenderPicker: !this.state.showGenderPicker });
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dateOfBirth;
    this.setState({ dateOfBirth: currentDate });
  };

  handleChange = (key, value) => {
    if (key === 'password') {
      this.setState({ confirmPassword: '' });
    }

    const errors = validateRegistrationFields(key, value, this.state.password, this.state.errors);
    const isSignUpEnabled = isSignUpEnabledCheck(this.state.firstName, this.state.lastName, this.state.email, this.state.phone, this.state.gender, this.state.dateOfBirth, this.state.password, this.state.confirmPassword, errors);
    this.setState({ [key]: value, showDatePicker: false, errors: errors, showGenderPicker: false, isSignUpEnabled: isSignUpEnabled });
  };

  onRegister = async () => {
    try {
      const userDetails = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth,
        password: this.state.password,
      };

      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const user = userCredential.user;

      await saveUser(user.uid, userDetails);
      Alert.alert('User Registered Successfully');

      const favorCategories = this.state.favors.split(',');
      if (favorCategories && favorCategories.length > 0) {
        await saveFavorCategoriesBatch(user.uid, favorCategories);
      }

      const movieGenres = this.state.movieGenres.split(',');
      if (movieGenres && movieGenres.length > 0) {
        await saveMoviePreferences(user.uid, movieGenres);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
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
          lastName={this.state.lastName}
          email={this.state.email}
          phone={this.state.phone}
          gender={this.state.gender}
          genderPickerOptions={genderPickerOptions()}
          showGenderPicker={this.state.showGenderPicker}
          handleShowGenderPicker={this.handleShowGenderPicker}
          dateOfBirth={this.state.dateOfBirth}
          showDatePicker={this.state.showDatePicker}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          movieGenres={this.state.movieGenres}
          favors={this.state.favors}
          errors={this.state.errors}
          isSignUpEnabled={this.state.isSignUpEnabled}
          handleShowDatePicker={this.handleShowDatePicker}
          handleDateChange={this.handleDateChange}
          handleChange={this.handleChange}
          onFormSubmit={this.onRegister} />
      </View>
    );
  }
}
