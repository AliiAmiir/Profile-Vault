import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView } from 'react-native';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormInputText from './FormInputText';
import FormButton from './FormButton';
import CustomDatePicker from './CustomDatePicker';
import CustomPicker from './CustomPicker';

export default function RegisterationForm({ firstName, lastName, email, phone, gender, genderPickerOptions, showGenderPicker, handleShowGenderPicker, dateOfBirth, showDatePicker, password, confirmPassword, hobbies, movieGenres, favors, degrees, errors, isSignUpEnabled, handleShowDatePicker, handleChange, handleDateChange, onFormSubmit }) {
  return (
    <ScrollView>
      <View style={containerStyles.columnContainer}>
        <View style={containerStyles.rowContainer}>
          <FormInputText label="First Name" placeholder="John" value={firstName} onChangeText={(value) => handleChange('firstName', value)} autoCapitalize="sentences" errorText={errors.firstName || null} />
          <FormInputText label="Last Name" placeholder="Smith" value={lastName} onChangeText={(value) => handleChange('lastName', value)} autoCapitalize="sentences" errorText={errors.lastName || null} />
        </View>

        <View style={containerStyles.rowContainer}>
          <FormInputText label="Phone" placeholder="4692229999" value={phone} onChangeText={(value) => handleChange('phone', value)} keyboardType="phone-pad" errorText={errors.phone || null} />
        <CustomPicker label="Gender" showPicker={showGenderPicker} items={genderPickerOptions} selectedValue={gender} onValueChange={(itemValue, itemIndex) => handleChange('gender', itemValue)} handleShowGenderPicker={handleShowGenderPicker} errorText={errors.gender || null} />
        </View>

        <View style={containerStyles.spaceAround}>
          <FormInputText label="Email" placeholder="john.smith@company.com" value={email} onChangeText={(value) => handleChange('email', value)} keyboardType="email-address" errorText={errors.email || null} />
          <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} />
        </View>

        <View style={containerStyles.rowContainer}>
          <FormInputText label="Password" placeholder="password" value={password} onChangeText={(value) => handleChange('password', value)} secureTextEntry errorText={errors.password || null} />
          <FormInputText label="Confirm Password" placeholder="confirm password" value={confirmPassword} onChangeText={(value) => handleChange('confirmPassword', value)} secureTextEntry errorText={errors.confirmPassword || null} />
        </View>

        <View style={containerStyles.spaceAround}>
          <FormInputText label="Hobbies" placeholder="E.g. Football, Tennis" value={hobbies} onChangeText={(value) => handleChange('hobbies', value)} autoCapitalize="sentences" errorText={errors.hobbies || null} />
          <FormInputText label="Favors" placeholder="E.g. Gardening, Dog Walking" value={favors} onChangeText={(value) => handleChange('favors', value)} autoCapitalize="sentences" errorText={errors.favors || null} />
          <FormInputText label="Movie Genres" placeholder="E.g. Thriller, Mystery" value={movieGenres} onChangeText={(value) => handleChange('movieGenres', value)} autoCapitalize="sentences" errorText={errors.movieGenres || null} />
          <FormInputText label="Degrees" placeholder="E.g. Bachelors, Masters" value={degrees} onChangeText={(value) => handleChange('degrees', value)} autoCapitalize="sentences" errorText={errors.degrees || null} />
        </View>
      </View>

      <View style={containerStyles.buttonContainer}>
        <FormButton title='Sign Up' opacity={isSignUpEnabled ? 1 : 0.5} onPress={isSignUpEnabled ? onFormSubmit : null} />
      </View>
    </ScrollView>
  );
}

FormInputText.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  gender: PropTypes.string,
  genderPickerOptions: PropTypes.arrayOf(PropTypes.object),
  showGenderPicker: PropTypes.bool,
  handleShowGenderPicker: PropTypes.func,
  dateOfBirth: PropTypes.instanceOf(Date),
  showDatePicker: PropTypes.bool,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  hobbies: PropTypes.string,
  movieGenres: PropTypes.string,
  favors: PropTypes.string,
  degrees: PropTypes.string,
  errors: PropTypes.object,
  isSignUpEnabled: PropTypes.bool,
  handleShowDatePicker: PropTypes.func,
  handleChange: PropTypes.func,
  handleDateChange: PropTypes.func,
  onFormSubmit: PropTypes.func
};

FormInputText.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  dateOfBirth: new Date(),
  showDatePicker: false,
  password: '',
  confirmPassword: '',
  hobbies: '',
  movieGenres: '',
  favors: '',
  degrees: '',
  isSignUpEnabled: false,
};