import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Home from './../screens/Home';
import Manage from './../screens/Manage';
import Settings from './../screens/Settings';

const Tab = createBottomTabNavigator();

export const NavigationTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
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
                component={Manage}
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
                component={Settings}
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