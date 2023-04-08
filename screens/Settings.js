import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Date of Birth" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Phone" />
      <TextInput style={styles.input} placeholder="Gender" />
      <TextInput style={styles.input} placeholder="Current Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  input: {
    height: 40,
    backgroundColor: '#f2f2f7',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: '#FFA6A6',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
  },
  logoutButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
});
