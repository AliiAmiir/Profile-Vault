import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchUserGoals, saveGoal, updateGoalById, deleteGoalById } from '../repository/goalsRepository';

// Import StyleSheets
import { containerStyles, formButtonStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';
import FormText from '../components/FormText';

export default class PersonalGoals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newGoalName: '',
      errors: {},
      savedGoals: [],
      showGoalInputForm: false,
      showEditGoalsForm: false,
    }
  }

  handleShowGoalInputForm = () => {
    this.setState({ showGoalInputForm: !this.state.showGoalInputForm });
  };

  handleShowEditGoalForm = () => {
    this.setState({ showEditGoalsForm: !this.state.showEditGoalsForm });
  };

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedGoals = this.state.savedGoals;
    let index = savedGoals.findIndex(x => x.key === key);
    savedGoals[index].name = value;

    // Add validation

    this.setState({ savedGoals: savedGoals });
  };

  handleSaveGoal = async () => {
    try {
      const response = await saveGoal(auth.currentUser.uid, this.state.newGoalName);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Goal');
        this.setState({ newGoalName: '', showGoalInputForm: false })
      } else {
        Alert.alert(response.message || 'Failed to save Goal');
        this.setState({ newGoalName: '' })
      }

      await this.fetchUserGoals();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleUpdateItem = async (item, increaseCounter) => {
    try {
      let goal = item;
      if (increaseCounter) {
        let counter = goal.counter;
        counter = counter + 1;

        goal.counter = counter;
      }

      let response = await updateGoalById(goal, increaseCounter);
      let message = 'Updated Goal';

      if (response && response.success) {
        if (increaseCounter) {
          message = 'Updated Streak';
        } else {
          message = response.message || 'Updated Goal';
        }

        this.setState({ newGoalName: '' })
      } else {
        message = response.message || 'Failed to update Goal';
        this.setState({ newGoalName: '' })
      }

      Alert.alert(message);

      await this.fetchUserGoals();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleDeleteItem = async (key) => {
    try {
      await deleteGoalById(key);
      Alert.alert('Deleted Goal');

      await this.fetchUserGoals();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  componentDidMount() {
    this.fetchUserGoals();
  }

  componentWillUnmount() {
    if (this.fetchUserGoals) {
      this.fetchUserGoals();
    }
  }

  async fetchUserGoals() {
    try {
      const response = await fetchUserGoals(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ savedGoals: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Goals');
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
        {this.state.showGoalInputForm && (
          <View style={[containerStyles.textInputContainer, { flex: 0.5 }]}>
            <FormInputText placeholder="New Goal" value={this.state.newGoalName} onChangeText={(value) => this.handleChange('newGoalName', value)} autoCapitalize="sentences" errorText={this.state.errors.newGoalName || null} />
            <FormButton title='Add a Goal' onPress={this.handleSaveGoal} />
          </View>)}

        {!this.state.showGoalInputForm && !this.state.showEditGoalsForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Add a Goal' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowGoalInputForm} />
          </View>)}

        {this.state.showEditGoalsForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Cancel' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditGoalForm} />
          </View>)}

        {!this.state.showEditGoalsForm && (
          <View style={containerStyles.textInputContainer}>
            <FormButton title='Edit Goals' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditGoalForm} />
          </View>)}

        {this.state.showEditGoalsForm && (
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedGoals} renderItem={({ item }) => (
              <FormUpdateInputText value={item.name} autoCapitalize="sentences" onChangeText={(value) => this.handleUpdateChange(item.key, value)} onUpdatePress={() => this.handleUpdateItem(item, false)} onPressDelete={() => this.handleDeleteItem(item.key)} />
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>)}

        {!this.state.showEditGoalsForm && (
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedGoals} renderItem={({ item }) => (

              <View style={containerStyles.rowContainerSpaceBetween}>
                <View style={containerStyles.rowCounterButtonContainer}>
                <FormText value={`${item.name}, ${item.counter} day(s) streak`} />
                </View>

                <View style={containerStyles.rowCounterButtonContainer}>
                  <TouchableOpacity style={[formButtonStyles.formButton, formButtonStyles.counterButton]} onPress={() => this.handleUpdateItem(item, true)}>
                    <Text style={[formButtonStyles.formButtonText]}>
                      <Icon name="plus" size={20} color="white" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>)}
      </View>
    );
  }
}
