import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';

// Import Styles
import { containerStyles, formInputTextStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';

export default function FormUpdateInputText({ label, placeholder, value, onChangeText, onUpdatePress, autoCapitalize, keyboardType, secureTextEntry, errorText, onPressDelete }) {
    return (
        <View>
            <View style={[containerStyles.textInputContainer, { flex: 4 }]}>
                <Text style={formInputTextStyles.label}>{label}</Text>
                <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} autoCapitalize={autoCapitalize} keyboardType={keyboardType} secureTextEntry={secureTextEntry} style={formInputTextStyles.input} />
                {errorText !== null && (<Text style={textStyles.errorText}>{errorText}</Text>)}
            </View>

            <View style={containerStyles.rowContainer}>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={onPressDelete} />
                </View>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Update' onPress={onUpdatePress} />
                </View>
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
    onChangeText: PropTypes.func,
    onUpdatePress: PropTypes.func,
    onPressDelete: PropTypes.func,
    onButtonUpdate: PropTypes.func
};

FormUpdateInputText.defaultProps = {
    autoCapitalize: 'none',
    keyboardType: 'default',
    secureTextEntry: false,
    errorText: null,
};
