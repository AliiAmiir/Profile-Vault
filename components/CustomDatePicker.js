import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import Styles
import { containerStyles, formInputTextStyles } from '../styles/globalStyle';

export default function CustomDatePicker({ label, dateOfBirth, showDatePicker, textColor, handleDateChange, handleShowDatePicker }) {
    return (

        <View style={containerStyles.textInputContainer}>
            <Text style={formInputTextStyles.label}>{label}</Text>
            <TouchableOpacity onPress={handleShowDatePicker} style={formInputTextStyles.input}>
                <Text>
                    {dateOfBirth.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            {showDatePicker && (<DateTimePicker value={dateOfBirth} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleDateChange} maximumDate={new Date()} />)}
        </View>
    );
}

CustomDatePicker.propTypes = {
    label: PropTypes.string.isRequired,
    showDatePicker: PropTypes.bool,
    dateOfBirth: PropTypes.instanceOf(Date),
    textColor: PropTypes.string,
    handleDateChange: PropTypes.func,
    handleShowDatePicker: PropTypes.func,
};

CustomDatePicker.defaultProps = {
    textColor: '#ffffff',
    showDatePicker: false,
};