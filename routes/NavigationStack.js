import { createStackNavigator } from '@react-navigation/stack';
import { NavigationTab } from './NavigationTab';

import Login from './../screens/Login';
import Register from './../screens/Register';

import Education from './../pages/Education';
import Health from './../pages/Health';
import Passwords from './../pages/Passwords';
import Preferences from './../pages/Preferences';
import Significants from './../pages/Significants';
import Favors from './../pages/Favors';
import Jobs from './../pages/Jobs';
import PersonalGoal from './../pages/PersonalGoal';
import Relatives from './../pages/Relatives';
import Trips from './../pages/Trips';

const Stack = createStackNavigator();

export const NavigatorStack = (loginDetails) => {
    const isSignedIn = loginDetails.isSignedIn;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isSignedIn ? (
                <>
                    <Stack.Screen name="NavigationTab" component={NavigationTab} />
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
                    <Stack.Screen name="SignIn" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </>
            )}
        </Stack.Navigator>
    );
}
