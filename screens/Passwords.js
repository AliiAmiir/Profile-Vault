import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { savePassword, fetchUserPasswords, updatePassword, deletePassword} from '../repository/passwordsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

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
    }
  }

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedPasswords = this.state.savedPasswords;
    let index = savedPasswords.findIndex(x => x.key === key);
    savedPasswords[index].name = value;

    // Add validation

    this.setState({ savedPasswords: savedPasswords });
  };

  handleSavePassword = async () => {
    try {
      const response = await savePassword(auth.currentUser.uid, this.state.newWebsite, this.state.newEmail, this.state.newPassword);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Password');
        this.setState({ newWebsite: '', newEmail: '', newPassword: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Password');
        this.setState({ newWebsite: '', newEmail: '', newPassword: '' })
      }

      await this.fetchUserPasswords();
    } catch (error) {
      console.log(error.message);
    }
  };

  handleUpdatePassword = async (key) => {
    try {
      let savedPasswords = this.state.savedPasswords;
      let index = savedPasswords.findIndex(x => x.key === key);
      let password = savedPasswords[index];

      const response = await updatePassword(auth.currentUser.uid, password.key, password.website, password.email, password.password);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Password');
      } else {
        Alert.alert(response.message || 'Failed to update Password');
      }

      await this.fetchUserPasswords();
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
    }
  };

  componentDidMount() {
    this.fetchUserPasswords();
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Website"
            value={this.state.newWebsite}
            onChangeText={(text) => this.handleChange('newWebsite', text)}
          />
          </View>
          <View style={containerStyles.textInputContainer}>
          <FormInputText
            label='Email'
            value={this.state.newEmail}
            onChangeText={(text) => this.handleChange('newEmail', text)}
          />
          </View>
          <View style={containerStyles.textInputContainer}>
          <FormInputText
            label='Password'
            value={this.state.newPassword}
            onChangeText={(text) => this.handleChange('newPassword', text)}
          />
          </View>
          <View style={containerStyles.buttonContainer}>
          <FormButton
            title="Save Password"
            onPress={() => this.handleSavePassword()}
          />
        </View>
        <View style={containerStyles.flatListContainer}>
          <FlatList
            data={this.state.savedPasswords}
            renderItem={({ item }) => ( 
              <View style={containerStyles.textInputContainer}>
              <View style={styles.passwordContainer}>
                <FormUpdateInputText
                  label="Website"
                  value={item.website}
                  onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'website', value: text})}
                />
                <FormUpdateInputText
                  label='Email'
                  value={item.email}
                  onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'email', value: value})}
                />
                <FormUpdateInputText
                  label='Password'
                  value={item.password}
                  onChangeText={(value) => this.handleUpdateChange(item.key, { field: 'password', value: value})}
                />
                <View style={styles.buttonContainer}>
                  <FormButton title='Update' color={'#F2F2F7'} textColor={'#000000'} onPress={() => this.handleUpdatePassword(item.key)} />
                  <FormButton title='Delete' color={'#F2F2F7'} textColor={'#000000'} onPress={() => this.handleDeletePassword(item.key)} />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 5,
  },
});
