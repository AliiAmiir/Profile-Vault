import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';

export const SignificantsForm = function ({ name, relation, dateOfBirth, anniversary, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDatePickerAnniversary, handleShowDatePickerAnniversary, handleDateChangeAnniversary }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText autoCapitalize={'sentences'} label="Name" value={name} onChangeText={(value) => handleChange('newSignificantName', value)} />
                <FormInputText autoCapitalize={'sentences'} label='Relation' value={relation} onChangeText={(value) => handleChange('newSignificantRelation', value)} />
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
            <Text style={textStyles.textSubHeading}>{name}</Text>
            <Text style={textStyles.boldText}>Relation: <Text style={textStyles.subText}>{relation}</Text></Text>
            <Text style={textStyles.boldText}>Birthday: <Text style={textStyles.subText}>{dateOfBirth.toLocaleDateString()}</Text></Text>
            <Text style={textStyles.boldText}>Anniversary: <Text style={textStyles.subText}>{anniversary.toLocaleDateString()}</Text></Text>
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
                <FormInputText autoCapitalize={'sentences'} label='Name' value={name} onChangeText={(value) => handleChange(itemKey, { field: 'name', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label='Relation' value={relation} onChangeText={(value) => handleChange(itemKey, { field: 'relation', value: value })} />
                <CustomDatePicker label={'Date of Birth'} dateOfBirth={dateOfBirth} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={new Date()} />
                <CustomDatePicker label={'Anniversary'} dateOfBirth={anniversary} showDatePicker={showDatePickerAnniversary} handleDateChange={(event, value) => handleDateChangeAnniversary(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePickerAnniversary(itemKey, value)} maximumDate={new Date()} />
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
