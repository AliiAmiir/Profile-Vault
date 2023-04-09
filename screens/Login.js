import React from 'react';
import { View } from 'react-native';
import Logo from '../components/Logo';
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import { containerStyles } from '../styles/globalStyle';

export default function LoginPage({ navigation }) {
  const handleRegistrationNavigation = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={containerStyles.defaultContainer}>
      <Logo />
      <View style={containerStyles.textInputContainer}>
        <FormInputText label="Email" placeholder="john.smith@comany.com" autoCapitalize="sentences" />
        <FormInputText label="Password" placeholder="password" secureTextEntry />
      </View>
      <View style={containerStyles.buttonContainer}>
        <FormButton title='Login' />
        <FormButton title='New User? Sign Up Here!' color={'#F2F2F7'} textColor={'#000000'} onPress={() => handleRegistrationNavigation()} />
      </View>
    </View>
  );
};


