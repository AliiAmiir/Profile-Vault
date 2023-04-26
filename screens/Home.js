import React, { Component, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Import Utils
import { computeAge } from '../utils/computeUtil';

// Import Repositories
import { fetchUserById } from '../repository/userRepository';
import { fetchUserGoals } from '../repository/goalsRepository';
import { fetchUpcomingTripsForHome } from '../repository/tripsRepository';
import { fetchUserPreferences } from '../repository/preferencesRepository';
import { fetchFavorsForHome } from '../repository/favorsRepository';

// Import Configs
import { auth } from '../config/firebaseConfig';

// Import StyleSheets
import { containerStyles, textStyles } from '../styles/globalStyle';

// Import Components
import UserAvatar from '../components/UserAvatar';

const fetchHomeScreenData = async () => {
  try {
    const userData = await fetchUserData();
    const goalsData = await fetchGoals();
    const preferencesData = await fetchPreferences();
    const favorsData = await fetchFavors();
    const tripsData = await fetchUpcomingTrips();

    return ({
      userData: userData,
      goalsData: goalsData,
      preferencesData: preferencesData,
      favorsData: favorsData,
      tripsData: tripsData,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const fetchUserData = async () => {
  try {
    const response = await fetchUserById(auth.currentUser.uid);
    if (!response || !response.success) {
      throw new Error(response.message || 'Failed to fetch User Data');
    }

    const userData = response.data;

    const age = computeAge(userData.dateOfBirth)

    return ({
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

const fetchGoals = async () => {
  try {
    const response = await fetchUserGoals(auth.currentUser.uid, 3);

    if (response && response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch User Goals');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const fetchPreferences = async () => {
  try {
    const response = await fetchUserPreferences(auth.currentUser.uid, 3);

    if (response && response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch User Preferences');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const fetchFavors = async () => {
  try {
    const response = await fetchFavorsForHome(auth.currentUser.uid);

    if (response && response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch Favors');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const fetchUpcomingTrips = async() =>{
  try {
    const response = await fetchUpcomingTripsForHome(auth.currentUser.uid);

    if (response && response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch Upcoming Trips');
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

class Home extends Component {
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

      const { userData, goalsData, preferencesData, favorsData, tripsData } = await fetchHomeScreenData();
      
      this.setState({
        loading: false,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone,
        age: userData.age,
        goals: goalsData,
        preferences: preferencesData,
        favors: favorsData,
        upcomingTrips: tripsData,
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert('Unexpected Error Occurred');
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

            {this.state.goals && this.state.goals.length > 0 && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              {this.state.goals.map((goal, index) => (
                <Text style={textStyles.boldText} key={index}>{goal.name}: <Text style={textStyles.subText}>{`${goal.counter} day(s) streak`}</Text></Text>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Goals</Text>
            </View>
            )}

            {(!this.state.goals || this.state.goals.length < 1) && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Goals</Text>
              <Text>No Goal(s) to display yet</Text>
            </View>
            )}

            {this.state.upcomingTrips && this.state.upcomingTrips.length > 0 && (<View style={containerStyles.shadowTextContainer}>
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

            {(!this.state.upcomingTrips || this.state.upcomingTrips.length < 1) && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Trips</Text>
              <Text>No Trip(s) to display yet</Text>
            </View>
            )}

            {this.state.favors && this.state.favors.length > 0 && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Favors</Text>
              {this.state.favors.map((favor, index) => (
                <View key={index}>
                  {favor.recipients && favor.recipients.length > 0 && (
                    <Text style={textStyles.boldText}>{`${favor.type} for ${favor.recipients}`}</Text>
                  )}

                  {!favor.recipients && (
                    <Text style={textStyles.boldText}>{`${favor.type} - No recipients added`}</Text>
                  )}
                </View>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Favors</Text>
            </View>
            )}

            {(!this.state.favors || this.state.favors.length < 1) && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Favors</Text>
              <Text>No Favor(s) to display yet</Text>
            </View>
            )}


            {this.state.preferences && this.state.preferences.length > 0 && (<View style={containerStyles.shadowTextContainer}>
              <Text style={textStyles.textSubHeading}>Preferences</Text>
              {this.state.preferences.map((preference, index) => (
                <Text style={textStyles.boldText} key={index}>{`${preference.type} - ${preference.names}`}</Text>
              ))}
              <Text style={textStyles.subText}>For more details, navigate to Preferences</Text>
            </View>
            )}

            {(!this.state.preferences || this.state.preferences.length < 1) && (<View style={containerStyles.shadowTextContainer}>
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

function HomeWrapper(props) {
  const homeRef = useRef();

  useFocusEffect(
    useCallback(() => {
      if (homeRef.current) {
        homeRef.current.fetchHomeScreenData();
      }
    }, [])
  );

  return <Home ref={homeRef} {...props} />;
}

export default HomeWrapper;