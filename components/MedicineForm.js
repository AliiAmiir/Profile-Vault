import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Styles
import { containerStyles, textStyles } from '../styles/globalStyle';
import FormInputText from './FormInputText';

export const MedicineForm = ({ index, medicine, handleChange, removeMedicineRow, errorText }) => {
    return (
        <View style={containerStyles.textInputContainer}>
            <View style={containerStyles.rowContainerSpaceBetween}>
                <View style={[containerStyles.rowMedicineButtonContainer]}>
                    <FormInputText autoCapitalize={'sentences'} label="Name" value={medicine.name} onChangeText={(value) => handleChange(index, 'name', value)} />
                    <FormInputText label="Dosage (in mg)" keyboardType={'numeric'} value={medicine.dosage} onChangeText={(value) => handleChange(index, 'dosage', value)} />
                    <FormInputText autoCapitalize={'sentences'} label="Frequency" value={medicine.frequency} onChangeText={(value) => handleChange(index, 'frequency', value)} />
                </View>

                <View style={containerStyles.rowPasswordButtonContainer}>
                    <Button onPress={() => removeMedicineRow(index)} type='clear' icon={<Icon name="trash" size={20} color="#CD5151" />} />
                </View>
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

export const MedicineUpdateForm = ({ itemKey, index, medicine, handleChange, removeMedicineRow }) => {
    return (
        <View style={containerStyles.textInputContainer}>
            <View style={containerStyles.rowContainerSpaceBetween}>
                <View style={[containerStyles.rowMedicineButtonContainer]}>
            <FormInputText autoCapitalize={'sentences'} label="Name" value={medicine.name} onChangeText={(value) => handleChange(itemKey, index, 'name', value)} />
            <FormInputText label="Dosage (in mg)" keyboardType={'numeric'} value={medicine.dosage} onChangeText={(value) => handleChange(itemKey, index, 'dosage', value)} />
            <FormInputText autoCapitalize={'sentences'} label="Frequency" value={medicine.frequency} onChangeText={(value) => handleChange(itemKey, index, 'frequency', value)} />
                </View>

                <View style={containerStyles.rowPasswordButtonContainer}>
                    <Button onPress={() => removeMedicineRow(itemKey)} type='clear' icon={<Icon name="trash" size={20} color="#CD5151" />} />
                </View>
            </View>
        </View>
    );
}

MedicineUpdateForm.propTypes = {
    itemKey: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    medicine: PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    }),
    handleChange: PropTypes.func.isRequired,
    removeMedicineRow: PropTypes.func,
};

MedicineUpdateForm.defaultProps = {
    medicine: {
        name: '',
        dosage: '',
        frequency: '',
    }
};
