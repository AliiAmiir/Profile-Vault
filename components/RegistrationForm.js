import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormInputText from './FormInputText';
import FormButton from './FormButton';

export default function RegisterationForm({ firstName, lastName, email, phone, gender, dateOfBirth, password, confirmPassword, hobbies, movieGenres, favors, degrees, handleChange, onFormSubmit }) {
  return (
    <View>
      <View style={containerStyles.rowContainer}>
        <View>
          <FormInputText label="First Name" placeholder="John" value={firstName} onChangeText={(value) => handleChange('firstName', value)} autoCapitalize="sentences" />
          <FormInputText label="Email" placeholder="john.smith@company.com" value={email} onChangeText={(value) => handleChange('email', value)} keyboardType="email-address" />
          <FormInputText label="Gender" placeholder="Male" value={gender} onChangeText={(value) => handleChange('gender', value)} autoCapitalize="sentences" />
          <FormInputText label="Password" placeholder="password" value={password} onChangeText={(value) => handleChange('password', value)} secureTextEntry />
          <FormInputText label="Hobbies" placeholder="E.g. Football, Tennis" value={hobbies} onChangeText={(value) => handleChange('hobbies', value)} autoCapitalize="sentences" />
          <FormInputText label="Favors" placeholder="E.g. Gardening, Dog Walking" value={favors} onChangeText={(value) => handleChange('favors', value)} autoCapitalize="sentences" />
        </View>

        <View>
          <FormInputText label="Last Name" placeholder="Smith" value={lastName} onChangeText={(value) => handleChange('lastName', value)} autoCapitalize="sentences" />
          <FormInputText label="Phone" placeholder="4692229999" value={phone} onChangeText={(value) => handleChange('phone', value)} keyboardType="phone-pad" />
          <FormInputText label="Date of Birth" placeholder="MM/DD/YYYY" value={dateOfBirth} onChangeText={(value) => handleChange('dateOfBirth', value)} keyboardType="numbers-and-punctuation" />
          <FormInputText label="Confirm Password" placeholder="confirm password" value={confirmPassword} onChangeText={(value) => handleChange('confirmPassword', value)} secureTextEntry />
          <FormInputText label="Movie Genres" placeholder="E.g. Thriller, Mystery" value={movieGenres} onChangeText={(value) => handleChange('movieGenres', value)} autoCapitalize="sentences" />
          <FormInputText label="Degrees" placeholder="E.g. Bachelors, Masters" value={degrees} onChangeText={(value) => handleChange('degrees', value)} autoCapitalize="sentences" />
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
  handleChange: PropTypes.func,
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