import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

// Import Styles
import { containerStyles, formInputTextStyles, textStyles } from '../styles/globalStyle';

export default function FormUpdateInputText({ label, placeholder, value, onChangeText, onBlurUpdate, autoCapitalize, keyboardType, secureTextEntry, errorText }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <Text style={formInputTextStyles.label}>{label}</Text>
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} onBlur={onBlurUpdate} autoCapitalize={autoCapitalize} keyboardType={keyboardType} secureTextEntry={secureTextEntry} style={formInputTextStyles.input} />
            {errorText !== null && (<Text style={textStyles.errorText}>{errorText}</Text>)}
        </View>
    );
}

FormUpdateInputText.propTypes = {
    value: PropTypes.any,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    errorText: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    onBlurUpdate: PropTypes.func.isRequired,
};

FormUpdateInputText.defaultProps = {
    autoCapitalize: 'none',
    keyboardType: 'default',
    secureTextEntry: false,
    errorText: null,
};
