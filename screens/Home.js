import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

// Import Utils
import { computeAge } from '../utils/computeUtil';

// Import Repositories
import { fetchUserById } from '../repository/userRepository';
import { fetchUserGoalsForHome } from '../repository/goalsRepository';
import { fetchUpcomingTripsForHome } from '../repository/tripsRepository';
import { fetchPreferencesForHome } from '../repository/preferencesRepository';
import { fetchFavorsForHome } from '../repository/favorsRepository';

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
      dateOfBirth: new Date(),
      phone: '',
      goals: [],
      preferences: [],
      favors: [],
      upcomingTrips: [],
    }
  }

  componentDidMount() {
    this.fetchHomeScreenData();
  }

  componentWillUnmount() {

  }

  async fetchHomeScreenData() {
    try {
      // Fetch User Data
      await this.fetchUserData();

      // Fetch Goals
      await this.fetchGoals();

      // Fetch Preferences
      await this.fetchPreferences();

      // Fetch Favors
      await this.fetchFavors();

      // Fetch Upcoming Trips
      await this.fetchUpcomingTrips();
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
    }
  }

  async fetchUserData() {
    try {
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
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchGoals() {
    try {
      const response = await fetchUserGoalsForHome(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ goals: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch User Goals');
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchUpcomingTrips() {
    try {
      const response = await fetchUpcomingTripsForHome(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ upcomingTrips: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Upcoming Trips');
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchFavors() {
    try {
      const response = await fetchFavorsForHome(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ favors: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Favors');
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchPreferences() {
    try {
      const response = await fetchPreferencesForHome(auth.currentUser.uid);

      if (response && response.success) {
        this.setState({ preferences: response.data });
      } else {
        Alert.alert(response.message || 'Failed to fetch Preferences');
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
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

            {this.state.goals && this.state.goals.length > 0 && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              {this.state.goals.map((goal, index) => (
                <Text style={textStyles.boldText} key={index}>{goal.name}: <Text style={textStyles.subText}>{`${goal.counter} day(s) streak`}</Text></Text>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Goals</Text>
            </View>
            )}

            {(!this.state.goals || this.state.goals.length < 1) && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              <Text>No Goal(s) to display yet</Text>
            </View>
            )}

            {this.state.upcomingTrips && this.state.upcomingTrips.length > 0 && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Trips</Text>
              {this.state.upcomingTrips.map((trip, index) => (
                <View key={index}>
                  <Text style={textStyles.boldText}>{`${trip.city}, ${trip.state}, ${trip.country}`}</Text>
                  <Text style={textStyles.boldText}>{trip.dateFrom.toLocaleDateString()} - {trip.dateTo.toLocaleDateString()}</Text>
                  <Text style={textStyles.boldText}>Total Expenses: <Text style={textStyles.subText}>${trip.tripCost}</Text></Text>
                </View>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Trips</Text>
            </View>
            )}

            {(!this.state.upcomingTrips || this.state.upcomingTrips.length < 1) && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Trips</Text>
              <Text>No Trip(s) to display yet</Text>
            </View>
            )}

            {this.state.favors && this.state.favors.length > 0 && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Favors</Text>
              {this.state.favors.map((favor, index) => (
                <Text style={textStyles.boldText} key={index}>{`${favor.type} for ${favor.beneficiary}`}</Text>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Favors</Text>
            </View>
            )}

            {(!this.state.favors || this.state.favors.length < 1) && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Favors</Text>
              <Text>No Favor(s) to display yet</Text>
            </View>
            )}


            {this.state.preferences && this.state.preferences.length > 0 && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Preferences</Text>
              {this.state.preferences.map((preference, index) => (
                <Text style={textStyles.boldText} key={index}>{preference.name}</Text>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Preferences</Text>
            </View>
            )}

            {(!this.state.preferences || this.state.preferences.length < 1) && (<View style={containerStyles.textContainer}>
              <Text style={textStyles.textSubHeading}>Preferences</Text>
              <Text>No Preference(s) to display yet</Text>
            </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
