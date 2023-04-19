import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveSignificant, fetchUserSignificants, updateSignificant, deleteSignificant } from '../repository/significantsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { SignificantsForm, SignificantsDisplayForm, SignificantsUpdateForm } from '../components/SignificantsForm';

export default class Significants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newSignificantName: '',
      newSignificantRelation: '',
      newSignificantDateOfBirth: new Date(),
      showDatePicker: false,
      newSignificantAnniversary: new Date(),
      showDatePickerAnniversary: false,
      errors: {},
      savedSignificants: [],
      displayUpdateButton: true,
      showSignificantsInputForm: false,
      showEditSignificantsForm: false,
    }
  }

  handleShowDatePickerByKey = (key) => {
    let index = this.state.savedSignificants.findIndex(x => x.key === key);
    let savedSignificants = this.state.savedSignificants;

    savedSignificants[index].showDatePicker = !savedSignificants[index].showDatePicker;
    this.setState({ savedSignificants: savedSignificants});
  };

  handleDateChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedSignificants.findIndex(x => x.key === key);
    let savedSignificants = this.state.savedSignificants;

    savedSignificants[index].dateOfBirth = selectedDate || savedSignificants[index].dateOfBirth;

    this.setState({ savedSignificants: savedSignificants});
  }

  handleShowDatePickerAnniversaryByKey = (key) => {
    let index = this.state.savedSignificants.findIndex(x => x.key === key);
    let savedSignificants = this.state.savedSignificants;

    savedSignificants[index].showDatePickerAnniversary = !savedSignificants[index].showDatePickerAnniversary;
    this.setState({ savedSignificants: savedSignificants});
  };

  handleDateChangeAnniversaryByKey = (key, selectedDate, event) => {
    let index = this.state.savedSignificants.findIndex(x => x.key === key);
    let savedSignificants = this.state.savedSignificants;

    savedSignificants[index].anniversary = selectedDate || savedSignificants[index].anniversary;

    this.setState({ savedSignificants: savedSignificants});
  }

  handleShowSignificantsInputForm = () => {
    this.setState({ showSignificantsInputForm: !this.state.showSignificantsInputForm });
  };

  handleShowEditSignificantsForm = () => {
    this.setState({ showEditSignificantsForm: !this.state.showEditSignificantsForm });
  };
  
  handleShowDatePickerAnniversary = () => {
    this.setState({ showDatePickerAnniversary: !this.state.showDatePickerAnniversary });
  };

  handleDateChangeAnniversary = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newSignificantAnniversary;
    this.setState({ newSignificantAnniversary: currentDate });
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newSignificantDateOfBirth;
    this.setState({ newSignificantDateOfBirth: currentDate });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedSignificants = this.state.savedSignificants;
    let index = savedSignificants.findIndex(x => x.key === key);
    let significant = savedSignificants[index];

    // Add validation
    switch (value.field) {
      case 'name':
        significant.significantName = value.text;
        break;
      case 'relation':
        significant.significantRelation = value.text;
        break;
      case 'dateOfBirth':
        significant.significantDateOfBirth = value.text;
        break;
      case 'anniversary':
        significant.significantAnniversary = value.text;
        break;
      default:
        break;
    }

    this.setState({ savedSignificants: savedSignificants });
  };

  handleSaveSignificants = async () => {
    try {
      const response = await saveSignificant(auth.currentUser.uid, this.state.newSignificantName, this.state.newSignificantRelation, this.state.newSignificantDateOfBirth, this.state.newSignificantAnniversary);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Significant');
        this.setState({ newSignificantName: '', newSignificantRelation: '', newSignificantDateOfBirth: new Date(), newSignificantAnniversary: new Date() })
      } else {
        Alert.alert(response.message || 'Failed to save Significant');
        this.setState({ newSignificantName: '', newSignificantRelation: '', newSignificantDateOfBirth: new Date(), newSignificantAnniversary: new Date() })
      }

      await this.fetchUserSignificants();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdateSignificants = async (key) => {
    try {
      let savedSignificants = this.state.savedSignificants;
      let index = savedSignificants.findIndex(x => x.key === key);
      let significants = savedSignificants[index];

      const response = await updateSignificant(key, significants.name, significants.relation, significants.dateOfBirth, significants.anniversary);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Significant');
      } else {
        Alert.alert(response.message || 'Failed to update Significant');
      }

      await this.fetchUserSignificants();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleDeleteSignificants = async (key) => {
    try {
      const response = await deleteSignificant(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Significant');
      } else {
        Alert.alert(response.message || 'Failed to delete Significant');
      }

      await this.fetchUserSignificants();
    } catch (error) {
      console.log(error);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserSignificants = async () => {
    try {
      const response = await fetchUserSignificants(auth.currentUser.uid);
      if (response && response.success) {
        this.setState({ savedSignificants: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Significants');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserSignificants();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, {justifyContent: 'flex-start'}]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showSignificantsInputForm && (
            <FormButton title='Add a Significant' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowSignificantsInputForm} />
          )}

          {this.state.showSignificantsInputForm && (
            <SignificantsForm handleChange={this.handleChange} onFormClose={this.handleShowSignificantsInputForm} onFormSubmit={this.handleSaveSignificants} name={this.state.newSignificantName} relation={this.state.newSignificantRelation} dateOfBirth={this.state.newSignificantDateOfBirth} anniversary={this.state.newSignificantAnniversary} showDatePicker={this.state.showDatePicker} handleShowDatePicker={this.handleShowDatePicker} handleDateChange={this.handleDateChange} showDatePickerAnniversary={this.state.showDatePickerAnniversary} handleShowDatePickerAnniversary={this.handleShowDatePickerAnniversary} handleDateChangeAnniversary={this.handleDateChangeAnniversary} />
          )}

          {this.state.showEditSignificantsForm && (<FormButton title='Done' onPress={this.handleShowEditSignificantsForm} />)}

          {!this.state.showEditSignificantsForm && (<FormButton title='Edit Significants' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditSignificantsForm} />)}
      
          {!this.state.showEditSignificantsForm && (
            <FlatList data={this.state.savedSignificants} renderItem={({ item }) => (<SignificantsDisplayForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} anniversary={item.anniversary} />)} keyExtractor={item => item.key} />)}

          {this.state.showEditSignificantsForm && (
            <FlatList data={this.state.savedSignificants} renderItem={({ item }) => (<SignificantsUpdateForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} anniversary={item.anniversary} itemKey={item.key} handleChange={this.handleUpdateChange} onFormSubmit={this.handleUpdateSignificants} onPressDelete={this.handleDeleteSignificants} showDatePicker={item.showDatePicker} handleShowDatePicker={this.handleShowDatePickerByKey} handleDateChange={this.handleDateChangeByKey} handleDateChangeAnniversary={this.handleDateChangeAnniversaryByKey} showDatePickerAnniversary={item.showDatePickerAnniversary} handleShowDatePickerAnniversary={this.handleShowDatePickerAnniversaryByKey} />)} keyExtractor={item => item.key} />)}
        </View>
      </View>
    );
  }
}
