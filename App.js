import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigatorStack } from './routes/NavigationStack';
import { ActivityIndicator } from 'react-native';

const getIsSignedIn = () => {

  return false;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
      user: null
    }
  }

  componentDidMount() {
    const isSignedIn = getIsSignedIn();

    this.setState({
      loading: false,
      isSignedIn: isSignedIn
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <NavigationContainer>
        {
          this.state.loading ? (<ActivityIndicator size="large" />) : (
            <NavigatorStack isSignedIn={this.state.isSignedIn} />
          )}
      </NavigationContainer>
    );
  }

}
