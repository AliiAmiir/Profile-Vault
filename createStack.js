// NestedStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const NestedStackNavigator = (initialScreen) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={initialScreen.name} component={initialScreen.component} />
    </Stack.Navigator>
  );
};

export default NestedStackNavigator;
