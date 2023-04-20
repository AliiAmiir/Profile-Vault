import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Styles
import { containerStyles, formInputTextStyles, formButtonStyles, textStyles } from '../styles/globalStyle';
import FormInputText from './FormInputText';

export const MedicineForm = ({ index, medicine, handleChange, addMedicineRow, removeMedicineRow, errorText }) => {
    return (
        <View>
            <FormInputText label="Name" value={medicine.name} onChangeText={(value) => handleChange(index, 'name', value)} />
            <FormInputText label="Dosage" value={medicine.dosage} onChangeText={(value) => handleChange(index, 'dosage', value)} />
            <FormInputText label="Frequency" value={medicine.frequency} onChangeText={(value) => handleChange(index, 'frequency', value)} />
            <View style={containerStyles.row}>
                <TouchableOpacity onPress={addMedicineRow}>
                    <Icon name="plus" size={20} color="lightblue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeMedicineRow(index)}>
                    <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>
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
    addMedicineRow: PropTypes.func,
    removeMedicineRow: PropTypes.func,
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
    const medicineDetails = `${medicine.name}, ${medicine.dosage}, ${medicine.frequency}`
    return (
        <View>
            <Text style={textStyles.subText}>{medicineDetails}</Text>
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
