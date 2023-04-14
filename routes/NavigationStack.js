import { createStackNavigator } from '@react-navigation/stack';
import Login from './../screens/Login';
import Register from './../screens/Register';
import Education from '../screens/Education';
import Health from '../screens/Health';
import Passwords from '../screens/Passwords';
import Preferences from '../screens/Preferences';
import Significants from '../screens/Significants';
import Favors from '../screens/Favors';
import Jobs from '../screens/Jobs';
import PersonalGoal from '../screens/PersonalGoal';
import Relatives from '../screens/Relatives';
import Trips from '../screens/Trips';
import Manage from '../screens/Manage';

const AuthStack = createStackNavigator();
const ManageStack = createStackNavigator();

export const AuthScreenStack = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
        </AuthStack.Navigator>
    )
};

export const ManageScreenStack = () => {
    return (
        <ManageStack.Navigator>
            <ManageStack.Screen name="ManageMain" component={Manage} options={{ headerShown: false }} />
            <ManageStack.Screen name="Education" component={Education} />
            <ManageStack.Screen name="Health" component={Health} />
            <ManageStack.Screen name="Passwords" component={Passwords} />
            <ManageStack.Screen name="Preferences" component={Preferences} />
            <ManageStack.Screen name="Significants" component={Significants} />
            <ManageStack.Screen name="Favors" component={Favors} />
            <ManageStack.Screen name="Jobs" component={Jobs} />
            <ManageStack.Screen name="PersonalGoal" component={PersonalGoal} />
            <ManageStack.Screen name="Relatives" component={Relatives} />
            <ManageStack.Screen name="Trips" component={Trips} />
        </ManageStack.Navigator>
    )
};
