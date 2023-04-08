import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {NavigatorStack} from './routes/NavigationStack';

const getIsSignedIn = () => {
  // custom logic
  return true;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false
    }
}

componentDidMount() {
  const isSignedIn = getIsSignedIn();
  this.setState({
    loading: false,
    isSignedIn: isSignedIn
  });
}

  render() {
    return (
      <NavigationContainer>
        <NavigatorStack isSignedIn={this.state.isSignedIn} />
      </NavigationContainer>
    );
  }
  
}
