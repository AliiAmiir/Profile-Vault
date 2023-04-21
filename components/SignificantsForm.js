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

export const SignificantsForm = function ({ name, relation, dateOfBirth, anniversary, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDatePickerAnniversary, handleShowDatePickerAnniversary, handleDateChangeAnniversary }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="Name" value={name} onChangeText={(value) => handleChange('newSignificantName', value)} />
                <FormInputText label='Relation' value={relation} onChangeText={(value) => handleChange('newSignificantRelation', value)} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={new Date()} />
                <CustomDatePicker label={'Anniversary'} dateOfBirth={anniversary} showDatePicker={showDatePickerAnniversary} handleDateChange={handleDateChangeAnniversary} handleShowDatePicker={handleShowDatePickerAnniversary} maximumDate={new Date()} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Significant' onPress={onFormSubmit} />
            </View>
        </View>
    );
}

SignificantsForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    anniversary: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
    showDatePickerAnniversary: PropTypes.bool,
    handleShowDatePickerAnniversary: PropTypes.func,
    handleDateChangeAnniversary: PropTypes.func,
};

SignificantsForm.defaultProps = {
    name: '',
    relation: '',
    dateOfBirth: new Date(),
    anniversary: new Date(),
    errors: null,
};

export const SignificantsDisplayForm = function ({ name, relation, dateOfBirth, anniversary }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <FormText label="Name" value={name} />
            <FormText label='Relation' value={relation} />
            <FormText label='Date of Birth' value={dateOfBirth.toLocaleDateString()} />
            <FormText label='Anniversary' value={anniversary.toLocaleDateString()} />
        </View>
    );
}

SignificantsDisplayForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    anniversary: PropTypes.instanceOf(Date),
};

SignificantsDisplayForm.defaultProps = {
    name: '',
    relation: '',
};

export const SignificantsUpdateForm = function ({ itemKey, name, relation, dateOfBirth, anniversary, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange, showDatePickerAnniversary, handleShowDatePickerAnniversary, handleDateChangeAnniversary }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label='Name' value={name} onChangeText={(value) => handleChange(itemKey, { field: 'name', value: value })} />
                <FormInputText label='Relation' value={relation} onChangeText={(value) => handleChange(itemKey, { field: 'relation', value: value })} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={new Date()} />
                <CustomDatePicker label={'Anniversary'} dateOfBirth={anniversary} showDatePicker={showDatePickerAnniversary} handleDateChange={(event, value) => handleDateChangeAnniversary(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePickerAnniversary(itemKey, value)} maximumDate={new Date()} />
            </View>
            <View style={containerStyles.buttonContainer}>
                <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                <FormButton title='Save Significant' onPress={() => onFormSubmit(itemKey)} />
            </View>
        </View>
    );
}

SignificantsUpdateForm.propTypes = {
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

SignificantsUpdateForm.defaultProps = {
    name: '',
    relation: '',
    errors: null,
};
