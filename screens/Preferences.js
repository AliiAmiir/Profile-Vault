import React, { Component } from 'react';
import { View, FlatList, TextInput, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchUserPreferences, savePreference, updatePreferenceById, deletePreferenceById } from '../repository/preferencesRepository';

// Import StyleSheets
import { containerStyles, formInputTextStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormText from '../components/FormText';

export default class PersonalPreferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newPreferenceNames: '',
      newPreferenceType: '',
      errors: {},
      savedPreferences: [],
      showPreferenceInputForm: false,
      showEditPreferencesForm: false,
    }
  }

  handleShowPreferenceInputForm = () => {
    this.setState({ showPreferenceInputForm: !this.state.showPreferenceInputForm });
  };

  handleShowEditPreferenceForm = () => {
    this.setState({ showEditPreferencesForm: !this.state.showEditPreferencesForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedPreferences = this.state.savedPreferences;
    let index = savedPreferences.findIndex(x => x.key === key);
    let valueAtIndex = savedPreferences[index];
    valueAtIndex[value.field] = value.value;

    savedPreferences[index] = valueAtIndex;

    this.setState({ savedPreferences: savedPreferences });
  };

  handleSavePreference = async () => {
    try {
      const newPreference = {
        type: this.state.newPreferenceType,
        names: this.state.newPreferenceNames.split(','),
      };

      const response = await savePreference(auth.currentUser.uid, newPreference);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Preference');
        this.setState({ newPreferenceNames: '', newPreferenceType: '', showPreferenceInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Preference');
      }

      await this.fetchPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleUpdateItem = async (item) => {
    try {
      let preference = {
        type: item.type,
        uid: item.uid,
      };

      if(item.names) {
        preference.names = item.names.split(',');
      }

      let response = await updatePreferenceById(item.key, preference);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Preference');
      } else {
        Alert.alert(response.message || 'Failed to update Preference');
      }

      await this.fetchPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleDeleteItem = async (item) => {
    try {
      await deletePreferenceById(item.key);
      Alert.alert('Deleted Preference');

      await this.fetchPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  componentDidMount() {
    this.fetchPreferences();
  }

  componentWillUnmount() {

  }

  async fetchPreferences() {
    try {
      const response = await fetchUserPreferences(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedPreferences: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Preferences');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }, containerStyles.formContainer]}>
        {this.state.showPreferenceInputForm && !this.state.showEditPreferencesForm && (
          <View>
            <FormInputText placeholder="Preference Type" value={this.state.newPreferenceType} onChangeText={(value) => this.handleChange('newPreferenceType', value)} autoCapitalize="sentences" />
            <FormInputText placeholder="Preference Names (Comma separated)" value={this.state.newPreferenceNames} onChangeText={(value) => this.handleChange('newPreferenceNames', value)} autoCapitalize="sentences" />
            <FormButton title='Save Preference' onPress={this.handleSavePreference} />
            <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowPreferenceInputForm} />
          </View>
        )}

        {!this.state.showPreferenceInputForm && !this.state.showEditPreferencesForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Add Preference' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowPreferenceInputForm} />
          </View>)}

        {this.state.showEditPreferencesForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditPreferenceForm} />
          </View>)}

        {!this.state.showEditPreferencesForm && !this.state.showPreferenceInputForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Edit Preferences' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditPreferenceForm} />
          </View>)}

        {this.state.showEditPreferencesForm && (
          <FlatList data={this.state.savedPreferences} renderItem={({ item }) => (
            <View>
              <View style={containerStyles.updateRowContainer}>
                <View style={[containerStyles.textInputContainer, { flex: 4 }]}>
                  <TextInput value={item.type} onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'type', value: value })} autoCapitalize={'sentences'} style={formInputTextStyles.input} />
                  <TextInput value={item.names} onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'names', value: value })} autoCapitalize={'sentences'} style={formInputTextStyles.input} />
                </View>
              </View>
              <View style={containerStyles.rowContainer}>
                <View style={containerStyles.rowButtonsContainer}>
                  <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => this.handleDeleteItem(item)} />
                </View>
                <View style={containerStyles.rowButtonsContainer}>
                  <FormButton title='Update' onPress={() => this.handleUpdateItem(item, true)} />
                </View>
              </View>
            </View>
          )} style={containerStyles.buttonContainer}>
          </FlatList>
        )}

        {!this.state.showEditPreferencesForm && !this.state.showPreferenceInputForm && (
          <FlatList data={this.state.savedPreferences} renderItem={({ item }) => (
            <View style={containerStyles.textInputContainer}>
              {item.names && item.names.length > 0 && (
                <TextInput editable={false} value={`${item.type} for ${item.names}`} style={formInputTextStyles.input} />
              )}

              {!item.names && (
                <TextInput editable={false} value={`${item.type} - No values added`} style={formInputTextStyles.input} />
              )}
            </View>
          )} style={containerStyles.buttonContainer}>
          </FlatList>
        )}
      </View>
    );
  }
}
