import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { containerStyles } from '../styles/globalStyle';
import { Avatar } from 'react-native-elements';


export default function UserAvatar({ firstName, lastName, imageUrl }) {
    if(imageUrl && imageUrl.trim() !== '') {
        return (
            <View style={containerStyles.avatarContainer}>
                <Avatar size={120} rounded title='RS' overlayContainerStyle={{ backgroundColor: '#F2F2F7' }} />
            </View>
        );
    } 

    return (
        <View style={containerStyles.avatarContainer}>
            <Avatar size={120} rounded title='SR' overlayContainerStyle={{ backgroundColor: '#F2F2F7' }} />
        </View>
    );
}

UserAvatar.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
};

UserAvatar.defaultProps = {
    imageUrl: '',
};