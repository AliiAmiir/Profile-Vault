import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

// Import Utils
import { manageScreenButtons } from '../utils/buttonComponentsUtil';

// Import StyleSheets
import { containerStyles } from '../styles/globalStyle';

// Import Components
import CustomManageButton from '../components/CustomManageButton';

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
        <FlatList data={manageScreenButtons} keyExtractor={(item) => item.componentName} renderItem={({ item }) => (
          <View>
            <CustomManageButton title={item.name} iconName={item.icon} onPress={() => this.handleNavigation(item.componentName)} />
          </View>
        )} style={containerStyles.buttonContainer}>
        </FlatList>
      </View>
    );
  }
}
