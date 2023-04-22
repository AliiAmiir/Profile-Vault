import PropTypes from 'prop-types';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import StyleSheets
import { containerStyles, textStyles, formButtonStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';

export const PasswordForm = function ({ website, email, password, errors, handleChange, onFormSubmit, onFormClose }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="Website" value={website} onChangeText={(value) => handleChange('newWebsite', value)} />
                <FormInputText label='Email/Username' value={email} onChangeText={(value) => handleChange('newEmail', value)} />
                <FormInputText secureTextEntry={true} label='Password' value={password} onChangeText={(value) => handleChange('newPassword', value)} />
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

export const PasswordDisplayForm = function ({ website, email, password, showPassword, onPressShowPassword }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View style={containerStyles.rowContainerSpaceBetween}>
                <View style={[containerStyles.rowPasswordButtonContainer]}>
                    <Text style={textStyles.textSubHeading}>{website}</Text>
                    <Text style={textStyles.boldText}>Email/Username: <Text style={textStyles.subText}>{email}</Text></Text>
                    {!showPassword && (<Text style={textStyles.boldText}>Password: <Text style={textStyles.subText}>******</Text></Text>)}
                    {showPassword && (<Text style={textStyles.boldText}>Password: <Text style={textStyles.subText}>{password}</Text></Text>)}
                </View>

                <View style={containerStyles.rowPasswordButtonContainer}>
                    {!showPassword && (<Button onPress={onPressShowPassword} type='clear' icon={<Icon name="eye" size={20} color="black" />} />)}
                    {showPassword && (<Button onPress={onPressShowPassword} type='clear' icon={<Icon name="eye-slash" size={20} color="black" />} />)}
                </View>
            </View>
        </View>
    );
}

PasswordDisplayForm.propTypes = {
    website: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    showPassword: PropTypes.bool,
    onPressShowPassword: PropTypes.func,
};

PasswordDisplayForm.defaultProps = {
    website: '',
    email: '',
    password: '',
    showPassword: false,
};

export const PasswordUpdateForm = function ({ itemKey, website, email, password, errors, handleChange, onFormSubmit, onPressDelete }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label="Website" value={website} onChangeText={(value) => handleChange(itemKey, { field: 'website', value: value })} />
                <FormInputText label='Email/Username' value={email} onChangeText={(value) => handleChange(itemKey, { field: 'email', value: value })} />
                <FormInputText secureTextEntry={true} label='Password' value={password} onChangeText={(value) => handleChange(itemKey, { field: 'password', value: value })} />
            </View>
            <View style={containerStyles.rowContainer}>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                </View>
                <View style={containerStyles.rowButtonsContainer}>
                    <FormButton title='Update' onPress={() => onFormSubmit(itemKey)} />
                </View>
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
