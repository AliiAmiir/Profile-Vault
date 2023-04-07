import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const TripsPage = () => {
  const [trips, setTrips] = useState([]);

  const addTrip = () => {
    setTrips([...trips, { city: '', dates: '', cost: '', hotel: '' }]);
  };

  const saveChanges = () => {
    // Save changes here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trips</Text>
      {trips.map((trip, index) => (
        <View key={index} style={styles.item}>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={trip.city}
            onChangeText={(text) => {
              const newTrips = [...trips];
              newTrips[index].city = text;
              setTrips(newTrips);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Dates"
            value={trip.dates}
            onChangeText={(text) => {
              const newTrips = [...trips];
              newTrips[index].dates = text;
              setTrips(newTrips);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Cost"
            value={trip.cost}
            onChangeText={(text) => {
              const newTrips = [...trips];
              newTrips[index].cost = text;
              setTrips(newTrips);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Hotel"
            value={trip.hotel}
            onChangeText={(text) => {
              const newTrips = [...trips];
              newTrips[index].hotel = text;
              setTrips(newTrips);
            }}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addTrip}>
        <Text style={styles.addButtonText}>Add Trip</Text>
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

export default TripsPage;
