import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveTrip, fetchUserTrips, updateTrip, deleteTrip } from '../repository/tripsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { TripsForm, TripsDisplayForm, TripsUpdateForm } from '../components/TripsForm';

export default class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newTripLocation: {
        city: '',
        state: '',
        country: '',
      },
      newTripDateFrom: new Date(),
      newTripDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      newTripCost: 0,
      newTripHotel: {
        name: '',
        cost: '',
        address: '',
      },
      errors: {},
      savedTrips: [],
      displayUpdateButton: true,
      showTripsInputForm: false,
      showEditTripsForm: false,
    }
  }

  handleShowEditTripsForm = () => {
    this.setState({ showEditTripsForm: !this.state.showEditTripsForm });
  };

  handleShowDateFromPicker = () => {
    this.setState({ showDateFromPicker: !this.state.showDateFromPicker });
  };

  handleShowDateToPicker = () => {
    this.setState({ showDateToPicker: !this.state.showDateToPicker });
  };

  handleShowDateFromPickerByKey = (key) => {
    let index = this.state.savedTrips.findIndex(x => x.key === key);
    let savedTrips = this.state.savedTrips;

    savedTrips[index].showDateFromPicker = !savedTrips[index].showDateFromPicker;
    this.setState({ savedTrips: savedTrips });
  };

  handleDateFromChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedTrips.findIndex(x => x.key === key);
    let savedTrips = this.state.savedTrips;

    savedTrips[index].dateFrom = selectedDate || savedTrips[index].dateFrom;

    this.setState({ savedTrips: savedTrips });
  }

  handleShowDateToPickerByKey = (key) => {
    let index = this.state.savedTrips.findIndex(x => x.key === key);
    let savedTrips = this.state.savedTrips;

    savedTrips[index].showDateToPicker = !savedTrips[index].showDateToPicker;
    this.setState({ savedTrips: savedTrips });
  };

  handleDateToChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedTrips.findIndex(x => x.key === key);
    let savedTrips = this.state.savedTrips;

    savedTrips[index].dateTo = selectedDate || savedTrips[index].dateTo;

    this.setState({ savedTrips: savedTrips });
  }

  handleShowTripsInputForm = () => {
    this.setState({ showTripsInputForm: !this.state.showTripsInputForm });
  };

  handleDateFromChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newTripDateFrom;
    this.setState({ newTripDateFrom: currentDate });
  };

  handleDateToChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newTripDateTo;
    this.setState({ newTripDateTo: currentDate });
  };

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
      const response = await saveTrip(auth.currentUser.uid, this.state.newTripLocation, this.state.newTripDateFrom, this.state.newTripDateTo, this.state.newTripCost, this.state.newTripHotel);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Trip');
        this.setState({ newTripLocation: { city: '', state: '', country: '', }, newTripDateFrom: new Date(), newTripDateTo: new Date(), newTripCost: 0, newTripHotel: { name: '', cost: '', address: '', } })
      } else {
        Alert.alert(response.message || 'Failed to save Trip');
        this.setState({ newTripLocation: { city: '', state: '', country: '', }, newTripDateFrom: new Date(), newTripDateTo: new Date(), newTripCost: 0, newTripHotel: { name: '', cost: '', address: '', } })
      }

      await this.fetchUserTrips();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdateTrips = async (key) => {
    try {
      let savedTrips = this.state.savedTrips;
      let index = savedTrips.findIndex(x => x.key === key);
      let trip = savedTrips[index];

      const response = await updateTrip(key, trip.city, trip.dateFrom, trip.dateTo, trip.cost, trip.hotel);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Trip');
      } else {
        Alert.alert(response.message || 'Failed to Update Trip');
      }

      await this.fetchUserTrip();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };


  handleDeleteTrips = async (key) => {
    try {
      const response = await deleteTrip(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Trip');
      } else {
        Alert.alert(response.message || 'Failed to Delete Trip');
      }

      await this.fetchUserTrips();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserTrips = async () => {
    try {
      const response = await fetchUserTrips(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedTrips: response.data });
      } else {
        Alert.alert(response.message || 'Failed to Fetch Trips');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserTrips();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showTripsInputForm && (
            <FormButton title='Add a Trip' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowTripsInputForm} />
          )}

          {this.state.showTripsInputForm && (
            <TripsForm handleChange={this.handleChange} onFormClose={this.handleShowTripsInputForm} onFormSubmit={this.handleSaveTrips} name={this.state.newTripName} dateFrom={this.state.newTripDateFrom} dateTo={this.state.newTripDateTo} showDatePicker={this.state.showDateFromPicker} handleShowDatePicker={this.handleShowDateFromPicker} handleDateChange={this.handleDateFromChange} showDateToPicker={this.state.showDateToPicker} handleShowDateToPicker={this.handleShowDateToPicker} handleDateToChange={this.handleDateToChange} />
          )}
          {/* 
          {this.state.showEditTripsForm && (<FormButton title='Done' onPress={this.handleShowEditTripsForm} />)}

          {!this.state.showEditTripsForm && (<FormButton title='Edit Trips' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditTripsForm} />)}
      
          {!this.state.showEditTripsForm && (
            <FlatList data={this.state.savedTrips} renderItem={({ item }) => (<TripsDisplayForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} anniversary={item.anniversary} />)} keyExtractor={item => item.key} />)}

          {this.state.showEditTripsForm && (
            <FlatList data={this.state.savedTrips} renderItem={({ item }) => (<TripsUpdateForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} anniversary={item.anniversary} itemKey={item.key} handleChange={this.handleUpdateChange} onFormSubmit={this.handleUpdateTrips} onPressDelete={this.handleDeleteTrips} showDatePicker={item.showDatePicker} handleShowDatePicker={this.handleShowDatePickerByKey} handleDateChange={this.handleDateChangeByKey} handleDateChangeAnniversary={this.handleDateChangeAnniversaryByKey} showDatePickerAnniversary={item.showDatePickerAnniversary} handleShowDatePickerAnniversary={this.handleShowDatePickerAnniversaryByKey} />)} keyExtractor={item => item.key} />)}
        */}
        </View>
      </View>
    );
  }
}
