import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';

export const TripsForm = function ({ city, state, country, tripCost, dateFrom, dateTo, hotelName, hotelCost, hotelAddress, flightName, flightCost, carRentalName, carRentalCost, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    return (
        <ScrollView style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="City" value={city} onChangeText={(value) => handleChange('newTripCity', value)} />
                <FormInputText label="State" value={state} onChangeText={(value) => handleChange('newTripState', value)} />
                <FormInputText label="Country" value={country} onChangeText={(value) => handleChange('newTripCountry', value)} />
                <CustomDatePicker label={'Date From'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} />
                <CustomDatePicker label={'Date To'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={handleDateToChange} handleShowDatePicker={handleShowDateToPicker} />
                <FormInputText label="Hotel Name" value={hotelName} onChangeText={(value) => handleChange('newTripHotelName', value)} />
                <FormInputText label="Hodel Address" value={hotelAddress} onChangeText={(value) => handleChange('newTripHotelAddress', value)} />
                <FormInputText label="Hotel Cost" keyboardType="decimal-pad" value={hotelCost} onChangeText={(value) => handleChange('newTripHotelCost', value)} />
                <FormInputText label="Flight Name" value={flightName} onChangeText={(value) => handleChange('newTripFlightName', value)} />
                <FormInputText label="Flight Cost" keyboardType="decimal-pad" value={flightCost} onChangeText={(value) => handleChange('newTripFlightCost', value)} />
                <FormInputText label="Car Rental Name" value={carRentalName} onChangeText={(value) => handleChange('newTripCarRentalName', value)} />
                <FormInputText label="Car Rental Cost" keyboardType="decimal-pad" value={carRentalCost} onChangeText={(value) => handleChange('newTripCarRentalCost', value)} />
                <FormInputText label="Total Cost" keyboardType="decimal-pad" value={tripCost} onChangeText={(value) => handleChange('newTripCost', value)} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Trip' onPress={onFormSubmit} />
            </View>
        </ScrollView>
    );
}

TripsForm.propTypes = {
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
    tripCost: PropTypes.string,
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    hotelCost: PropTypes.string,
    flightName: PropTypes.string,
    flightCost: PropTypes.string,
    carRentalName: PropTypes.string,
    carRentalCost: PropTypes.string,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
    showDateToPicker: PropTypes.bool,
    handleShowDateToPicker: PropTypes.func,
    handleDateToChange: PropTypes.func,
};

TripsForm.defaultProps = {
    city: '',
    state: '',
    country: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    tripCost: '',
    hotelName: '',
    hotelAddress: '',
    hotelCost: '',
    flightName: '',
    flightCost: '',
    carRentalName: '',
    carRentalCost: '',
};

export const TripsDisplayForm = function ({ city, state, country, tripCost, dateFrom, dateTo, hotelName, hotelCost, hotelAddress, flightName, flightCost, carRentalName, carRentalCost }) {
    const location = `${city}, ${state}, ${country}`;
    const tripDuration = `${dateFrom.toLocaleDateString()} - ${dateTo.toLocaleDateString()}`;
    const hotelDetails = `${hotelName}, ${hotelAddress}, $${hotelCost}`;
    const flightDetails = `${flightName}, $${flightCost}`;
    const carRentalDetails = `${carRentalName}, $${carRentalCost}`;
    const totalCost = `$${tripCost}`;

    return (
        <View style={containerStyles.textInputContainer}>
            <Text style={textStyles.textSubHeading}>{location}</Text>
            <Text style={textStyles.boldText}>{tripDuration}</Text>
            <Text style={textStyles.boldText}>Hotel: <Text style={textStyles.subText}>{hotelDetails}</Text></Text>
            <Text style={textStyles.boldText}>Car Rental: <Text style={textStyles.subText}>{carRentalDetails}</Text></Text>
            <Text style={textStyles.boldText}>Flight: <Text style={textStyles.subText}>{flightDetails}</Text></Text>
            <Text style={textStyles.boldText}>Total Expenses: <Text style={textStyles.subText}>{totalCost}</Text></Text>
        </View>
    );
}

TripsDisplayForm.propTypes = {
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
    tripCost: PropTypes.string,
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    hotelCost: PropTypes.string,
    flightName: PropTypes.string,
    flightCost: PropTypes.string,
    carRentalName: PropTypes.string,
    carRentalCost: PropTypes.string,
};

TripsDisplayForm.defaultProps = {
    city: '',
    state: '',
    country: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    tripCost: '',
    hotelName: '',
    hotelAddress: '',
    hotelCost: '',
    flightName: '',
    flightCost: '',
    carRentalName: '',
    carRentalCost: '',
};

export const TripsUpdateForm = function ({ itemKey, city, state, country, tripCost, dateFrom, dateTo, hotelName, hotelCost, hotelAddress, flightName, flightCost, carRentalName, carRentalCost, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label="City" value={city} onChangeText={(value) => handleChange(itemKey, { field: 'city', value: value })} />
                <FormInputText label="State" value={state} onChangeText={(value) => handleChange(itemKey, { field: 'state', value: value })} />
                <FormInputText label="Country" value={country} onChangeText={(value) => handleChange(itemKey, { field: 'country', value: value })} />
                <CustomDatePicker label={'Date From'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} />
                <CustomDatePicker label={'Date To'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={(event, value) => handleDateToChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDateToPicker(itemKey, value)} />
                <FormInputText label="Hotel Name" value={hotelName} onChangeText={(value) => handleChange(itemKey, { field: 'hotelName', value: value })} />
                <FormInputText label="Hodel Address" value={hotelAddress} onChangeText={(value) => handleChange(itemKey, { field: 'hotelAddress', value: value })} />
                <FormInputText label="Hotel Cost" keyboardType="decimal-pad" value={hotelCost} onChangeText={(value) => handleChange(itemKey, { field: 'hotelCost', value: value })} />
                <FormInputText label="Flight Name" value={flightName} onChangeText={(value) => handleChange(itemKey, { field: 'flightName', value: value })} />
                <FormInputText label="Flight Cost" keyboardType="decimal-pad" value={flightCost} onChangeText={(value) => handleChange(itemKey, { field: 'flightCost', value: value })} />
                <FormInputText label="Car Rental Name" value={carRentalName} onChangeText={(value) => handleChange(itemKey, { field: 'carRentalName', value: value })} />
                <FormInputText label="Car Rental Cost" keyboardType="decimal-pad" value={carRentalCost} onChangeText={(value) => handleChange(itemKey, { field: 'carRentalCost', value: value })} />
                <FormInputText label="Total Cost" keyboardType="decimal-pad" value={tripCost} onChangeText={(value) => handleChange(itemKey, { field: 'tripCost', value: value })} />
            </View>
            <View style={containerStyles.buttonContainer}>
                <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                <FormButton title='Save Trip' onPress={() => onFormSubmit(itemKey)} />
            </View>
        </View>
    );
}

TripsUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
    tripCost: PropTypes.string,
    hotelName: PropTypes.string,
    hotelAddress: PropTypes.string,
    hotelCost: PropTypes.string,
    flightName: PropTypes.string,
    flightCost: PropTypes.string,
    carRentalName: PropTypes.string,
    carRentalCost: PropTypes.string,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
    showDateToPicker: PropTypes.bool,
    handleShowDateToPicker: PropTypes.func,
    handleDateToChange: PropTypes.func,
};

TripsUpdateForm.defaultProps = {
    city: '',
    state: '',
    country: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    tripCost: '',
    hotelName: '',
    hotelAddress: '',
    hotelCost: '',
    flightName: '',
    flightCost: '',
    carRentalName: '',
    carRentalCost: '',
};
