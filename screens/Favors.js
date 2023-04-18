import React, { Component } from 'react';
import { View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import Repositories
import { fetchFavorByUserId, saveFavor, updateFavorById, deleteFavorById } from '../repository/favorsRepository';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import FormButton from '../components/FormButton';
import FormInputText from '../components/FormInputText';
import FormUpdateInputText from '../components/FormUpdateInputText';

export default class PersonalFavors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      newFavorName: '',
      errors: {},
      savedFavors: [],
      displayUpdateButton: true,
    }
  }

  handleChange = (key, value) => {
    // Add validation
    this.setState({ [key]: value });
  };

  handleUpdateChange = (key, value) => {
    let savedFavors = this.state.savedFavors;
    let index = savedFavors.findIndex(x => x.key === key);
    savedFavors[index].name = value;

    // Add validation

    this.setState({ savedFavors: savedFavors });
  };

  handleSaveFavor = async () => {
    try {
      const response = await saveFavor(auth.currentUser.uid, this.state.newFavorName);

      if (response && response.success) {
        Alert.alert(response.message || 'Saved Favor');
        this.setState({ newFavorName: '' })
      } else {
        Alert.alert(response.message || 'Failed to save Favor');
        this.setState({ newFavorName: '' })
      }

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  handleUpdateItem = async (item, increaseCounter) => {
    try {
      let favor = item;
      if (increaseCounter) {
        let counter = favor.counter;
        counter = counter + 1;

        favor.counter = counter;
      }

      let response = await updateFavorById(favor, increaseCounter);
      let message = 'Updated favor';

      if (response && response.success) {
        if (increaseCounter) {
          message = 'Updated Streak';
        } else {
          message = response.message || 'Updated Favor';
        }

        this.setState({ newFavorName: '' })
      } else {
        message = response.message || 'Failed to update Favor';
        this.setState({ newFavorName: '' })
      }

      Alert.alert(message);

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error occurred while adding a new Favor');
    }
  }

  handleDeleteItem = async (item) => {
    try {
      await deleteFavorById(item);

      Alert.alert('Deleted Favor');

      await this.fetchUserFavors();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Error occurred while adding a new Favor');
    }
  }

  componentDidMount() {
    this.fetchUserFavors();
  }

  componentWillUnmount() {
    if (this.fetchUserFavors) {
      this.fetchUserFavors();
    }
  }

  async fetchUserFavors() {
    const FavorsData = await fetchFavorByUserId(auth.currentUser.uid);

    if (FavorsData && FavorsData.length > 0) {
      this.setState({
        loading: false,
        savedFavors: FavorsData.map((favor) => {
          let savedFavor = favor.data();
          savedFavor.key = favor.id;

          return savedFavor;
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
            <FormInputText placeholder="New Favor" value={this.state.newFavorName} onChangeText={(value) => this.handleChange('newFavorName', value)} autoCapitalize="sentences" errorText={this.state.errors.newFavorName || null} />
            <FormButton title='Add a Favors' color={'#F2F2F7'} textColor={'#000000'} onPress={this.handleSaveFavor} />
          </View>
          <View style={[containerStyles.textInputContainer, { flex: 1 }]}>
            <FlatList data={this.state.savedFavors} renderItem={({ item }) => (
              <FormUpdateInputText value={item.name} autoCapitalize="sentences" onButtonUpdate={() => this.handleUpdateItem(item, true)} onChangeText={(value) => this.handleUpdateChange(item.key, value)} onBlurUpdate={() => this.handleUpdateItem(item, false)} onPressDelete={() => this.handleDeleteItem(item)} displayUpdateButton={this.state.displayUpdateButton} />
            )} style={containerStyles.buttonContainer}>
            </FlatList>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
