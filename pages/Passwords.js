import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PasswordsPage = () => {
  const [passwords, setPasswords] = useState([]);

  const addPassword = () => {
    setPasswords([...passwords, { website: '', email: '', password: '', hidden: true }]);
  };

  const updatePassword = (index, field, value) => {
    const newPasswords = [...passwords];
    newPasswords[index][field] = value;
    setPasswords(newPasswords);
  };

  const togglePasswordVisibility = (index) => {
    const newPasswords = [...passwords];
    newPasswords[index].hidden = !newPasswords[index].hidden;
    setPasswords(newPasswords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passwords</Text>
      <ScrollView style={styles.scrollContainer}>
        {passwords.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <TextInput
              style={styles.input}
              placeholder="Website"
              value={entry.website}
              onChangeText={(value) => updatePassword(index, 'website', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={entry.email}
              onChangeText={(value) => updatePassword(index, 'email', value)}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={entry.password}
                onChangeText={(value) => updatePassword(index, 'password', value)}
                secureTextEntry={entry.hidden}
              />
              <TouchableOpacity
                style={styles.visibilityToggle}
                onPress={() => togglePasswordVisibility(index)}>
                <Icon name={entry.hidden ? 'eye-slash' : 'eye'} size={20} color="#6374D1" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={addPassword}>
        <Text style={styles.addButtonText}>Add Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    paddingTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: '70%',
    marginBottom: 20,
  },
  entry: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityToggle: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#6374D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
    
export default PasswordsPage;
