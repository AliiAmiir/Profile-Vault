import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveHealth, fetchUserHealth, updateHealth, deleteHealth } from '../repository/healthRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class Health extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newHealthCheckUpDate: '',
      newHealthDiagonsis: '',
      newHealthMedicines: '',
      newHealthDuration: '',
      errors: {},
      saveHealth: [],
      displayUpdateButton: true,
    }
  }

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

handleUpdateChange = (key, value) => {
  let saveHealth = this.state.saveHealth;
  let index = saveHealth.findIndex(x => x.key === key);
  let health = saveHealth[index];

  switch (value.field) {
    case 'checkUpDate':
      health.healthCheckUpDate = value.text; // update the correct property
      break;
    case 'diagnosis':
      health.healthDiagonsis = value.text; // update the correct property
      break;
    case 'medicines':
      health.healthMedicines = value.text; // update the correct property
      break;
    case 'duration':
      health.healthDuration = value.text; // update the correct property
      break;
    default:
      break;
  }

  // Add validation

  this.setState({ saveHealth: saveHealth });
};

  

  handleSaveHealth = async () => {
    try {
      const response = await saveHealth(auth.currentUser.uid, this.state.newHealthCheckUpDate, this.state.newHealthDiagonsis, this.state.newHealthMedicines, this.state.newHealthDuration);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Health');
        this.setState({ newHealthCheckUpDate: '', newHealthDiagonsis: '', newHealthMedicines: '', newHealthDuration: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Health');
        this.setState({ newHealthCheckUpDate: '', newHealthDiagonsis: '', newHealthMedicines: '', newHealthDuration: '' })
      }

      await this.fetchUserHealth();
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdateHealth = async (key) => {
    try {
      let saveHealth = this.state.saveHealth;
      let index = saveHealth.findIndex(x => x.key === key);
      let health = saveHealth[index];
  
      const response = await updateHealth(auth.currentUser.uid, key, health.healthCheckUpDate, health.healthDiagonsis, health.healthMedicines, health.healthDuration);
  
      if (response && response.success) {
        Alert.alert(response.message || 'Updated Health');
      } else {
        Alert.alert(response.message || 'Failed to update Health');
      }
  
      await this.fetchUserHealth();
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  fetchUserHealth = async () => {
    try {
      const response = await fetchUserHealth(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ saveHealth: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Health');
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUserHealth();
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Check-up Date"
            value={this.state.newHealthCheckUpDate}
            onChangeText={(value) => this.handleChange('newHealthCheckUpDate', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Diagnosis"
            value={this.state.newHealthDiagonsis}
            onChangeText={(value) => this.handleChange('newHealthDiagonsis', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Medicines"
            value={this.state.newHealthMedicines}
            onChangeText={(value) => this.handleChange('newHealthMedicines', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Duration"
            value={this.state.newHealthDuration}
            onChangeText={(value) => this.handleChange('newHealthDuration', value)}
          />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton
            title="Save Health"
            onPress={() => this.handleSaveHealth()}
          />
        </View>
        <View style={containerStyles.flatListContainer}>
        <FlatList
          data={this.state.saveHealth}
          renderItem={({ item }) => (
            <View style={containerStyles.textInputContainer}>
              <View style={styles.relativeContainer}>
                <View style={styles.inputsWrapper}>
                  <FormUpdateInputText
                    label="checkUpDate"
                    value={item.healthCheckUpDate}
                    onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'checkUpDate', text })}
                  />
                  <FormUpdateInputText
                    label="Diagnosis"
                    value={item.healthDiagonsis}
                    onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'diagnosis', text })}
                  />
                  <FormUpdateInputText
                    label="Medicines"
                    value={item.healthMedicines}
                    onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'medicines', text })}
                  />
                  <FormUpdateInputText
                    label="Duration"
                    value={item.healthDuration}
                    onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'duration', text })}
                  />
                </View>
                <View style={styles.buttonsWrapper}>
                  <FormButton
                    title="Update"
                    onPress={() => this.handleUpdateHealth(item.key)}
                  />
                  <FormButton
                    title="Delete"
                    onPress={() => this.handleDeleteHealth(item.key)}
                  />
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relativeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  inputsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});