import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';

export const EducationForm = function ({ institute, degree, dateFrom, dateTo, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    let maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() + 10);

    return (
        <ScrollView style={containerStyles.textInputContainer}>
            <View>
                <FormInputText autoCapitalize={'sentences'} label="Institute" value={institute} onChangeText={(value) => handleChange('newInstitute', value)} />
                <FormInputText autoCapitalize={'sentences'} label="Degree" value={degree} onChangeText={(value) => handleChange('newDegree', value)} />
                <CustomDatePicker label={'Enrollment date'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={maximumDate} />
                <CustomDatePicker label={'Graduation date'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={handleDateToChange} handleShowDatePicker={handleShowDateToPicker} maximumDate={maximumDate} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Education' onPress={onFormSubmit} />
            </View>
        </ScrollView>
    );
}

EducationForm.propTypes = {
    institute: PropTypes.string,
    degree: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
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

EducationForm.defaultProps = {
    institute: '',
    degree: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};

export const EducationDisplayForm = function ({ institute, degree, dateFrom, dateTo }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <Text style={textStyles.textSubHeading}>{institute}</Text>
            <Text style={textStyles.boldText}>Degree: <Text style={textStyles.subText}>{degree}</Text></Text>
            <Text style={textStyles.boldText}>Enrollment date: <Text style={textStyles.subText}>{dateFrom.toLocaleDateString()}</Text></Text>
            <Text style={textStyles.boldText}>Graduation date: <Text style={textStyles.subText}>{dateTo.toLocaleDateString()}</Text></Text>
        </View>
    );
}

EducationDisplayForm.propTypes = {
    institute: PropTypes.string,
    degree: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
};

EducationDisplayForm.defaultProps = {
    institute: '',
    degree: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};

export const EducationUpdateForm = function ({ itemKey, institute, degree, dateFrom, dateTo, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    let maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() + 10);

    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText autoCapitalize={'sentences'} label="Institute" value={institute} onChangeText={(value) => handleChange(itemKey, { field: 'institute', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label="Degree" value={degree} onChangeText={(value) => handleChange(itemKey, { field: 'degree', value: value })} />
                <CustomDatePicker label={'Enrollment date'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={maximumDate} />
                <CustomDatePicker label={'Graduation date'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={(event, value) => handleDateToChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDateToPicker(itemKey, value)} maximumDate={maximumDate} />
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

EducationUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    institute: PropTypes.string,
    degree: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
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

EducationUpdateForm.defaultProps = {
    institute: '',
    degree: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};
