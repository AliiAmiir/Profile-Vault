import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Styles
import { containerStyles, formInputTextStyles, formButtonStyles, textStyles } from '../styles/globalStyle';

export default function FormUpdateInputText({ label, placeholder, value, onChangeText, onBlurUpdate, autoCapitalize, keyboardType, secureTextEntry, errorText, onPressDelete }) {
    return (
        <View style={containerStyles.updateRowContainer}>
            <View style={formButtonStyles.rowUpdateButton}>
                <TouchableOpacity>
                    <Icon name="plus" size={15} color="lightblue" />
                </TouchableOpacity>
            </View>
            <View style={[containerStyles.textInputContainer, { flex: '4' }]}>
                <Text style={formInputTextStyles.label}>{label}</Text>
                <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} onBlur={onBlurUpdate} autoCapitalize={autoCapitalize} keyboardType={keyboardType} secureTextEntry={secureTextEntry} style={formInputTextStyles.input} />
                {errorText !== null && (<Text style={textStyles.errorText}>{errorText}</Text>)}
            </View>
            <View style={formButtonStyles.rowDeleteButton}>
                <TouchableOpacity onPress={onPressDelete}>
                    <Icon name="trash" size={15} color="red" />
                </TouchableOpacity>
            </View>
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
    onPressDelete: PropTypes.func.isRequired,
};

FormUpdateInputText.defaultProps = {
    autoCapitalize: 'none',
    keyboardType: 'default',
    secureTextEntry: false,
    errorText: null,
};
