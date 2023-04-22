import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import StyleSheets
import { containerStyles, formInputTextStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';
import { MedicineForm, MedicineDisplayForm, MedicineUpdateForm } from './MedicineForm';

export const HealthForm = function ({ checkUpType, checkUpDate, diagnosis, doctor, medicines, errors, handleChange, handleChangeMedicine, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, handleAddMedicine, handleRemoveMedicine }) {
    return (
        <ScrollView style={containerStyles.textInputContainer}>
            <View>
                <FormInputText autoCapitalize={'sentences'} label="Check Up/Incident Type" value={checkUpType} onChangeText={(value) => handleChange('newHealthCheckUpType', value)} />
                <FormInputText autoCapitalize={'sentences'} label="Diagnosis" value={diagnosis} onChangeText={(value) => handleChange('newHealthDiagnosis', value)} />
                <FormInputText autoCapitalize={'sentences'} label="Doctor" value={doctor} onChangeText={(value) => handleChange('newDoctorName', value)} />
                <CustomDatePicker label={'Check Up/Incident Date'} dateOfBirth={checkUpDate} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={new Date()} />
                <View style={containerStyles.textInputContainer}>
                    <Text style={[formInputTextStyles.label, textStyles.textSubHeading]}>Medicines</Text>
                    {medicines.map((medicine, index) => (
                        <MedicineForm
                            key={index}
                            index={index}
                            medicine={medicine}
                            handleChange={handleChangeMedicine}
                            removeMedicineRow={handleRemoveMedicine}
                        />
                    ))}
                    <Button onPress={handleAddMedicine} type='outline' icon={<Icon name="plus" size={20} color="#6374D1" />} />
                </View>
            </View>

            <View style={containerStyles.buttonContainer}>
                <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={onFormClose} />
                <FormButton title='Save Health' onPress={onFormSubmit} />
            </View>
        </ScrollView>
    );
}

HealthForm.propTypes = {
    checkUpType: PropTypes.string,
    checkUpDate: PropTypes.instanceOf(Date),
    diagnosis: PropTypes.string,
    doctor: PropTypes.string,
    medicines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    })),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    handleChangeMedicine: PropTypes.func,
    handleAddMedicine: PropTypes.func,
    handleRemoveMedicine: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleDateChange: PropTypes.func,
};

HealthForm.defaultProps = {
    checkUpType: '',
    diagnosis: '',
    doctor: '',
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
    errors: null,
};

export const HealthDisplayForm = function ({ checkUpType, diagnosis, doctor, checkUpDate, medicines }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View style={containerStyles.textInputContainer}>
                <Text style={textStyles.textSubHeading}>{checkUpType}</Text>
                <Text style={textStyles.boldText}>{checkUpDate.toLocaleDateString()}</Text>
                <Text style={textStyles.boldText}>Diagnosis: <Text style={textStyles.subText}>{diagnosis}</Text></Text>
                <Text style={textStyles.boldText}>Doctor: <Text style={textStyles.subText}>{doctor}</Text></Text>
                {medicines && medicines.length > 0 && (
                <View>
                    <Text style={[formInputTextStyles.label, textStyles.textMiniHeading]}>Medicines</Text>
                    {medicines.map((medicine, index) => (
                        <MedicineDisplayForm key={index} index={index} medicine={medicine} />
                    ))}
                </View>
                )}
            </View>
        </View>
    );
}

HealthDisplayForm.propTypes = {
    checkUpType: PropTypes.string,
    diagnosis: PropTypes.string,
    doctor: PropTypes.string,
    checkUpDate: PropTypes.instanceOf(Date),
    medicines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    })),
};

HealthDisplayForm.defaultProps = {
    checkUpType: '',
    diagnosis: '',
    doctor: '',
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
};

export const HealthUpdateForm = function ({ itemKey, checkUpType, diagnosis, doctor, checkUpDate, medicines, showDatePicker, handleChange, handleDateChange, handleShowDatePicker, onPressDelete, onFormSubmit, handleAddMedicine, handleRemoveMedicine, handleChangeMedicine }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText autoCapitalize={'sentences'} label='Check Up/Incident Type' value={checkUpType} onChangeText={(value) => handleChange(itemKey, { field: 'checkUpType', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label='Diagnosis' value={diagnosis} onChangeText={(value) => handleChange(itemKey, { field: 'diagnosis', value: value })} />
                <FormInputText autoCapitalize={'sentences'} label='Doctor' value={doctor} onChangeText={(value) => handleChange(itemKey, { field: 'doctor', value: value })} />
                <CustomDatePicker label={'Check Up/Incident Date'} dateOfBirth={checkUpDate} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={new Date()} />
                <View style={containerStyles.textInputContainer}>
                    <Text style={[formInputTextStyles.label, textStyles.textSubHeading]}>Medicines</Text>
                    {medicines.map((medicine, index) => (
                        <MedicineUpdateForm
                            key={index}
                            itemKey={itemKey}
                            index={index}
                            medicine={medicine}
                            handleChange={handleChangeMedicine}
                            addMedicineRow={handleAddMedicine}
                            removeMedicineRow={handleRemoveMedicine}
                        />
                    ))}
                    <Button onPress={() => handleAddMedicine(itemKey)} type='outline' icon={<Icon name="plus" size={20} color="#6374D1" />} />
                </View>
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

HealthUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    checkUpType: PropTypes.string,
    doctor: PropTypes.string,
    diagnosis: PropTypes.string,
    checkUpDate: PropTypes.instanceOf(Date),
    medicines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    })),
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onPressDelete: PropTypes.func,
    showDatePicker: PropTypes.bool,
    handleShowDatePicker: PropTypes.func,
    handleChangeMedicine: PropTypes.func,
    handleAddMedicine: PropTypes.func,
    handleRemoveMedicine: PropTypes.func,
    handleDateChange: PropTypes.func,
};

HealthUpdateForm.defaultProps = {
    itemKey: '',
    checkUpType: '',
    doctor: '',
    diagnosis: '',
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
    errors: null,
};
