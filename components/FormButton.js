import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { formButtonStyles } from '../styles/globalStyle';

export default function FormButton({ title, color, textColor, opacity, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[formButtonStyles.formButton, { backgroundColor: color, opacity: opacity }]}>
            <Text style={[formButtonStyles.formButtonText, { color: textColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

FormButton.propTypes = {
    color: PropTypes.string,
    textColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    opacity: PropTypes.number,
    onPress: PropTypes.func,
};

FormButton.defaultProps = {
    color: '#6374D1',
    textColor: '#ffffff',
    opacity: 1,
};
