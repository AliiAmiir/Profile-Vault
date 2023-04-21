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
      newTripCity: '',
      newTripState: '',
      newTripCountry: '',
      newTripDateFrom: new Date(),
      newTripDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      newTripCost: '',
      newTripHotelName: '',
      newTripHotelAddress: '',
      newTripHotelCost: '',
      newTripFlightName: '',
      newTripFlightCost: '',
      newTripCarRentalName: '',
      newTripCarRentalCost: '',
      errors: {},
      savedTrips: [],
      showTripsInputForm: false,
      showEditTripsForm: false,
    }
  }

  getDefaultState = () => {
    return {
      newTripCity: '',
      newTripState: '',
      newTripCountry: '',
      newTripDateFrom: new Date(),
      newTripDateTo: new Date(),
      showDateFromPicker: false,
      showDateToPicker: false,
      newTripCost: '',
      newTripHotelName: '',
      newTripHotelAddress: '',
      newTripHotelCost: '',
      newTripFlightName: '',
      newTripFlightCost: '',
      newTripCarRentalName: '',
      newTripCarRentalCost: '',
      showTripsInputForm: false,
    }
  };

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
    let valueAtIndex = savedTrips[index];
    valueAtIndex[value.field] = value.value;

    savedTrips[index] = valueAtIndex;

    // Add validation
    this.setState({ savedTrips: savedTrips });
  };


  handleSaveTrips = async () => {
    try {
      const tripDetails = {
        city: this.state.newTripCity,
        state: this.state.newTripState,
        country: this.state.newTripCountry,
        dateFrom: this.state.newTripDateFrom,
        dateTo: this.state.newTripDateTo,
        tripCost: this.state.newTripCost || '0',
        hotelName: this.state.newTripHotelName,
        hotelAddress: this.state.newTripHotelAddress,
        hotelCost: this.state.newTripHotelCost || '0',
        flightName: this.state.newTripFlightName,
        flightCost: this.state.newTripFlightCost || '0',
        carRentalName: this.state.newTripCarRentalName,
        carRentalCost: this.state.newTripCarRentalCost || '0',
      };

      const response = await saveTrip(auth.currentUser.uid, tripDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Trip');
        let defaultState = this.getDefaultState();
        this.setState(defaultState)
      } else {
        Alert.alert(response.message || 'Failed to save Trip');
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

      const response = await updateTrip(key, trip);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Trip');
      } else {
        Alert.alert(response.message || 'Failed to Update Trip');
      }

      await this.fetchUserTrips();
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
          {!this.state.showTripsInputForm && !this.state.showEditTripsForm && (
            <FormButton title='Add a Trip' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowTripsInputForm} />
          )}

          {this.state.showTripsInputForm && (
            <TripsForm
              city={this.state.newTripCity}
              state={this.state.newTripState}
              country={this.state.newTripCountry}
              dateFrom={this.state.newTripDateFrom}
              dateTo={this.state.newTripDateTo}
              tripCost={this.state.newTripCost}
              hotelName={this.state.newTripHotelName}
              hotelAddress={this.state.newTripHotelAddress}
              hotelCost={this.state.newTripHotelCost}
              flightName={this.state.newTripFlightName}
              flightCost={this.state.newTripFlightCost}
              carRentalName={this.state.newTripCarRentalName}
              carRentalCost={this.state.newTripCarRentalCost}
              showDatePicker={this.state.showDateFromPicker}
              handleShowDatePicker={this.handleShowDateFromPicker}
              handleDateChange={this.handleDateFromChange}
              showDateToPicker={this.state.showDateToPicker}
              handleShowDateToPicker={this.handleShowDateToPicker}
              handleDateToChange={this.handleDateToChange}
              handleChange={this.handleChange}
              onFormClose={this.handleShowTripsInputForm}
              onFormSubmit={this.handleSaveTrips}
            />
          )}

          {this.state.showEditTripsForm && !this.state.showTripsInputForm && (<FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditTripsForm} />)}

          {!this.state.showEditTripsForm && !this.state.showTripsInputForm && (<FormButton title='Edit Trips' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditTripsForm} />)}

          {!this.state.showEditTripsForm && !this.state.showTripsInputForm && (
            <FlatList data={this.state.savedTrips} renderItem={({ item }) => (
              <TripsDisplayForm
                city={item.city}
                state={item.state}
                country={item.country}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
                tripCost={item.tripCost}
                hotelName={item.hotelName}
                hotelAddress={item.hotelAddress}
                hotelCost={item.hotelCost}
                flightName={item.flightName}
                flightCost={item.flightCost}
                carRentalName={item.carRentalName}
                carRentalCost={item.carRentalCost}
              />
            )} keyExtractor={item => item.key}
            />)}

          {this.state.showEditTripsForm && !this.state.showTripsInputForm && (
            <FlatList data={this.state.savedTrips} renderItem={({ item }) => (
              <TripsUpdateForm
                city={item.city}
                state={item.state}
                country={item.country}
                dateFrom={item.dateFrom}
                dateTo={item.dateTo}
                tripCost={item.tripCost}
                hotelName={item.hotelName}
                hotelAddress={item.hotelAddress}
                hotelCost={item.hotelCost}
                flightName={item.flightName}
                flightCost={item.flightCost}
                carRentalName={item.carRentalName}
                carRentalCost={item.carRentalCost}
                itemKey={item.key}
                handleChange={this.handleUpdateChange}
                onFormSubmit={this.handleUpdateTrips}
                onPressDelete={this.handleDeleteTrips}
                showDatePicker={item.showDateFromPicker}
                handleShowDatePicker={this.handleShowDateFromPickerByKey}
                handleDateChange={this.handleDateFromChangeByKey}
                showDateToPicker={item.showDateToPicker}
                handleShowDateToPicker={this.handleShowDateToPickerByKey}
                handleDateToChange={this.handleDateToChangeByKey}
              />)}
              keyExtractor={item => item.key}
            />)}
        </View>
      </View>
    );
  }
}
