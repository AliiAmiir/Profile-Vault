import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

// Import Utils
import { computeAge } from '../utils/computeUtil';

// Import Repositories
import { fetchUserById } from '../repository/userRepository';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import UserAvatar from '../components/UserAvatar';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isSignedIn: false,
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      dateOfBirth: '',
      phone: ''
    }
  }

  componentDidMount() {
    this.fetchUserData();
  }

  componentWillUnmount() {
    if (this.fetchUserData) {
      this.fetchUserData();
    }
  }

  async fetchUserData() {
    const userData = await fetchUserById(auth.currentUser.uid);
    const age = computeAge(userData.dateOfBirth)

    this.setState({
      loading: false,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
      phone: userData.phone,
      age: age,
    });
  }

  render() {
    return (
      <View style={containerStyles.defaultContainer}>
        <ScrollView>
          <View style={containerStyles.textContainer}>
            <View style={containerStyles.rowContainer}>
              <UserAvatar firstName={this.state.firstName} lastName={this.state.lastName} />

              <View style={containerStyles.rowAlignContainer}>
                <Text style={textStyles.textHeading}>{this.state.firstName}, {this.state.age}</Text>
              </View>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Hobbies</Text>
              <Text>Hobby 1</Text>
              <Text>Hobby 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              <Text>Goal 1</Text>
              <Text>Goal 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Preferences</Text>
              <Text>Preferences 1</Text>
              <Text>Preferences 2</Text>
            </View>
            <View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Favor Categories</Text>
              <Text>Favor 1</Text>
              <Text>Favor 2</Text>
            </View>
          </View>
          <View style={containerStyles.buttonContainer}>
          </View>
        </ScrollView>
      </View>
    );
  }
}
