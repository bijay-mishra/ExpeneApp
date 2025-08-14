import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CreateNewPasswordScreen from '../screens/Auth/CreateNewPasswordScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import VerifyOtpScreen from '../screens/Auth/VerifyOtpScreen';
import AccountInfoScreen from '../screens/Main/AccountInfoScreen';
import ActivityScreen from '../screens/Main/ActivityScreen';
import AddExpenseScreen from '../screens/Main/AddExpenseScreen';
import AddIncomeScreen from '../screens/Main/AddIncomeScreen';
import ChangePasswordScreen from '../screens/Main/ChangePasswordScreen';
import CurrencyScreen from '../screens/Main/CurrencyScreen';
import FaqScreen from '../screens/Main/FaqScreen';
import FeedbackScreen from '../screens/Main/FeedbackScreen';
import LanguageScreen from '../screens/Main/LanguageScreen';
import MessageCenterScreen from '../screens/Main/MessageCenterScreen';
import NotificationsScreen from '../screens/Main/NotificationsScreen';
import PaymentScreen from '../screens/Main/PaymentScreen';
import PrivacyPolicyScreen from '../screens/Main/PrivacyPolicyScreen';
import QuickMenuScreen from '../screens/Main/QuickMenuScreen';
import ReminderScreen from '../screens/Main/ReminderScreen';
import SecurityScreen from '../screens/Main/SecurityScreen';
import SettingsScreen from '../screens/Main/SettingScreen';
import MainTabNavigator from './MainTabNavigator';

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
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ presentation: 'card' }} />
        <Stack.Screen name="QuickMenu" component={QuickMenuScreen} />
        <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="FAQs" component={FaqScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Currency" component={CurrencyScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="MessageCenter" component={MessageCenterScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
    </Stack.Navigator>
);
const AppNavigator = () => {
    const { user, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#7B4AF7" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;