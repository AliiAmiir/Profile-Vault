import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Import your screens here
import HomePage from './HomePage';
import ManagePage from './ManagePage';
import SettingsPage from './SettingsPage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: 'black', // Set active tab text color to black
          tabBarInactiveTintColor: 'black', // Set inactive tab text color to black
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
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
    </NavigationContainer>
  );
}
