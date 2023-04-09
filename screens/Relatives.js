import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Relatives = () => {
  const [relatives, setRelatives] = useState([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const addRelative = () => {
    setRelatives([...relatives, { name, relation, dateOfBirth }]);
    setName('');
    setRelation('');
    setDateOfBirth('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatives</Text>
      <ScrollView style={styles.scrollContainer}>
        {relatives.map((relative, index) => (
          <View key={index} style={styles.relativeContainer}>
            <View style={styles.inputsWrapper}>
              <TextInput
                value={relative.name}
                onChangeText={(text) => {
                  const updatedRelatives = [...relatives];
                  updatedRelatives[index].name = text;
                  setRelatives(updatedRelatives);
                }}
                placeholder="Name"
                style={styles.input}
              />
              <TextInput
                value={relative.relation}
                onChangeText={(text) => {
                  const updatedRelatives = [...relatives];
                  updatedRelatives[index].relation = text;
                  setRelatives(updatedRelatives);
                }}
                placeholder="Relation"
                style={styles.input}
              />
              <TextInput
                value={relative.dateOfBirth}
                onChangeText={(text) => {
                  const updatedRelatives = [...relatives];
                  updatedRelatives[index].dateOfBirth = text;
                  setRelatives(updatedRelatives);
                }}
                placeholder="Date of Birth (MM/DD/YYYY)"
                style={styles.input}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addRelativeContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
        <TextInput
          value={relation}
          onChangeText={setRelation}
          placeholder="Relation"
          style={styles.input}
        />
        <TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          placeholder="Date of Birth (MM/DD/YYYY)"
          style={styles.input}
        />
        <TouchableOpacity onPress={addRelative} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Relative</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  scrollContainer: {
    maxHeight: '70%',
    marginBottom: 20,
  },
  relativeContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputsWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    borderColor: '#6374D1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 5,
  },
  addRelativeContainer: {
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6374D1',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
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
    width: '100%',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Relatives;
