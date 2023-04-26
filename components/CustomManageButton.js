import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { formButtonStyles } from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

export default function CustomManageButton({ title, iconName, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={[formButtonStyles.manageButton]}>
            <View style={containerStyles.rowContainer}>
                <View style={[containerStyles.rowButtonsContainer, {flexDirection: 'row', justifyContent: 'flex-start'}]}>
                    <Text style={[formButtonStyles.formButtonText, { color: '#6374D1' }]}> {title} </Text>
                </View>
                <View style={[containerStyles.rowButtonsContainer, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    <Icon name={iconName} size={20} color="#6374D1" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

CustomManageButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

CustomManageButton.defaultProps = {
    title: '',
};
