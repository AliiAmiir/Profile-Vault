import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigatorStack } from './routes/NavigationStack';
import { ActivityIndicator } from 'react-native';
import { auth } from './config/FirebaseConfig';

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
    this.setAuth = auth.onAuthStateChanged((user) => {
      console.log(user);
      if(!user) {
        this.setState({
          loading: false,
          isSignedIn: false
        });
      } else {
        this.setState({
          user, 
          isSignedIn: true
        })
      }
    });
  }

  componentWillUnmount() {
    if(this.setAuth) {
      this.setAuth();
    }
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
