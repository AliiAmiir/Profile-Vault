import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const buttons = [
  { name: 'Personal Goals', componentName: 'PersonalGoal' },
  { name: 'Preferences', componentName: 'Preferences' },
  { name: 'Passwords', componentName: 'Passwords' },
  { name: 'Relatives', componentName: 'Relatives' },
  { name: 'Jobs', componentName: 'Jobs' },
  { name: 'Education', componentName: 'Education' },
  { name: 'Trips', componentName: 'Trips' },
  { name: 'Significants', componentName: 'Significants' },
  { name: 'Health', componentName: 'Health' },
  { name: 'Favors', componentName: 'Favors' },
];

export default function Manage({ navigation }) {
  const handleButtonPress = (componentName) => {
    navigation.navigate(componentName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage</Text>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleButtonPress(button.componentName)}
        >
          <Text style={styles.buttonText}>{button.name}</Text>
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
