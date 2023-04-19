import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormText from './FormText';
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';
import CustomPicker from './CustomPicker';

export const TripsForm = function ({ location, tripCost, hotel, dateFrom, dateTo, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <CustomDatePicker label={'Date From'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} />
                <CustomDatePicker label={'Date To'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={handleDateToChange} handleShowDatePicker={handleShowDateToPicker} />
                <FormInputText label="Total Cost" keyboardType="decimal-pad" value={tripCost} onChangeText={(value) => handleChange('newTripCost', value)} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Trip' onPress={onFormSubmit} />
            </View>
        </View>
    );
}

TripsForm.propTypes = {
    location: PropTypes.shape({
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
    }),
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
    tripCost: PropTypes.number,
    hotel: PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.number,
        address: PropTypes.string,
    }),
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
    name: '',
    relation: '',
    dateOfBirth: new Date(),
    anniversary: new Date(),
    errors: null,
};

export const TripsDisplayForm = function ({ name, relation, dateOfBirth, anniversary }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <FormText label="Name" value={name} />
            <FormText label='Relation' value={relation} />
            <FormText label='Date of Birth' value={dateOfBirth.toLocaleDateString()} />
            <FormText label='Anniversary' value={anniversary.toLocaleDateString()} />
        </View>
    );
}

TripsDisplayForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    anniversary: PropTypes.instanceOf(Date),
};

TripsDisplayForm.defaultProps = {
    name: '',
    relation: '',
};

export const TripsUpdateForm = function ({ itemKey, name, relation, dateOfBirth, anniversary, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange, showDatePickerAnniversary, handleShowDatePickerAnniversary, handleDateChangeAnniversary }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label='Name' value={name} onChangeText={(value) => handleChange(itemKey, { field: 'name', value: value })} />
                <FormInputText label='Relation' value={relation} onChangeText={(value) => handleChange(itemKey, { field: 'relation', value: value })} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} />
                <CustomDatePicker label={'Anniversary'} dateOfBirth={anniversary} showDatePicker={showDatePickerAnniversary} handleDateChange={(event, value) => handleDateChangeAnniversary(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePickerAnniversary(itemKey, value)} />
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
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    anniversary: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
    showDatePickerAnniversary: PropTypes.bool,
    handleShowDatePickerAnniversary: PropTypes.func,
    handleDateChangeAnniversary: PropTypes.func,
};

TripsUpdateForm.defaultProps = {
    name: '',
    relation: '',
    errors: null,
};
