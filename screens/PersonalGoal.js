import React, { Component } from 'react';
import { View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Import Configs
import { auth } from '../config/FirebaseConfig';

// Import Repositories
import { fetchGoalsByUserId, saveGoal, updateGoalById } from '../repository/goalsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class PersonalGoals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newGoalName: '',
      errors: {},
      savedGoals: [],
    }
  }

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
      await saveGoal(auth.currentUser.uid, this.state.newGoalName);

      Alert.alert('Added Goal');
      this.setState({ newGoalName: '' })
      await this.fetchUserGoals();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error occurred while adding a new goal');
    }
  }

  handleUpdateItem = async (item) => {
    try {
      await updateGoalById(item);

      Alert.alert('Updated Goal');

      await this.fetchUserGoals();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error occurred while adding a new goal');
    }
  }

  // handleDeleteItem

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
          <View style={[containerStyles.textInputContainer, { flex: 0.5 }]}>
            <FormInputText placeholder="New Goal" value={this.state.newGoalName} onChangeText={(value) => this.handleChange('newGoalName', value)} autoCapitalize="sentences" errorText={this.state.errors.newGoalName || null} />
            <FormButton title='Add a Goal' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleSaveGoal} />
          </View>
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedGoals} renderItem={({ item }) => (
              <FormUpdateInputText value={item.name} autoCapitalize="sentences" onChangeText={(value) => this.handleUpdateChange(item.key, value)} onBlurUpdate={() => this.handleUpdateItem(item)} />
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
