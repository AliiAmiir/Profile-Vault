// ManagePage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const buttons = [
  'Personal Goals',
  'Preferences',
  'Passwords',
  'Relatives',
  'Jobs',
  'Education',
  'Trips',
  'Significants',
  'Health',
  'Favors',
];

const ManagePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage</Text>
      {buttons.map((buttonText, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default ManagePage;
