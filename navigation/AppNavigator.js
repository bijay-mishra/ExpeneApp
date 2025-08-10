import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

// --- Screen Imports ---
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import AddExpenseScreen from '../screens/Main/AddExpenseScreen';
import AddIncomeScreen from '../screens/Main/AddIncomeScreen';
import SettingsScreen from '../screens/Main/SettingScreen';
import MainTabNavigator from './MainTabNavigator';
// --- 1. IMPORT YOUR NOTIFICATIONS SCREEN (if not already there) ---
import NotificationsScreen from '../screens/Main/NotificationsScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        {/* --- 2. ADD THE SCREEN TO THE STACK (if not already there) --- */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const { user, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
    }
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;