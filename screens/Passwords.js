import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { savePassword, fetchUserPasswords, updatePassword, deletePassword } from '../repository/passwordsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import { PasswordForm, PasswordDisplayForm, PasswordUpdateForm } from '../components/PasswordForm';

export default class Passwords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newWebsite: '',
      newEmail: '',
      newPassword: '',
      errors: {},
      savedPasswords: [],
      displayUpdateButton: true,
      showPasswordInputForm: false,
      showEditPasswordForm: false,
    }
  }

  handleShowPasswordInputForm = () => {
    this.setState({ showPasswordInputForm: !this.state.showPasswordInputForm });
  };

  handleShowEditPasswordForm = () => {
    this.setState({ showEditPasswordForm: !this.state.showEditPasswordForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedPasswords = this.state.savedPasswords;
    let index = savedPasswords.findIndex(x => x.key === key);
    let valueAtIndex = savedPasswords[index];
    valueAtIndex[value.field] = value.value;

    savedPasswords[index] = valueAtIndex;

    // Add validation
    this.setState({ savedPasswords: savedPasswords });
  };

  handleSavePassword = async () => {
    try {
      const response = await savePassword(auth.currentUser.uid, this.state.newWebsite, this.state.newEmail, this.state.newPassword);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Password');
        this.setState({ newWebsite: '', newEmail: '', newPassword: '', showPasswordInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Password');
        this.setState({ newWebsite: '', newEmail: '', newPassword: '' })
      }

      await this.fetchUserPasswords();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleUpdatePassword = async (key) => {
    try {
      let savedPasswords = this.state.savedPasswords;
      let index = savedPasswords.findIndex(x => x.key === key);
      let password = savedPasswords[index];

      const response = await updatePassword(password.key, password.website, password.email, password.password);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Password');
      } else {
        Alert.alert(response.message || 'Failed to update Password');
      }

      await this.fetchUserPasswords();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  handleDeletePassword = async (key) => {
    try {
      const response = await deletePassword(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Password');
      } else {
        Alert.alert(response.message || 'Failed to delete Password');
      }

      await this.fetchUserPasswords();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  fetchUserPasswords = async () => {
    try {
      const response = await fetchUserPasswords(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedPasswords: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Passwords');
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  };

  componentDidMount() {
    this.fetchUserPasswords();
  }

  render() {
    return (
      <View style={[containerStyles.defaultContainer, {justifyContent: 'flex-start'}]}>
        <View style={containerStyles.formContainer}>
          {!this.state.showPasswordInputForm && (
            <FormButton title='Add a Password' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowPasswordInputForm} />
          )}

          {this.state.showPasswordInputForm && (
            <PasswordForm handleChange={this.handleChange} onFormClose={this.handleShowPasswordInputForm} onFormSubmit={this.handleSavePassword} website={this.state.newWebsite} email={this.state.newEmail} password={this.state.newPassword} />
          )}

          {this.state.showEditPasswordForm && (<FormButton title='Done' onPress={this.handleShowEditPasswordForm} />)}

          {!this.state.showEditPasswordForm && (<FormButton title='Edit Passwords' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditPasswordForm} />)}
      
          {!this.state.showEditPasswordForm && (
            <FlatList data={this.state.savedPasswords} renderItem={({ item }) => (<PasswordDisplayForm website={item.website} email={item.email} password={item.password} />)} keyExtractor={item => item.key} />)}

          {this.state.showEditPasswordForm && (
            <FlatList data={this.state.savedPasswords} renderItem={({ item }) => (<PasswordUpdateForm website={item.website} email={item.email} password={item.password} itemKey={item.key} handleChange={this.handleUpdateChange} onFormSubmit={this.handleUpdatePassword} onPressDelete={this.handleDeletePassword} />)} keyExtractor={item => item.key} />)}
        </View>
      </View>
    );
  }
}
