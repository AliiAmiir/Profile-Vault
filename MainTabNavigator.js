// MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import ManagePage from './ManagePage';
import SettingsPage from './SettingsPage';

import createStack from './createStack';
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

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={createStack(HomePage)} />
      <Tab.Screen name="Manage" component={createStack(ManagePage)} />
      <Tab.Screen name="Settings" component={createStack(SettingsPage)} />

      <Tab.Screen name="Education" component={createStack(Education)} />
      <Tab.Screen name="Health" component={createStack(Health)} />
      <Tab.Screen name="Passwords" component={createStack(Passwords)} />
      <Tab.Screen name="Preferences" component={createStack(Preferences)} />
      <Tab.Screen name="Significants" component={createStack(Significants)} />
      <Tab.Screen name="Favors" component={createStack(Favors)} />
      <Tab.Screen name="Jobs" component={createStack(Jobs)} />
      <Tab.Screen name="PersonalGoal" component={createStack(PersonalGoal)} />
      <Tab.Screen name="Relatives" component={createStack(Relatives)} />
      <Tab.Screen name="Trips" component={createStack(Trips)} />
      {/* Add other pages using createStack here */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
