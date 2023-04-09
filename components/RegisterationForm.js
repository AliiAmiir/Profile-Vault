import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import FormInputText from './FormInputText';
import FormButton from './FormButton';
import { containerStyles } from '../styles/globalStyle';

export default class RegisterationForm extends Component {
  static propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    gender: PropTypes.string,
    dateOfBirth: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    hobbies: PropTypes.string,
    movieGenres: PropTypes.string,
    favors: PropTypes.string,
    degrees: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
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
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: '',
    };
  }

  handleFirstNameChange = firstName => {
    this.setState({ firstName });
  };

  handleLastNameChange = lastName => {
    this.setState({ lastName });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePhoneChange = phone => {
    this.setState({ phone });
  };

  handleGenderChange = gender => {
    this.setState({ gender });
  };

  handleDateOfBirthChange = dateOfBirth => {
    this.setState({ dateOfBirth });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleConfirmPasswordChange = confirmPassword => {
    this.setState({ confirmPassword });
  };

  handleHobbiesChange = hobbies => {
    this.setState({ hobbies });
  };

  handleMovieGenresChange = movieGenres => {
    this.setState({ movieGenres });
  };

  handleFavorsChange = favors => {
    this.setState({ favors });
  };

  handleDegreesChange = degrees => {
    this.setState({ degrees });
  };

  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { title, project } = this.state;

    onFormSubmit({
      id,
      title,
      project,
    });
  };

  render() {
    return (
      <View>
        <View style={containerStyles.formContainer}>
          <View>
            <FormInputText placeholder="First Name" autoCapitalize="sentences" />
            <FormInputText placeholder="Email" keyboardType="email-address" />
            <FormInputText placeholder="Gender" autoCapitalize="sentences" />
            <FormInputText placeholder="Password" secureTextEntry />
            <FormInputText placeholder="Hobbies" autoCapitalize="sentences" />
            <FormInputText placeholder="Favors" autoCapitalize="sentences" />
          </View>

          <View>
            <FormInputText placeholder="Last Name" autoCapitalize="sentences" />
            <FormInputText placeholder="Phone" keyboardType="phone-pad" />
            <FormInputText placeholder="MM/DD/YYYY" keyboardType="numbers-and-punctuation" />
            <FormInputText placeholder="Confirm Password" secureTextEntry />
            <FormInputText placeholder="Movie Genres" autoCapitalize="sentences" />
            <FormInputText placeholder="Degrees" autoCapitalize="sentences" />
          </View>
        </View>

        <View style={containerStyles.buttonContainer}>
          <FormButton title='Sign Up' onPress={this.onRegister} />
        </View>
      </View>
    );
  }
}
