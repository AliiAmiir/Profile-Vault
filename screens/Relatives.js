import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveRelative, fetchUserRelatives, updateRelative, deleteRelative } from '../repository/relativesRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { RelativesForm, RelativesDisplayForm, RelativesUpdateForm } from '../components/RelativesForm';

export default class Relatives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newRelativeName: '',
      newRelativeRelation: '',
      newRelativeDateOfBirth: new Date(),
      showDatePicker: false,
      errors: {},
      savedRelatives: [],
      showRelativesInputForm: false,
      showEditRelativesForm: false,
    }
  }

  handleShowDatePickerByKey = (key) => {
    let index = this.state.savedRelatives.findIndex(x => x.key === key);
    let savedRelatives = this.state.savedRelatives;

    savedRelatives[index].showDatePicker = !savedRelatives[index].showDatePicker;
    this.setState({ savedRelatives: savedRelatives});
  };

  handleShowDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.newRelativeDateOfBirth;
    this.setState({ newRelativeDateOfBirth: currentDate });
  };

  handleDateChangeByKey = (key, selectedDate, event) => {
    let index = this.state.savedRelatives.findIndex(x => x.key === key);
    let savedRelatives = this.state.savedRelatives;

    savedRelatives[index].dateOfBirth = selectedDate || savedRelatives[index].dateOfBirth;

    this.setState({ savedRelatives: savedRelatives});
  }

  handleShowRelativesInputForm = () => {
    this.setState({ showRelativesInputForm: !this.state.showRelativesInputForm });
  };

  handleShowEditRelativesForm= () => {
    this.setState({ showEditRelativesForm: !this.state.showEditRelativesForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value, showDatePicker: false});
  };

  handleUpdateChange = (key, value) => {
    let savedRelatives = this.state.savedRelatives;
    let index = savedRelatives.findIndex(x => x.key === key);

    let valueAtIndex = savedRelatives[index];
    valueAtIndex[value.field] = value.value;

    savedRelatives[index] = valueAtIndex;

    // Add validation
    this.setState({ savedRelatives: savedRelatives });
  };

  handleSaveRelative = async () => {
    try {
      const response = await saveRelative(auth.currentUser.uid, this.state.newRelativeName, this.state.newRelativeRelation, this.state.newRelativeDateOfBirth);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: new Date(), showRelativesInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: new Date() })
      }

      await this.fetchUserRelatives();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdateRelative = async (key) => {
    try {
      let savedRelatives = this.state.savedRelatives;
      let index = savedRelatives.findIndex(x => x.key === key);
      let relative = savedRelatives[index];
      
      const response = await updateRelative(auth.currentUser.uid, relative.key, relative.name, relative.relation, relative.dateOfBirth);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Relative');
      } else {
        Alert.alert(response.message || 'Failed to update Relative');
      }

      await this.fetchUserRelatives();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleDeleteRelative = async (key) => {
    try {
      const response = await deleteRelative(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Relative');
      } else {
        Alert.alert(response.message || 'Failed to delete Relative');
      }

      await this.fetchUserRelatives();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserRelatives = async () => {
    try {
      const response = await fetchUserRelatives(auth.currentUser.uid);
      if (response && response.success) {
        this.setState({ savedRelatives: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Relatives');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserRelatives();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, {justifyContent: 'flex-start'}]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showRelativesInputForm && !this.state.showEditRelativesForm && (
            <FormButton title='Add a Relative' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowRelativesInputForm} />
          )}

          {this.state.showRelativesInputForm && (
            <RelativesForm handleChange={this.handleChange} onFormClose={this.handleShowRelativesInputForm} onFormSubmit={this.handleSaveRelative} name={this.state.newRelativeName} relation={this.state.newRelativeRelation} dateOfBirth={this.state.newRelativeDateOfBirth} showDatePicker={this.state.showDatePicker} handleShowDatePicker={this.handleShowDatePicker} handleDateChange={this.handleDateChange} />
          )}

          {this.state.showEditRelativesForm && !this.state.showRelativesInputForm && (<FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditRelativesForm} />)}

          {!this.state.showEditRelativesForm && !this.state.showRelativesInputForm && (<FormButton title='Edit Relatives' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditRelativesForm} />)}
      
          {!this.state.showEditRelativesForm && (
            <FlatList data={this.state.savedRelatives} renderItem={({ item }) => (<RelativesDisplayForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} />)} keyExtractor={item => item.key} />)}

          {this.state.showEditRelativesForm && (
            <FlatList data={this.state.savedRelatives} renderItem={({ item }) => (<RelativesUpdateForm name={item.name} relation={item.relation} dateOfBirth={item.dateOfBirth} itemKey={item.key} handleChange={this.handleUpdateChange} onFormSubmit={this.handleUpdateRelative} onPressDelete={this.handleDeleteRelative} showDatePicker={item.showDatePicker} handleShowDatePicker={this.handleShowDatePickerByKey} handleDateChange={this.handleDateChangeByKey} />)} keyExtractor={item => item.key} />)}
        </View>
      </View>
    );
  }
}
