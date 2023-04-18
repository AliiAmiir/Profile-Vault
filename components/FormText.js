import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

// Import Styles
import { containerStyles, formInputTextStyles } from '../styles/globalStyle';

export default function FormText({ label, value, secureTextEntry }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <Text style={formInputTextStyles.label}>{label}</Text>
            <View style={formInputTextStyles.input}>
                <Text style={formInputTextStyles.inputValue}>{value}</Text>
            </View>
        </View>
    );
}

FormText.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    secureTextEntry: PropTypes.bool,
};

FormText.defaultProps = {
    secureTextEntry: false,
};
