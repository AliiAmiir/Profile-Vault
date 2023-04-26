import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';

export const RelativesForm = function ({ name, relation, dateOfBirth, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText autoCapitalize={'sentences'} label="Name" value={name} onChangeText={(value) => handleChange('newRelativeName', value)} />
                <FormInputText autoCapitalize={'sentences'} label='Relation' value={relation} onChangeText={(value) => handleChange('newRelativeRelation', value)} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={new Date()} />
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
        <View style={containerStyles.shadowTextContainer}>
            <Text style={textStyles.textSubHeading}>{name}</Text>
            <Text style={textStyles.boldText}>Relation: <Text style={textStyles.subText}>{relation}</Text></Text>
            <Text style={textStyles.boldText}>Birthday: <Text style={textStyles.subText}>{dateOfBirth.toLocaleDateString()}</Text></Text>
        </View>
    );
}

RelativesDisplayForm.propTypes = {
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
};

RelativesDisplayForm.defaultProps = {
    name: '',
    relation: '',
};

export const RelativesUpdateForm = function ({ itemKey, name, relation, dateOfBirth, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText autoCapitalize={'sentences'} label='Name' value={name} onChangeText={(value) => handleChange(itemKey, { field: 'name', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label='Relation' value={relation} onChangeText={(value) => handleChange(itemKey, { field: 'relation', value: value })} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={new Date()} />
            </View>

            <View style={containerStyles.rowContainer}>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                </View>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Update' onPress={() => onFormSubmit(itemKey)} />
                </View>
            </View>
        </View>
    );
}

RelativesUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    name: PropTypes.string,
    relation: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
};

RelativesUpdateForm.defaultProps = {
    name: '',
    relation: '',
    errors: null,
};
