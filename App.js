import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

// Import your screens here
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ManagePage from './ManagePage';
import SettingsPage from './SettingsPage';

// Import the additional pages
import Education from './pages/Education';
import Health from './pages/Health';
import Passwords from './pages/Passwords';
import Preferences from './pages/Preferences';
import Significants from './pages/Significants';
import Favors from './pages/Favors';
import Jobs from './pages/Jobs';
import PersonalGoal from './pages/PersonalGoal';
import Relatives from './pages/Relatives';
import Trips from './pages/Trips';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getIsSignedIn = () => {
  // custom logic
  return false;
};

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black', // Set active tab text color to black
        tabBarInactiveTintColor: 'black', // Set inactive tab text color to black
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => null, // Remove the default icon
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14, paddingBottom: 10 }}>Home</Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManagePage}
        options={{
          tabBarIcon: () => null, // Remove the default icon
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14, paddingBottom: 10 }}>Manage</Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          tabBarIcon: () => null, // Remove the default icon
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color, fontSize: focused ? 16 : 14, paddingBottom: 10 }}>Settings</Text>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const isSignedIn = getIsSignedIn();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="Education" component={Education} />
            <Stack.Screen name="Health" component={Health} />
            <Stack.Screen name="Passwords" component={Passwords} />
            <Stack.Screen name="Preferences" component={Preferences} />
            <Stack.Screen name="Significants" component={Significants} />
            <Stack.Screen name="Favors" component={Favors} />
            <Stack.Screen name="Jobs" component={Jobs} />
            <Stack.Screen name="PersonalGoal" component={PersonalGoal} />
            <Stack.Screen name="Relatives" component={Relatives} />
            <Stack.Screen name="Trips" component={Trips} />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="SignIn" component={Login} /> */}
            <Stack.Screen name="SignUp" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
