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
import CreateNewPasswordScreen from '../screens/Auth/CreateNewPasswordScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import VerifyOtpScreen from '../screens/Auth/VerifyOtpScreen';
import AccountInfoScreen from '../screens/Main/AccountInfoScreen';
import ChangePasswordScreen from '../screens/Main/ChangePasswordScreen';
import CurrencyScreen from '../screens/Main/CurrencyScreen';
import FaqScreen from '../screens/Main/FaqScreen';
import FeedbackScreen from '../screens/Main/FeedbackScreen';
import LanguageScreen from '../screens/Main/LanguageScreen';
import NotificationsScreen from '../screens/Main/NotificationsScreen';
import PrivacyPolicyScreen from '../screens/Main/PrivacyPolicyScreen';
import ReportScreen from '../screens/Main/ReportAProblem';
import SecurityScreen from '../screens/Main/SecurityScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
         <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        {/* --- 2. ADD THE SCREEN TO THE STACK (if not already there) --- */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
         <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
          <Stack.Screen name="Security" component={SecurityScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="FAQs" component={FaqScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Currency" component={CurrencyScreen} />
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