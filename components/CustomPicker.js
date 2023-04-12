import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Import Styles
import { containerStyles, formInputTextStyles, textStyles, pickerStyles } from '../styles/globalStyle';

export default function CustomPicker({ label, items, showPicker, selectedValue, onValueChange, errorText, handleShowGenderPicker }) {
    return (
        <View style={containerStyles.pickerContainer}>
            <Text style={formInputTextStyles.label}>{label}</Text>
            <TouchableOpacity onPress={handleShowGenderPicker} style={formInputTextStyles.input}>
                <Text> {selectedValue} </Text>
            </TouchableOpacity>
            {showPicker && (
                <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={pickerStyles.pickerButton}>
                    {items.map((item, index) => (<Picker.Item key={index} label={item.label} value={item.value} />))}
                </Picker>)}
            {errorText !== null && (<Text style={textStyles.errorText}>{errorText}</Text>)}
        </View>
    );
}

CustomPicker.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    showPicker: PropTypes.bool,
    selectedValue: PropTypes.string,
    errorText: PropTypes.string,
    onValueChange: PropTypes.func.isRequired,
    handleShowGenderPicker: PropTypes.func
};

CustomPicker.defaultProps = {
    label: '',
    errorText: '',
    showPicker: false,
};
