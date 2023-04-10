import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { containerStyles } from '../styles/globalStyle';
import { Avatar } from 'react-native-elements';
import { computeInitials } from '../utils/computeUtil';

export default function UserAvatar({ firstName, lastName, imageUrl }) {
    if (imageUrl && imageUrl.trim() !== '') {
        return (
            <View style={containerStyles.avatarContainer}>
                <Avatar size={120} rounded source={{ uri: { imageUrl } }} />
            </View>
        );
    }

    const initials = computeInitials(firstName, lastName);

    return (
        <View style={containerStyles.avatarContainer}>
            <Avatar size={120} rounded title={initials} overlayContainerStyle={{ backgroundColor: '#F2F2F7' }} />
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