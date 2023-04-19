import React, { Component } from 'react';
import { View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchGoalsByUserId, saveGoal, updateGoalById, deleteGoalById } from '../repository/goalsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

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
      displayUpdateButton: true,
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

  handleDeleteItem = async (item) => {
    try {
      await deleteGoalById(item);

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
    const goalsData = await fetchGoalsByUserId(auth.currentUser.uid);

    if (goalsData && goalsData.length > 0) {
      this.setState({
        loading: false,
        savedGoals: goalsData.map((goal) => {
          let savedGoal = goal.data();
          savedGoal.key = goal.id;

          return savedGoal;
        })
      });
    }
  }

  handleNavigation = (componentName) => {
    const { navigation } = this.props;
    navigation.navigate(componentName);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={containerStyles.defaultContainer}>
          {this.state.showGoalInputForm && (
            <View style={[containerStyles.textInputContainer, { flex: 0.5 }]}>
              <FormInputText placeholder="New Goal" value={this.state.newGoalName} onChangeText={(value) => this.handleChange('newGoalName', value)} autoCapitalize="sentences" errorText={this.state.errors.newGoalName || null} />
              <FormButton title='Add a Goal' onPress={this.handleSaveGoal} />
            </View>)}

          {!this.state.showGoalInputForm && (
            <View style={containerStyles.textInputContainer}>
              <FormButton title='Add a Goal' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowGoalInputForm} />
            </View>)}

          {this.state.showEditGoalsForm && (
            <View style={containerStyles.textInputContainer}>
              <FormButton title='Done' onPress={this.handleShowEditGoalForm} />
            </View>)}

          {!this.state.showEditGoalsForm && (
            <View style={containerStyles.textInputContainer}>
              <FormButton title='Edit Goals' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleShowEditGoalForm} />
            </View>)}

          {this.state.showEditGoalsForm && (
            <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
              <FlatList data={this.state.savedGoals} renderItem={({ item }) => (
                <FormUpdateInputText value={item.name} autoCapitalize="sentences" onButtonUpdate={() => this.handleUpdateItem(item, true)} onChangeText={(value) => this.handleUpdateChange(item.key, value)} onBlurUpdate={() => this.handleUpdateItem(item, false)} onPressDelete={() => this.handleDeleteItem(item)} displayUpdateButton={this.state.displayUpdateButton} />
              )} style={containerStyles.buttonContainer}>
              </FlatList>
            </View>)}

          {!this.state.showEditGoalsForm && (
            <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
              <FlatList data={this.state.savedGoals} renderItem={({ item }) => (
                <FormText value={item.name} />
              )} style={containerStyles.buttonContainer}>
              </FlatList>
            </View>)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}