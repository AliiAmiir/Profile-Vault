import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const SignificantsPage = () => {
  const [significants, setSignificants] = useState([]);

  const addSignificant = () => {
    setSignificants([
      ...significants,
      { name: '', relationship: '', dob: '', anniversary: '' },
    ]);
  };

  const saveChanges = () => {
    // Save changes here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Significants</Text>
      {significants.map((significant, index) => (
        <View key={index} style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={significant.name}
            onChangeText={(text) => {
              const newSignificants = [...significants];
              newSignificants[index].name = text;
              setSignificants(newSignificants);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Relationship"
            value={significant.relationship}
            onChangeText={(text) => {
              const newSignificants = [...significants];
              newSignificants[index].relationship = text;
              setSignificants(newSignificants);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={significant.dob}
            onChangeText={(text) => {
              const newSignificants = [...significants];
              newSignificants[index].dob = text;
              setSignificants(newSignificants);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Anniversary"
            value={significant.anniversary}
            onChangeText={(text) => {
              const newSignificants = [...significants];
              newSignificants[index].anniversary = text;
              setSignificants(newSignificants);
            }}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addSignificant}>
        <Text style={styles.addButtonText}>Add Significant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6374D1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#6374D1',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignificantsPage;
