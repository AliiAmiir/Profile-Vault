import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const EducationPage = () => {
  const [educations, setEducations] = useState([]);

  const addEducation = () => {
    setEducations([
      ...educations,
      { university: '', degree: '', enrollmentDate: '', graduationDate: '' },
    ]);
  };

  const saveChanges = () => {
    // Save changes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <ScrollView style={styles.scrollContainer}>
        {educations.map((education, index) => (
          <View key={index} style={styles.item}>
            <TextInput
              style={styles.input}
              placeholder="University"
              value={education.university}
              onChangeText={(text) => {
                const newEducations = [...educations];
                newEducations[index].university = text;
                setEducations(newEducations);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Degree"
              value={education.degree}
              onChangeText={(text) => {
                const newEducations = [...educations];
                newEducations[index].degree = text;
                setEducations(newEducations);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enrollment Date"
              value={education.enrollmentDate}
              onChangeText={(text) => {
                const newEducations = [...educations];
                newEducations[index].enrollmentDate = text;
                setEducations(newEducations);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Graduation Date"
              value={education.graduationDate}
              onChangeText={(text) => {
                const newEducations = [...educations];
                newEducations[index].graduationDate = text;
                setEducations(newEducations);
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addEducation}>
          <Text style={styles.addButtonText}>Add Education</Text>
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
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default EducationPage;
