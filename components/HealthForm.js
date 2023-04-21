import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, Text } from 'react-native';

// Import StyleSheets
import { containerStyles, formInputTextStyles, textStyles } from '../styles/globalStyle';

// Import Components
import FormText from './FormText';
import FormButton from './FormButton';
import FormInputText from './FormInputText';
import CustomDatePicker from './CustomDatePicker';
import CustomPicker from './CustomPicker';
import { MedicineForm, MedicineDisplayForm, MedicineUpdateForm } from './MedicineForm';

export const HealthForm = function ({ checkUpType, checkUpDate, medicines, errors, handleChange, handleChangeMedicine, onFormSubmit, onFormClose, showDatePicker, handleShowDatePicker, handleDateChange, handleAddMedicine, handleRemoveMedicine }) {
    return (
        <ScrollView style={containerStyles.textInputContainer}>
            <View>
                <FormInputText label="Check Up Type" value={checkUpType} onChangeText={(value) => handleChange('newHealthCheckUpType', value)} />
                <CustomDatePicker label={'Check Up Date'} dateOfBirth={checkUpDate} showDatePicker={showDatePicker} handleDateChange={handleDateChange} handleShowDatePicker={handleShowDatePicker} maximumDate={new Date()} />
                <View style={containerStyles.textInputContainer}>
                    <Text style={[formInputTextStyles.label, textStyles.textSubHeading]}>Medicines</Text>
                    {medicines.map((medicine, index) => (
                        <MedicineForm
                            key={index}
                            index={index}
                            medicine={medicine}
                            handleChange={handleChangeMedicine}
                            addMedicineRow={handleAddMedicine}
                            removeMedicineRow={handleRemoveMedicine}
                        />
                    ))}
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
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
    errors: null,
};

export const HealthDisplayForm = function ({ checkUpType, checkUpDate, medicines }) {
    return (
        <View style={containerStyles.textInputContainer}>
            <View style={containerStyles.textInputContainer}>
                <Text style={textStyles.textSubHeading}>{checkUpType}</Text>
                <Text style={textStyles.boldText}>{checkUpDate.toLocaleDateString()}</Text>
                <View>
                    <Text style={[formInputTextStyles.label, textStyles.textMiniHeading]}>Medicines</Text>
                    {medicines.map((medicine, index) => (
                        <MedicineDisplayForm
                            key={index}
                            index={index}
                            medicine={medicine}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

HealthDisplayForm.propTypes = {
    checkUpType: PropTypes.string,
    checkUpDate: PropTypes.instanceOf(Date),
    medicines: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        frequency: PropTypes.string,
    })),
};

HealthDisplayForm.defaultProps = {
    checkUpType: '',
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
};

export const HealthUpdateForm = function ({ itemKey, checkUpType, checkUpDate, medicines, showDatePicker, handleChange, handleDateChange, handleShowDatePicker, onPressDelete, onFormSubmit, handleAddMedicine, handleRemoveMedicine, handleChangeMedicine }) {
    return (
        <View>
            <View style={containerStyles.textInputContainer}>
                <FormInputText label='Check Up Type' value={checkUpType} onChangeText={(value) => handleChange(itemKey, { field: 'checkUpType', value: value })} />
                <CustomDatePicker label={'Check Up Date'} dateOfBirth={checkUpDate} showDatePicker={showDatePicker} handleDateChange={(event, value) => handleDateChange(itemKey, value)} handleShowDatePicker={(value) => handleShowDatePicker(itemKey, value)} maximumDate={new Date()} />
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
                </View>
            </View>
            <View style={containerStyles.buttonContainer}>
                <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => onPressDelete(itemKey)} />
                <FormButton title='Save Health' onPress={() => onFormSubmit(itemKey)} />
            </View>
        </View>
    );
}

HealthUpdateForm.propTypes = {
    itemKey: PropTypes.string,
    checkUpType: PropTypes.string,
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
    checkUpDate: new Date(),
    medicines: [{ name: '', dosage: '', frequency: '' }],
    errors: null,
};
