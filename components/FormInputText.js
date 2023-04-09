import React from 'react';
import PropTypes from 'prop-types';
import { TextInput  } from 'react-native';
import { formInputTextStyles } from '../styles/globalStyle';

export default function FormInputText({ placeholder, autoCapitalize, keyboardType, secureTextEntry }) {
    return (
        <TextInput placeholder={placeholder} autoCapitalize={autoCapitalize} keyboardType={keyboardType} secureTextEntry={secureTextEntry} style={formInputTextStyles.input} />
    );
}

FormInputText.propTypes = {
    placeholder: PropTypes.string.isRequired,
    autoCapitalize: PropTypes.string,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
};

FormInputText.defaultProps = {
    autoCapitalize: 'none',
    keyboardType: 'default',
    secureTextEntry: false,
};
