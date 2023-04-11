import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../screens/Home';
import Settings from './../screens/Settings';
import Manage from '../screens/Manage';
import { AuthScreenStack, ManageScreenStack } from './NavigationStack';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export const NavigatorTab = (loginDetails) => {
    const isSignedIn = loginDetails.isSignedIn;

    return (
        <NavigationContainer>
            {isSignedIn ? (
                <Tab.Navigator initialRouteName="Home">
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Manage" component={ManageScreenStack} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
            ) : (
                <AuthScreenStack />
            )}
        </NavigationContainer>
    );
}