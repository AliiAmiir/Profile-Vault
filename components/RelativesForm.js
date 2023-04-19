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

export const RelativesForm = function ({ name, relation, dateOfBirth, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="Name" value={name} onChangeText={(value) => handleChange('newRelativeName', value)} />
                <FormInputText label='Relative' value={relation} onChangeText={(value) => handleChange('newRelativeRelation', value)} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Relative' onPress={onFormSubmit} />
            </View>
        </View>
    );
}

RelativesForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
};

RelativesForm.defaultProps = {
    name: '',
    relation: '',
    dateOfBirth: new Date(),
    errors: null,
};

export const RelativesDisplayForm = function ({ name, relation, dateOfBirth }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <FormText label="Name" value={name} />
            <FormText label='Relation' value={relation} />
            <FormText label='Date of Birth' value={dateOfBirth} />
        </View>
    );
}

RelativesDisplayForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.string,
};

RelativesDisplayForm.defaultProps = {
    name: '',
    relation: '',
    dateOfBirth: '',
};

export const RelativesUpdateForm = function ({ itemKey, name, relation, dateOfBirth, errors, handleChange, onFormSubmit, onPressDelete }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label='Name' value={name} onChangeText={(value) => handleChange(itemKey, { field: 'name', value: value })} />
                <FormInputText label='Relation' value={relation} onChangeText={(value) => handleChange(itemKey, { field: 'relation', value: value })} />
                {/* <FormInputText label='Date of Birth' value={dateOfBirth} onChangeText={(value) => handleChange(itemKey, { field: 'dateOfBirth', value: value })} /> */}
            </View>
            <View style={containerStyles.buttonContainer}>
                <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                <FormButton title='Save Relative' onPress={() => onFormSubmit(itemKey)} />
            </View>
        </View>
    );
}

RelativesUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    name: PropTypes.string,
    relation: PropTypes.string,
    // dateOfBirth: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
};

RelativesUpdateForm.defaultProps = {
    name: '',
    relation: '',
    // dateOfBirth: new Date(),
    errors: null,
};
