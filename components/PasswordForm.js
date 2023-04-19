import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormText from './FormText';
import FormButton from './FormButton';
import FormInputText from './FormInputText';

export const PasswordForm = function ({ website, email, password, errors, handleChange, onFormSubmit, onFormClose }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="Website" value={website} onChangeText={(value) => handleChange('newWebsite', value)} />
                <FormInputText label='Email' value={email} onChangeText={(value) => handleChange('newEmail', value)} />
                <FormInputText label='Password' value={password} onChangeText={(value) => handleChange('newPassword', value)} />
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Password' onPress={onFormSubmit} />
            </View>
        </View>
    );
}

PasswordForm.propTypes = {
    website: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
};

PasswordForm.defaultProps = {
    website: '',
    email: '',
    password: '',
    errors: null,
};

export const PasswordDisplayForm = function ({ website, email, password }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <FormText label="Website" value={website} />
            <FormText label='Email' value={email} />
            <FormText label='Password' value={password} />
        </View>
    );
}

PasswordDisplayForm.propTypes = {
    website: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
};

PasswordDisplayForm.defaultProps = {
    website: '',
    email: '',
    password: '',
};

export const PasswordUpdateForm = function ({ itemKey, website, email, password, errors, handleChange, onFormSubmit, onPressDelete }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label="Website" value={website} onChangeText={(value) => handleChange(itemKey, { field: 'website', value: value })} />
                <FormInputText label='Email' value={email} onChangeText={(value) => handleChange(itemKey, { field: 'email', value: value })} />
                <FormInputText label='Password' value={password} onChangeText={(value) => handleChange(itemKey, { field: 'password', value: value })} />
            </View>
            <View style={containerStyles.buttonContainer}>
                <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                <FormButton title='Save Password' onPress={() => onFormSubmit(itemKey)} />
            </View>
        </View>
    );
}

PasswordUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
};

PasswordUpdateForm.defaultProps = {
    website: '',
    email: '',
    password: '',
    errors: null,
};
