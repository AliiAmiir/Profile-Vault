import React, { Component } from 'react';
import { View, FlatList, Alert, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { saveRelative, fetchUserRelatives, updateRelative, deleteRelative } from '../repository/relativesRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class Relatives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newRelativeName: '',
      newRelativeRelation: '',
      newRelativeDateOfBirth: '',
      errors: {},
      savedRelatives: [],
      displayUpdateButton: true,
    }
  }

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedRelatives = this.state.savedRelatives;
    let index = savedRelatives.findIndex(x => x.key === key);
    savedRelatives[index].name = value;

    // Add validation
    
    this.setState({ savedRelatives: savedRelatives });
  };

  handleSaveRelative = async () => {
    try {
      const response = await saveRelative(auth.currentUser.uid, this.state.newRelativeName, this.state.newRelativeRelation, this.state.newRelativeDateOfBirth);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      }

      await fetchUserRelatives();
    } catch (error) {
      console.log(error);
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
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      } else {
        Alert.alert(response.message || 'Failed to update Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      }

      await this.fetchUserRelatives();
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteRelative = async (key) => {
    try {
      const response = await deleteRelative(key);

      if (response && response.success) {
        Alert.alert(response.message || 'Deleted Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      } else {
        Alert.alert(response.message || 'Failed to delete Relative');
        this.setState({ newRelativeName: '', newRelativeRelation: '', newRelativeDateOfBirth: '' })
      }

      await this.fetchUserRelatives();
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchUserRelatives();
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
       <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Name"
            value={this.state.newRelativeName}
            onChangeText={(text) => this.handleChange('newRelativeName', text)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText
            label="Relation"
            value={this.state.newRelativeRelation}
            onChangeText={(text) => this.handleChange('newRelativeRelation', text)}
          />
        </View>
        <View style={containerStyles.textInputContainer}>
          <FormInputText

            label="Date of Birth"
            value={this.state.newRelativeDateOfBirth}
            onChangeText={(text) => this.handleChange('newRelativeDateOfBirth', text)}
          />
        </View>
        <View style={containerStyles.buttonContainer}>
          <FormButton

            title="Save Relative"
            onPress={() => this.handleSaveRelative()}
          />
        </View>
        <View style={containerStyles.flatListContainer}>
          <FlatList
            data={this.state.savedRelatives}
            renderItem={({ item }) => (
              <View style={containerStyles.textInputContainer}>
                <View style={styles.relativeContainer}>
                  <View style={styles.inputsWrapper}>
                    <FormUpdateInputText
                      label="Name"
                      value={item.name}
                      onChangeText={(text) => this.handleUpdateChange(item.key, text)}
                    />
                    <FormUpdateInputText
                      label="Relation"
                      value={item.relation}
                      onChangeText={(text) => this.handleUpdateChange(item.key, text)}
                    />
                    <FormUpdateInputText
                      label="Date of Birth"
                      value={item.dateOfBirth}
                      onChangeText={(text) => this.handleUpdateChange(item.key, text)}
                    />
                  </View>
                  <View style={styles.buttonsWrapper}>
                  <FormButton title="Delete"
                    onPress={() => this.handleDeleteRelative(item.key)}
                    containerStyle={[styles.leftButton]}
                  />
                  <FormButton title="Update"
                    onPress={() => this.handleUpdateRelative(item.key)}
                    containerStyle={[styles.rightButton]}
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
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  inputsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  leftButton: {
    marginRight: 5,
  },
  rightButton: {
    marginLeft: 5,
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