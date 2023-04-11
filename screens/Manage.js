import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { manageScreenButtons } from '../utils/buttonComponentsUtil';
import FormButton from '../components/FormButton';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

export default class Manage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  handleNavigation = (componentName) => {
    const { navigation } = this.props;
    navigation.navigate(componentName);
  };

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <FlatList data={manageScreenButtons} keyExtractor={(item) => item.componentName} renderItem={({item}) => (
          <FormButton title={item.name} onPress={() => this.handleNavigation(item.componentName)} />
        )} style={containerStyles.buttonContainer}>
        </FlatList>
      </View>
    );
  }
}
