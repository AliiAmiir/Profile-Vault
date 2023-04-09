import React from 'react';
import logo from '../assets/logo.png';
import { View, Image } from 'react-native';
import { containerStyles, logoStyles } from '../styles/globalStyle';

export default function Logo() {
    return (
        <View style={containerStyles.logoContainer}>
            <Image style={logoStyles.image} source={logo} />
        </View>);
}

Logo.propTypes = {};