import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { formButtonStyles } from '../styles/globalStyle';

export default function FormButton({ title, color, textColor, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[formButtonStyles.formButton, { backgroundColor: color }]}>
            <Text style={[formButtonStyles.formButtonText, {color: textColor}]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

FormButton.propTypes = {
    color: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

FormButton.defaultProps = {
    color: '#6374D1',
    textColor: '#ffffff'
  };
