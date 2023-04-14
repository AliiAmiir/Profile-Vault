import React, { Component } from 'react';
import { NavigatorTab } from './routes/NavigationTab';
import { ActivityIndicator, View } from 'react-native';
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
      if (!user) {
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
    if (this.setAuth) {
      this.setAuth();
    }
  }

  render() {
    return (
      <NavigatorTab isSignedIn={this.state.isSignedIn} />
    );
  }

}
