import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegisterPage = () => {
  const [date, setDate] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Add your logo image here */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Hobbies"
            autoCapitalize="sentences"
          />
          <TextInput
            style={styles.input}
            placeholder="Favors"
            autoCapitalize="sentences"
          />
        </View>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={date}
            onChangeText={setDate}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Movie Genres"
            autoCapitalize="sentences"
          />
          <TextInput
            style={styles.input}
            placeholder="Degrees"
            autoCapitalize="sentences"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#f2f2f7',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 150,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  signupButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
  },
  signupButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default RegisterPage;
