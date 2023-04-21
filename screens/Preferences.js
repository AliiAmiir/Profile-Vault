import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchPreferencesByUserId, savePreference, updatePreferenceById, deletePreferenceById } from '../repository/preferencesRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';
import FormText from '../components/FormText';

export default class PersonalPreferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newPreferenceName: '',
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
    savedPreferences[index].name = value;

    // Add validation

    this.setState({ savedPreferences: savedPreferences });
  };

  handleSavePreference = async () => {
    try {
      const response = await savePreference(auth.currentUser.uid, this.state.newPreferenceName);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Preference');
        this.setState({ newPreferenceName: '', showPreferenceInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Preference');
        this.setState({ newPreferenceName: '' })
      }

      await this.fetchUserPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleUpdateItem = async (item) => {
    try {
      let preference = item;

      let response = await updatePreferenceById(preference);
      let message = 'Updated Preference';

      if (response && response.success) {
        message = response.message || 'Updated Preference';

        this.setState({ newPreferenceName: '' })
      } else {
        message = response.message || 'Failed to update Preference';
        this.setState({ newPreferenceName: '' })
      }

      Alert.alert(message);

      await this.fetchUserPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleDeleteItem = async (item) => {
    try {
      await deletePreferenceById(item);
      Alert.alert('Deleted Preference');

      await this.fetchUserPreferences();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  componentDidMount() {
    this.fetchUserPreferences();
  }

  componentWillUnmount() {
    if (this.fetchUserPreferences) {
      this.fetchUserPreferences();
    }
  }

  async fetchUserPreferences() {
    try {
      const preferencesData = await fetchPreferencesByUserId(auth.currentUser.uid);

      if (preferencesData && preferencesData.length > 0) {
        this.setState({
          loading: false,
          savedPreferences: preferencesData.map((preference) => {
            let savedPreference = preference.data();
            savedPreference.key = preference.id;

            return savedPreference;
          })
        });
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleNavigation = (componentName) => {
    const { navigation } = this.props;
    navigation.navigate(componentName);
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        {this.state.showPreferenceInputForm && (
          <View style={[containerStyles.textInputContainer, { flex: 0.5 }]}>
            <FormInputText placeholder="New Preference" value={this.state.newPreferenceName} onChangeText={(value) => this.handleChange('newPreferenceName', value)} autoCapitalize="sentences" errorText={this.state.errors.newPreferenceName || null} />
            <FormButton title='Save Preference' onPress={this.handleSavePreference} />
          </View>)}

        {!this.state.showPreferenceInputForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Add a Preference' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowPreferenceInputForm} />
          </View>)}

        {this.state.showEditPreferencesForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Done' onPress={this.handleShowEditPreferenceForm} />
          </View>)}

        {!this.state.showEditPreferencesForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Edit Preferences' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditPreferenceForm} />
          </View>)}

        {this.state.showEditPreferencesForm && (
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedPreferences} renderItem={({ item }) => (
              <FormUpdateInputText value={item.name} autoCapitalize="sentences" onButtonUpdate={() => this.handleUpdateItem(item, true)} onChangeText={(value) => this.handleUpdateChange(item.key, value)} onBlurUpdate={() => this.handleUpdateItem(item, false)} onPressDelete={() => this.handleDeleteItem(item)} displayUpdateButton={false} />
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>)}

        {!this.state.showEditPreferencesForm && (
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedPreferences} renderItem={({ item }) => (
              <FormText value={item.name} />
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>)}
      </View>
    );
  }
}
