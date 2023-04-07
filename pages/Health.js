import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const HealthPage = () => {
  const [healthRecords, setHealthRecords] = useState([]);

  const addRecord = () => {
    setHealthRecords([
      ...healthRecords,
      { lastCheckUp: '', diagnosis: '', medicines: '', duration: '' },
    ]);
  };

  const saveChanges = () => {
    // Save changes here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health</Text>
      {healthRecords.map((record, index) => (
        <View key={index} style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder="Last Check-up Date"
            value={record.lastCheckUp}
            onChangeText={(text) => {
              const newRecords = [...healthRecords];
              newRecords[index].lastCheckUp = text;
              setHealthRecords(newRecords);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Diagnosis"
            value={record.diagnosis}
            onChangeText={(text) => {
              const newRecords = [...healthRecords];
              newRecords[index].diagnosis = text;
              setHealthRecords(newRecords);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Medicines"
            value={record.medicines}
            onChangeText={(text) => {
              const newRecords = [...healthRecords];
              newRecords[index].medicines = text;
              setHealthRecords(newRecords);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration"
            value={record.duration}
            onChangeText={(text) => {
              const newRecords = [...healthRecords];
              newRecords[index].duration = text;
              setHealthRecords(newRecords);
            }}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addRecord}>
        <Text style={styles.addButtonText}>Add Health Record</Text>
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
    paddingTop: 30,
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

export default HealthPage;
