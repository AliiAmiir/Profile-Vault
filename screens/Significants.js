import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const Significants = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Significants</Text>
      <ScrollView style={styles.scrollContainer}>
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
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addSignificant}>
          <Text style={styles.addButtonText}>Add Significant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    maxHeight: '70%',
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
    marginBottom: 10,
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
    marginBottom: 60,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Significants;