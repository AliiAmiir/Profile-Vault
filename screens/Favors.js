import React, { Component } from 'react';
import { View, FlatList, TextInput, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchFavors, saveFavor, updateFavorById, deleteFavorById } from '../repository/favorsRepository';

// Import StyleSheets
import { containerStyles, formInputTextStyles, formButtonStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';

export default class PersonalFavors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newFavorType: '',
      newFavorRecipients: '',
      errors: {},
      savedFavors: [],
      showFavorInputForm: false,
      showEditFavorForm: false,
    }
  }

  handleShowFavorInputForm = () => {
    this.setState({ showFavorInputForm: !this.state.showFavorInputForm });
  };

  handleShowEditFavorForm = () => {
    this.setState({ showEditFavorForm: !this.state.showEditFavorForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedFavors = this.state.savedFavors;
    let index = savedFavors.findIndex(x => x.key === key);
    let valueAtIndex = savedFavors[index];
    valueAtIndex[value.field] = value.value;

    savedFavors[index] = valueAtIndex;

    this.setState({ savedFavors: savedFavors });
  };

  handleSaveFavor = async () => {
    try {
      const favorDetails = {
        type: this.state.newFavorType,
        recipients: this.state.newFavorRecipients.split(','),
      };

      const response = await saveFavor(auth.currentUser.uid, favorDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Favor');
        this.setState({ newFavorType: '', newFavorRecipients: '', showFavorInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Favor');
      }

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleUpdateFavor = async (key) => {
    try {
      let savedFavors = this.state.savedFavors;
      let index = savedFavors.findIndex(x => x.key === key);
      let favor = savedFavors[index];

      const favorDetails = {
        type: favor.type,
        recipients: favor.recipients.split(','),
      };

      let response = await updateFavorById(key, auth.currentUser.uid, favorDetails);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Favor');
      } else {
        Alert.alert(response.message || 'Failed to update Favor');
      }

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleDeleteItem = async (key) => {
    try {
      const response = await deleteFavorById(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Favor');
      } else {
        Alert.alert(response.message || 'Failed to Delete Favor');
      }

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  componentDidMount() {
    this.fetchUserFavors();
  }

  componentWillUnmount() {

  }

  async fetchUserFavors() {
    try {
      const response = await fetchFavors(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedFavors: response.data });
      } else {
        Alert.alert(response.message || 'Failed to Fetch Favors');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, { justifyContent: 'flex-start' }, containerStyles.formContainer]}>
        {!this.state.showFavorInputForm && !this.state.showEditFavorForm && (
          <FormButton title='Add a Favor' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowFavorInputForm} />
        )}

        {this.state.showFavorInputForm && (
          <View>
            <FormInputText placeholder="Favor Type" value={this.state.newFavorType} onChangeText={(value) => this.handleChange('newFavorType', value)} autoCapitalize="sentences" errorText={this.state.errors.newFavorName || null} />
            <FormInputText placeholder="Favor Recipients (Comma separated)" value={this.state.newFavorRecipients} onChangeText={(value) => this.handleChange('newFavorRecipients', value)} autoCapitalize="sentences" errorText={this.state.errors.newFavorName || null} />
            <FormButton title='Save Favor' onPress={this.handleSaveFavor} />
            <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowFavorInputForm} />
          </View>
        )}

        {this.state.showEditFavorForm && !this.state.showFavorInputForm && (<FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditFavorForm} />)}

        {!this.state.showEditFavorForm && !this.state.showFavorInputForm && (<FormButton title='Edit Favor' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditFavorForm} />)}

        {!this.state.showEditFavorForm && !this.state.showFavorInputForm && (
          <FlatList data={this.state.savedFavors} renderItem={({ item }) => (
            <View style={containerStyles.textInputContainer}>
              {item.recipients && item.recipients.length > 0 && (
                <TextInput editable={false} value={`${item.type} for ${item.recipients}`} style={formInputTextStyles.input} />
              )}

              {!item.recipients && (
                <TextInput editable={false} value={`${item.type} - No recipients added`} style={formInputTextStyles.input} />
              )}
            </View>
          )}
            keyExtractor={item => item.key}
          />
        )}

        {this.state.showEditFavorForm && !this.state.showFavorInputForm && (
          <FlatList data={this.state.savedFavors} renderItem={({ item }) => (
            <View>
              <View style={containerStyles.updateRowContainer}>
                <View style={[containerStyles.textInputContainer, { flex: 4 }]}>
                <TextInput value={item.type} onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'type', value: value })} autoCapitalize={'sentences'} style={formInputTextStyles.input} />
                  <TextInput value={item.recipients} onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'recipients', value: value })} autoCapitalize={'sentences'} style={formInputTextStyles.input} />
                </View>
              </View>
              <View style={containerStyles.rowContainer}>
                <View style={containerStyles.rowButtonsContainer}>
                  <FormButton title='Delete' color={'#CD5151'} textColor={'#FFFFFF'} onPress={() => this.handleDeleteItem(item.key)} />
                </View>
                <View style={containerStyles.rowButtonsContainer}>
                  <FormButton title='Update' onPress={() => this.handleUpdateFavor(item.key)} />
                </View>
              </View>
            </View>
          )}
            keyExtractor={item => item.key}
          />
        )}
      </View>
    );
  }
}
