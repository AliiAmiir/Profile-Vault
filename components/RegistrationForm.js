import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import FormInputText from './FormInputText';
import FormButton from './FormButton';
import { containerStyles } from '../styles/globalStyle';

export default function RegisterationForm({ 
  firstName, handleFirstNameChange,
  lastName, handleLastNameChange,
  email, handleEmailChange,
  phone, handlePhoneChange,
  gender, handleGenderChange,
  dateOfBirth, handleDateOfBirthChange,
  password, handlePasswordChange,
  confirmPassword, handleConfirmPasswordChange,
  hobbies, handleHobbiesChange,
  movieGenres, handleMovieGenresChange,
  favors, handleFavorsChange,
  degrees, handleDegreesChange,
  onFormSubmit }) {
  return (
    <View>
      <View style={containerStyles.rowContainer}>
        <View>
          <FormInputText label="First Name" placeholder="John" value={firstName} onChangeText={handleFirstNameChange} autoCapitalize="sentences" />
          <FormInputText label="Email" placeholder="john.smith@company.com" value={email} onChangeText={handleEmailChange} keyboardType="email-address" />
          <FormInputText label="Gender" placeholder="Male" value={gender} onChangeText={handleGenderChange} autoCapitalize="sentences" />
          <FormInputText label="Password" placeholder="password" value={password} onChangeText={handlePasswordChange} secureTextEntry />
          <FormInputText label="Hobbies" placeholder="E.g. Football, Tennis" value={hobbies} onChangeText={handleHobbiesChange} autoCapitalize="sentences" />
          <FormInputText label="Favors" placeholder="E.g. Gardening, Dog Walking" value={favors} onChangeText={handleFavorsChange} autoCapitalize="sentences" />
        </View>

        <View>
          <FormInputText label="Last Name" placeholder="Smith" value={lastName} onChangeText={handleLastNameChange} autoCapitalize="sentences" />
          <FormInputText label="Phone" placeholder="4692229999" value={phone} onChangeText={handlePhoneChange} keyboardType="phone-pad" />
          <FormInputText label="Date of Birth" placeholder="MM/DD/YYYY" value={dateOfBirth} onChangeText={handleDateOfBirthChange} keyboardType="numbers-and-punctuation" />
          <FormInputText label="Confirm Password" placeholder="confirm password" value={confirmPassword} onChangeText={handleConfirmPasswordChange} secureTextEntry />
          <FormInputText label="Movie Genres" placeholder="E.g. Thriller, Mystery" value={movieGenres} onChangeText={handleMovieGenresChange} autoCapitalize="sentences" />
          <FormInputText label="Degrees" placeholder="E.g. Bachelors, Masters" value={degrees} onChangeText={handleDegreesChange} autoCapitalize="sentences" />
        </View>
      </View>

      <View style={containerStyles.buttonContainer}>
        <FormButton title='Sign Up' onPress={onFormSubmit} />
      </View>
    </View>
  );
}

FormInputText.propTypes = {
  firstName: PropTypes.string,
  handleFirstNameChange: PropTypes.func,
  lastName: PropTypes.string,
  handleLastNameChange: PropTypes.func,
  email: PropTypes.string,
  handleEmailChange: PropTypes.func,
  phone: PropTypes.string,
  handlePhoneChange: PropTypes.func,
  gender: PropTypes.string,
  handleGenderChange: PropTypes.func,
  dateOfBirth: PropTypes.string,
  handleDateOfBirthChange: PropTypes.func,
  password: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  confirmPassword: PropTypes.string,
  handleConfirmPasswordChange: PropTypes.func,
  hobbies: PropTypes.string,
  handleHobbiesChange: PropTypes.func,
  movieGenres: PropTypes.string,
  handleMovieGenresChange: PropTypes.func,
  favors: PropTypes.string,
  handleFavorsChange: PropTypes.func,
  degrees: PropTypes.string,
  handleDegreesChange: PropTypes.func,
  onFormSubmit: PropTypes.func
};

FormInputText.defaultProps = {
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