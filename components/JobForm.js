import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';

export const JobForm = function ({ company, title, dateFrom, dateTo, errors, handleChange, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    let maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() + 10);

    return (
        <ScrollView style={containerStyles.textInputContainer}>
            <View>
                <FormInputText autoCapitalize={'sentences'} label="Company" value={company} onChangeText={(value) => handleChange('newCompany', value)} />
                <FormInputText autoCapitalize={'sentences'} label="Title" value={title} onChangeText={(value) => handleChange('newTitle', value)} />
                <CustomDatePicker label={'Start date'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={maximumDate} />
                <CustomDatePicker label={'End date'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={handleDateToChange} handleShowDatePicker={handleShowDateToPicker} maximumDate={maximumDate} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Job' onPress={onFormSubmit} />
            </View>
        </ScrollView>
    );
}

JobForm.propTypes = {
    company: PropTypes.string,
    title: PropTypes.string,
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

JobForm.defaultProps = {
    company: '',
    title: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};

export const JobDisplayForm = function ({ company, title, dateFrom, dateTo }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <Text style={textStyles.textSubHeading}>{company}</Text>
            <Text style={textStyles.boldText}>Title: <Text style={textStyles.subText}>{title}</Text></Text>
            <Text style={textStyles.boldText}>Start date: <Text style={textStyles.subText}>{dateFrom.toLocaleDateString()}</Text></Text>
            <Text style={textStyles.boldText}>End date: <Text style={textStyles.subText}>{dateTo.toLocaleDateString()}</Text></Text>
        </View>
    );
}

JobDisplayForm.propTypes = {
    company: PropTypes.string,
    title: PropTypes.string,
    dateFrom: PropTypes.instanceOf(Date),
    dateTo: PropTypes.instanceOf(Date),
};

JobDisplayForm.defaultProps = {
    company: '',
    title: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};

export const JobUpdateForm = function ({ itemKey, company, title, dateFrom, dateTo, errors, handleChange, onFormSubmit, onPressDelete, showDatePicker, handleShowDatePicker, handleDateChange, showDateToPicker, handleShowDateToPicker, handleDateToChange }) {
    let maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() + 10);

    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText autoCapitalize={'sentences'} label="Company" value={company} onChangeText={(value) => handleChange(itemKey, { field: 'company', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label="Title" value={title} onChangeText={(value) => handleChange(itemKey, { field: 'title', value: value })} />
                <CustomDatePicker label={'Start date'} dateOfBirth={dateFrom} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={maximumDate} />
                <CustomDatePicker label={'End date'} dateOfBirth={dateTo} showDatePicker={showDateToPicker} handleDateChange={(event, value) => handleDateToChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDateToPicker(itemKey, value)} maximumDate={maximumDate} />
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

JobUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    company: PropTypes.string,
    title: PropTypes.string,
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

JobUpdateForm.defaultProps = {
    company: '',
    title: '',
    dateFrom: new Date(),
    dateTo: new Date(),
};
