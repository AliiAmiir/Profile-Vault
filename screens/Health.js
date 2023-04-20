import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveHealth, fetchUserHealth, updateHealth, deleteHealth } from '../repository/healthRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { HealthForm, HealthDisplayForm, HealthUpdateForm } from '../components/HealthForm';

export default class Health extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newHealthCheckUpType: '',
      newHealthCheckUpDate: new Date(),
      showDatePicker: false,
      newHealthMedicines: [{ name: '', dosage: '', frequency: '' }],
      errors: {},
      savedHealthDetails: [],
      displayUpdateButton: true,
      showHealthInputForm: false,
      showEditHealthForm: false,
    }
  }

  handleShowDatePickerByKey = (key) => {
    let index = this.state.savedHealthDetails.findIndex(x => x.key === key);
    let savedHealthDetails = this.state.savedHealthDetails;

    savedHealthDetails[index].showDatePicker = !savedHealthDetails[index].showDatePicker;
    this.setState({ savedHealthDetails: savedHealthDetails });
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newHealthCheckUpDate;
    this.setState({ newHealthCheckUpDate: currentDate });
  };

  handleDateChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedHealthDetails.findIndex(x => x.key === key);
    let savedHealthDetails = this.state.savedHealthDetails;

    savedHealthDetails[index].checkUpDate = selectedDate || savedHealthDetails[index].checkUpDate;

    this.setState({ savedHealthDetails: savedHealthDetails });
  }

  handleShowHealthInputForm = () => {
    this.setState({ showHealthInputForm: !this.state.showHealthInputForm });
  };

  handleShowEditHealthForm = () => {
    this.setState({ showEditHealthForm: !this.state.showEditHealthForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleChangeMedicine = (index, key, value) => {
    let newHealthMedicines = this.state.newHealthMedicines;
    let newHealthMedicine = this.state.newHealthMedicines[index];
    newHealthMedicine[key] = value;

    newHealthMedicines[index] = newHealthMedicine;
    // Add validation
    this.setState({ newHealthMedicines });
  };

  handleAddMedicine = () => {
    let newHealthMedicines = this.state.newHealthMedicines;
    newHealthMedicines.push({ name: '', dosage: '', frequency: '' });
    this.setState({ newHealthMedicines });
  };

  handleRemoveMedicine = (index) => {
    let newHealthMedicines = this.state.newHealthMedicines;
    newHealthMedicines.splice(index, 1);
    this.setState({ newHealthMedicines });
  };

  handleAddMedicineByKey = (key) => {
    let index = this.state.savedHealthDetails.findIndex(x => x.key === key);
    let savedHealthDetails = this.state.savedHealthDetails;
    let health = savedHealthDetails[index];
    let medicines = health.medicines;
    medicines.push({ name: '', dosage: '', frequency: '' });
    health.medicines = medicines;
    savedHealthDetails[index] = health;

    this.setState({ savedHealthDetails: savedHealthDetails });
  };

  handleRemoveMedicineByKey = (key) => {
    let index = this.state.savedHealthDetails.findIndex(x => x.key === key);
    let savedHealthDetails = this.state.savedHealthDetails;
    let health = savedHealthDetails[index];
    let medicines = health.medicines;
    medicines.splice(index, 1);

    health.medicines = medicines;
    savedHealthDetails[index] = health;
    this.setState({ savedHealthDetails: savedHealthDetails });
  };

  handleChangeMedicineByKey = (keyIndex, index, keyName, value) => {
    let healthInfoIndex = this.state.savedHealthDetails.findIndex(x => x.key === keyIndex);
    let healthInfo = this.state.savedHealthDetails[healthInfoIndex];
    let medicines = healthInfo.medicines;
    let medicine = medicines[index];
    medicine[keyName] = value;

    medicines[index] = medicine;
    healthInfo.medicines = medicines;
    this.setState({ savedHealthDetails: this.state.savedHealthDetails });
  };

  handleUpdateChange = (key, value) => {
    let savedHealthDetails = this.state.savedHealthDetails;
    let index = savedHealthDetails.findIndex(x => x.key === key);

    let valueAtIndex = savedHealthDetails[index];
    valueAtIndex[value.field] = value.value;

    savedHealthDetails[index] = valueAtIndex;

    // Add validation
    this.setState({ savedHealthDetails: savedHealthDetails });
  };

  handleSaveHealth = async () => {
    try {
      const healthDetails = {
        checkUpType: this.state.newHealthCheckUpType,
        checkUpDate: this.state.newHealthCheckUpDate,
        medicines: this.state.newHealthMedicines,
      };

      const response = await saveHealth(auth.currentUser.uid, healthDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Health');
        this.setState({ newHealthCheckUpType: '', newHealthCheckUpDate: new Date(), newHealthMedicines: [{ name: '', dosage: '', frequency: '' }], showHealthInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Health');
        this.setState({ newHealthCheckUpType: '', newHealthCheckUpDate: new Date(), newHealthMedicines: [{ name: '', dosage: '', frequency: '' }], showHealthInputForm: false })
      }

      await this.fetchUserHealth();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdateHealth = async (key) => {
    try {
      let savedHealthDetails = this.state.savedHealthDetails;
      let index = savedHealthDetails.findIndex(x => x.key === key);
      let health = savedHealthDetails[index];

      const healthDetails = {
        checkUpType: health.checkUpType,
        checkUpDate: health.checkUpDate,
        medicines: health.medicines,
      };

      const response = await updateHealth(key, healthDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Health');
      } else {
        Alert.alert(response.message || 'Failed to update Health');
      }

      await this.fetchUserHealth();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleDeleteHealth = async (key) => {
    try {
      const response = await deleteHealth(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Health');
      } else {
        Alert.alert(response.message || 'Failed to delete Health');
      }

      await this.fetchUserHealth();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserHealth = async () => {
    try {
      const response = await fetchUserHealth(auth.currentUser.uid);
      if (response && response.success) {
        this.setState({ savedHealthDetails: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Health');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserHealth();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showHealthInputForm && (
            <FormButton title='Add a Health' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowHealthInputForm} />
          )}

          {this.state.showHealthInputForm && (
            <HealthForm
              checkUpType={this.state.newHealthCheckUpType}
              checkUpDate={this.state.newHealthCheckUpDate}
              medicines={this.state.newHealthMedicines}
              handleChange={this.handleChange}
              handleChangeMedicine={this.handleChangeMedicine}
              onFormClose={this.handleShowHealthInputForm}
              onFormSubmit={this.handleSaveHealth}
              showDatePicker={this.state.showDatePicker}
              handleShowDatePicker={this.handleShowDatePicker}
              handleDateChange={this.handleDateChange}
              handleAddMedicine={this.handleAddMedicine}
              handleRemoveMedicine={this.handleRemoveMedicine}
            />
          )}

          {this.state.showEditHealthForm && !this.state.showHealthInputForm && (<FormButton title='Done' onPress={this.handleShowEditHealthForm} />)}

          {!this.state.showEditHealthForm && !this.state.showHealthInputForm && (<FormButton title='Edit Health' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditHealthForm} />)}

          {!this.state.showEditHealthForm && !this.state.showHealthInputForm && (
            <FlatList data={this.state.savedHealthDetails} renderItem={({ item }) => (
              <HealthDisplayForm
                checkUpType={item.checkUpType}
                checkUpDate={item.checkUpDate}
                medicines={item.medicines}
              />
            )}
              keyExtractor={item => item.key}
            />
          )}

          {this.state.showEditHealthForm && !this.state.showHealthInputForm && (
            <FlatList data={this.state.savedHealthDetails} renderItem={({ item }) => (
              <HealthUpdateForm
                itemKey={item.key}
                checkUpType={item.checkUpType}
                checkUpDate={item.checkUpDate}
                medicines={item.medicines}
                handleChange={this.handleUpdateChange}
                onFormSubmit={this.handleUpdateHealth}
                onPressDelete={this.handleDeleteHealth}
                showDatePicker={item.showDatePicker}
                handleShowDatePicker={this.handleShowDatePickerByKey}
                handleDateChange={this.handleDateChangeByKey}
                handleChangeMedicine={this.handleChangeMedicineByKey}
                handleAddMedicine={this.handleAddMedicineByKey}
                handleRemoveMedicine={this.handleRemoveMedicineByKey}
              />
            )}
              keyExtractor={item => item.key}
            />
          )}
        </View>
      </View>
    );
  }
}
