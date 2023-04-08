import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = () => {
    setJobs([...jobs, { title: '', company: '', startDate: '', endDate: '' }]);
  };

  const saveChanges = () => {
    // Save changes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs</Text>
      <ScrollView style={styles.scrollContainer}>
        {jobs.map((job, index) => (
          <View key={index} style={styles.item}>
            <TextInput
              style={styles.input}
              placeholder="Job Title"
              value={job.title}
              onChangeText={(text) => {
                const newJobs = [...jobs];
                newJobs[index].title = text;
                setJobs(newJobs);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Job Company"
              value={job.company}
              onChangeText={(text) => {
                const newJobs = [...jobs];
                newJobs[index].company = text;
                setJobs(newJobs);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date"
              value={job.startDate}
              onChangeText={(text) => {
                const newJobs = [...jobs];
                newJobs[index].startDate = text;
                setJobs(newJobs);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="End Date"
              value={job.endDate}
              onChangeText={(text) => {
                const newJobs = [...jobs];
                newJobs[index].endDate = text;
                setJobs(newJobs);
              }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.addJobContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addJob}>
          <Text style={styles.addButtonText}>Add Job</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.saveButtonContainer}>
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
    marginBottom: 5,
  },
  addJobContainer: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: 60,
    backgroundColor: '#6374D1',
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButtonContainer: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#6374D1',
    borderRadius: 5,
    padding: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default JobsPage;
