import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { formButtonStyles } from '../styles/globalStyle';

export default function FormButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={formButtonStyles.formButton}>
            <Text style={formButtonStyles.formButtonText}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

FormButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
