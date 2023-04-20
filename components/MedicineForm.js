import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

// Import Styles
import { containerStyles, formInputTextStyles, textStyles } from '../styles/globalStyle';
import FormInputText from './FormInputText';
import FormText from './FormText';

export const MedicineForm = ({ index, medicine, handleChange, errorText }) => {
    return (
        <View>
            <FormInputText label="Name" value={medicine.name} onChangeText={(value) => handleChange(index, 'name', value)} />
            <FormInputText label="Dosage" value={medicine.dosage} onChangeText={(value) => handleChange(index, 'dosage', value)} />
            <FormInputText label="Frequency" value={medicine.frequency} onChangeText={(value) => handleChange(index, 'frequency', value)} />
            {errorText !== null && (<Text style={textStyles.errorText}>{errorText}</Text>)}
        </View>
    );
}

MedicineForm.propTypes = {
    index: PropTypes.number.isRequired,
    medicine: PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    }),
    handleChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
};

MedicineForm.defaultProps = {
    medicine: {
        name: '',
        dosage: '',
        frequency: '',
    },
    errorText: null,
};

export const MedicineDisplayForm = ({ medicine }) => {
    return (
        <View>
            <FormText label="Name" value={medicine.name} />
            <FormText label="Dosage" value={medicine.dosage} />
            <FormText label="Frequency" value={medicine.frequency} />
        </View>
    );
}

MedicineDisplayForm.propTypes = {
    medicine: PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    }),
};

MedicineDisplayForm.defaultProps = {
    medicine: {
        name: '',
        dosage: '',
        frequency: '',
    }
};
