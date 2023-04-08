import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Add your logo image here */}
        <Image source={require('./../assets/icon.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>New user? Sign up here</Text>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#f2f2f7',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default LoginPage;
