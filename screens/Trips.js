import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveTrip, fetchUserTrips, updateTrip, deleteTrip } from '../repository/tripsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newTripCity: '',
      newTripDate: '',
      newTripCost: '',
      newTripHotel: '',
      errors: {},
      savedTrips: [],
      displayUpdateButton: true,
    }
  }

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedTrips = this.state.savedTrips;
    let index = savedTrips.findIndex(x => x.key === key);
    let trip = savedTrips[index];
  
    switch (value.field) {
      case 'city':
        trip.city = value.text; // update the correct property
        break;
      case 'dates':
        trip.dates = value.text; // update the correct property
        break;
      case 'cost':
        trip.cost = value.text; // update the correct property
        break;
      case 'hotel':
        trip.hotel = value.text; // update the correct property
        break;
      default:
        break;
    }
  
    // Add validation
      
    this.setState({ savedTrips: savedTrips });
  };
  

  handleSaveTrips = async () => {
    try {
      const response = await saveTrip(auth.currentUser.uid, this.state.newTripCity, this.state.newTripDate, this.state.newTripCost, this.state.newTripHotel);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Trip');
        this.setState({ newTripCity: '', newTripDate: '', newTripCost: '', newTripHotel: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Trip');
        this.setState({ newTripCity: '', newTripDate: '', newTripCost: '', newTripHotel: '' })
      }

      await this.fetchUserTrips();
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdateTrips = async (key) => {
    try {
      let savedTrips = this.state.savedTrips;
      let index = savedTrips.findIndex(x => x.key === key);
      let trip = savedTrips[index];
  
      const response = await updateTrip(auth.currentUser.uid, key, trip.city, trip.dates, trip.cost, trip.hotel);
  
      if (response && response.success) {
        Alert.alert(response.message || 'Updated Trip');
      } else {
        Alert.alert(response.message || 'Failed to update Trip');
      }
  
      await this.fetchUserTrip();
    } catch (error) {
      console.log(error);
    }
  };
  

  handleDeleteTrips = async (key) => {
    try {
      const response = await deleteTrip(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Trip');
      } else {
        Alert.alert(response.message || 'Failed to delete Trip');
      }

      await this.fetchUserTrips();
    } catch (error) {
      console.log(error);
    }
  };

  fetchUserTrips = async () => {
    try {
      const response = await fetchUserTrips(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedTrips: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Trips');
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUserTrips();
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="City"
            value={this.state.newTripCity}
            onChangeText={(value) => this.handleChange('newTripCity', value)}
            
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Dates"
            value={this.state.newTripDate}
            onChangeText={(value) => this.handleChange('newTripDate', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Cost"
            value={this.state.newTripCost}
            onChangeText={(value) => this.handleChange('newTripCost', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Hotel"
            value={this.state.newTripHotel}
            onChangeText={(value) => this.handleChange('newTripHotel', value)}
          />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton
            title="Save Trip"
            onPress={() => this.handleSaveTrips()}
          />
        </View>
        <View style={containerStyles.flatListContainer}>
          <FlatList

            data={this.state.savedTrips}
            renderItem={({ item }) => (
              <View style={containerStyles.textInputContainer}>
                <View style={styles.relativeContainer}>
                  <View style={styles.inputsWrapper}>
                  <FormUpdateInputText
                    label="City"
                    value={item.city}
                    onChangeText={(text) => this.handleUpdateChange(item.key, {field: 'city', text})}
                  />
                  <FormUpdateInputText
                    label="Dates"
                    value={item.dates}
                    onChangeText={(text) => this.handleUpdateChange(item.key, {field: 'dates', text})}
                  />
                  <FormUpdateInputText
                    label="Cost"
                    value={item.cost}
                    onChangeText={(text) => this.handleUpdateChange(item.key, {field: 'cost', text})}
                  />
                  <FormUpdateInputText
                    label="Hotel"
                    value={item.hotel}
                    onChangeText={(text) => this.handleUpdateChange(item.key, {field: 'hotel', text})}
                  />

                  </View>
                  <View style={styles.buttonsWrapper}>
                    <FormButton
                      title="Update"
                      onPress={() => this.handleUpdateTrips(item.key)}
                    />
                    <FormButton
                      title="Delete"
                      onPress={() => this.handleDeleteTrips(item.key)}
                    />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relativeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});