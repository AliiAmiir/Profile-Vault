import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveSignificant, fetchUserSignificants, updateSignificant, deleteSignificant } from '../repository/significantsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class Significants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newSignificantName: '',
      newSignificantRelation: '',
      newSignificantDateOfBirth: '',
      newSignificantAnniversary: '',
      errors: {},
      savedSignificants: [],
      displayUpdateButton: true,
    }
  }

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
        this.setState({ newSignificantName: '', newSignificantRelation: '', newSignificantDateOfBirth: '', newSignificantAnniversary: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Significant');
        this.setState({ newSignificantName: '', newSignificantRelation: '', newSignificantDateOfBirth: '', newSignificantAnniversary: '' })
      }

      await this.fetchUserSignificants();
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdateSignificants = async (key) => {
    try {
      let savedSignificants = this.state.savedSignificants;
      let index = savedSignificants.findIndex(x => x.key === key);
      let significants = savedSignificants[index];

      const response = await updateSignificant(auth.currentUser.uid, key, significants.significantName, significants.significantRelation, significants.significantDateOfBirth, significants.significantAnniversary);

      if (response && response.success) {
        Alert.alert(response.message || 'Updated Significant');
      } else {
        Alert.alert(response.message || 'Failed to update Significant');
      }

      await this.fetchUserSignificants();
    } catch (error) {
      console.log(error);
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
    }
  };

  componentDidMount() {
    this.fetchUserSignificants();
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Name"
            value={this.state.newSignificantName}
            onChangeText={(value) => this.handleChange('newSignificantName', value)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Relation"
            value={this.state.newSignificantRelation}
            onChangeText={(text) => this.handleChange('newSignificantRelation', text)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Date of Birth"
            value={this.state.newSignificantDateOfBirth}
            onChangeText={(text) => this.handleChange('newSignificantDateOfBirth', text)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Anniversary"
            value={this.state.newSignificantAnniversary}
            onChangeText={(text) => this.handleChange('newSignificantAnniversary', text)}
          />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton
            title="Save Significant"
            onPress={() => this.handleSaveSignificants()}
          />
        </View>
        <View style={containerStyles.flatListContainer}>
          <FlatList

            data={this.state.savedSignificants}
            renderItem={({ item }) => (
              <View style={containerStyles.textInputContainer}>
                <View style={styles.relativeContainer}>
                  <View style={styles.inputsWrapper}>
                    <FormUpdateInputText
                      label="Name"
                      value={item.significantName}
                      onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'name', text })}
                    />
                    <FormUpdateInputText
                      label="Relation"
                      value={item.significantRelation}
                      onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'relation', text})}
                    />
                    <FormUpdateInputText
                      label="Date of Birth"
                      value={item.significantDateOfBirth}
                      onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'dateOfBirth', text })}
                    />
                    <FormUpdateInputText
                      label="Anniversary"
                      value={item.significantAnniversary}
                      onChangeText={(text) => this.handleUpdateChange(item.key, { field: 'anniversary', text })}
                    />
                  </View>
                  <View style={styles.buttonsWrapper}>
                    <FormButton
                      title="Update"
                      onPress={() => this.handleUpdateSignificants(item.key)}
                    />
                    <FormButton
                      title="Delete"
                      onPress={() => this.handleDeleteSignificants(item.key)}
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