import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();
export const AuthContext = createContext();

const ALL_ACCOUNTS_KEY = '@ExpenseApp_AllAccounts';
const CURRENT_ACCOUNT_EMAIL_KEY = '@ExpenseApp_CurrentAccountEmail';
const BIOMETRIC_ENABLED_KEY = '@ExpenseApp_BiometricEnabled';
const BIOMETRIC_USER_EMAIL_KEY = '@ExpenseApp_BiometricUserEmail';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allAccounts, setAllAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    });

    useEffect(() => {
        const loadInitialState = async () => {
            try {
                const allAccountsString = await AsyncStorage.getItem(ALL_ACCOUNTS_KEY);
                const savedAccounts = allAccountsString ? JSON.parse(allAccountsString) : [];
                setAllAccounts(savedAccounts);
                const currentEmail = await AsyncStorage.getItem(CURRENT_ACCOUNT_EMAIL_KEY);
                if (currentEmail) {
                    const currentUser = savedAccounts.find(acc => acc.email === currentEmail);
                    if (currentUser) setUser(currentUser);
                }
                const biometricStatus = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
                setIsBiometricEnabled(biometricStatus === 'true');
            } catch (e) { console.error("Failed to load initial state", e); }
            setIsLoading(false);
        };
        loadInitialState();
    }, []);
    
    useEffect(() => {
        const handleGoogleResponse = async () => {
            if (response?.type === 'success') {
                const { authentication } = response;
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${authentication.accessToken}` } });
                const googleUser = await userInfoResponse.json();
                const newUser = { name: googleUser.name, email: googleUser.email, profileImage: googleUser.picture, isGoogleUser: true };
                const userExistsIndex = allAccounts.findIndex(u => u.email.toLowerCase() === newUser.email.toLowerCase());
                let updatedAccounts = [...allAccounts];
                if (userExistsIndex !== -1) { updatedAccounts[userExistsIndex] = newUser; } else { updatedAccounts.push(newUser); }
                setAllAccounts(updatedAccounts);
                await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
                setUser(newUser);
                await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, newUser.email);
            } else if (response?.type === 'error') { Alert.alert('Google Sign-In Error', 'Something went wrong.'); }
        };
        handleGoogleResponse();
    }, [response, allAccounts]);

    const signIn = useCallback(async (email, password) => {
        try {
            const allUsersString = await AsyncStorage.getItem(ALL_ACCOUNTS_KEY);
            const allUsers = allUsersString ? JSON.parse(allUsersString) : [];
            setAllAccounts(allUsers);
            const foundUser = allUsers.find(acc => acc.email.toLowerCase() === email.toLowerCase());
            if (!foundUser) { Alert.alert("Login Failed", "No account found. Please register."); }
            else if (foundUser.isGoogleUser) { Alert.alert("Login Failed", "This account uses Google Sign-In."); }
            else if (foundUser.password === password) { setUser(foundUser); await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, foundUser.email); }
            else { Alert.alert("Login Failed", "Invalid password."); }
        } catch (e) { console.error("Failed to sign in", e); Alert.alert("Login Error", "An error occurred."); }
    }, []);

      const signUp = useCallback(async (name, email, password, onSuccess) => {
        const userExists = allAccounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            Alert.alert("Registration Failed", "An account with this email already exists.");
            return; 
        }
        const newUser = { name, email, password };
        const newAccountList = [...allAccounts, newUser];
        try {
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
            setAllAccounts(newAccountList);
            Alert.alert("Success", "Registration successful! Please log in.");
            if (onSuccess) {
                onSuccess();
            }

        } catch (e) {
            console.error("Failed to sign up", e);
            Alert.alert("Registration Error", "An error occurred during registration.");
        }
    }, [allAccounts]);
    const signOut = useCallback(async () => {
        setUser(null);
        await AsyncStorage.removeItem(CURRENT_ACCOUNT_EMAIL_KEY);
    }, []);
    const switchAccount = useCallback(async (email) => {
        const accountToSwitchTo = allAccounts.find(acc => acc.email === email);
        if (accountToSwitchTo) { setUser(accountToSwitchTo); await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, accountToSwitchTo.email); }
    }, [allAccounts]);

    const addAccount = useCallback(async () => {
        setUser(null);
        await AsyncStorage.removeItem(CURRENT_ACCOUNT_EMAIL_KEY);
    }, []);
    
    const signInWithBiometrics = useCallback(async () => {
        const biometricEmail = await AsyncStorage.getItem(BIOMETRIC_USER_EMAIL_KEY);
        if (!biometricEmail) { Alert.alert("Biometric Error", "No user is linked to biometrics."); return; }
        const foundUser = allAccounts.find(u => u.email.toLowerCase() === biometricEmail.toLowerCase());
        if (foundUser) { setUser(foundUser); await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, foundUser.email); }
        else { Alert.alert("Login Failed", "The user for your biometrics was not found."); }
    }, [allAccounts]);

    const enableBiometrics = useCallback(async () => {
        if (!user) { Alert.alert("Error", "You must be logged in to enable biometrics."); return; }
        await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');
        await AsyncStorage.setItem(BIOMETRIC_USER_EMAIL_KEY, user.email);
        setIsBiometricEnabled(true);
        Alert.alert("Success", "Biometric login has been enabled.");
    }, [user]);

    const disableBiometrics = useCallback(async () => {
        await AsyncStorage.removeItem(BIOMETRIC_ENABLED_KEY);
        await AsyncStorage.removeItem(BIOMETRIC_USER_EMAIL_KEY);
        setIsBiometricEnabled(false);
        Alert.alert("Disabled", "Biometric login has been disabled.");
    }, []);
    
    const updateProfileImage = useCallback(async (imageUri) => {
        if (!user) return;
        const updatedUser = { ...user, profileImage: imageUri };
        setUser(updatedUser);
        const userIndex = allAccounts.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            const newAccountList = [...allAccounts];
            newAccountList[userIndex] = updatedUser;
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
        }
    }, [user, allAccounts]);

    const updateUserInfo = useCallback(async (newName) => {
        if (!user) return;
        const updatedUser = { ...user, name: newName };
        setUser(updatedUser);
        const userIndex = allAccounts.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userIndex !== -1) {
            const newAccountList = [...allAccounts];
            newAccountList[userIndex] = updatedUser;
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
        }
        Alert.alert("Success", "Your information has been updated.");
    }, [user, allAccounts]);

    const sendPasswordResetOtp = useCallback(async (emailOrPhone, onSuccess) => {
        const foundUser = allAccounts.find(u => u.email.toLowerCase() === emailOrPhone.toLowerCase());
        if (foundUser) { const otp = Math.floor(1000 + Math.random() * 9000); Alert.alert("OTP Sent (For Test)", `Your verification code is: ${otp}`); onSuccess(otp); }
        else { Alert.alert("Error", "No account found with that identifier."); }
    }, [allAccounts]);

    const resetPassword = useCallback(async (emailOrPhone, newPassword, onSuccess) => {
        const userIndex = allAccounts.findIndex(u => u.email.toLowerCase() === emailOrPhone.toLowerCase());
        if (userIndex !== -1) {
            const newAccountList = [...allAccounts];
            newAccountList[userIndex].password = newPassword;
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
            Alert.alert("Success", "Your password has been reset. Please log in.");
            onSuccess();
        } else { Alert.alert("Error", "Could not reset password. User not found."); }
    }, [allAccounts]);

    const changePassword = useCallback(async (currentPassword, newPassword) => {
        if (!user) { Alert.alert("Error", "No user is logged in."); return false; }
        if (user.isGoogleUser) { Alert.alert("Error", "Password cannot be changed for Google accounts."); return false; }
        if (user.password !== currentPassword) { Alert.alert("Error", "The current password you entered is incorrect."); return false; }
        const updatedUser = { ...user, password: newPassword };
        setUser(updatedUser);
        const userIndex = allAccounts.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            const newAccountList = [...allAccounts];
            newAccountList[userIndex] = updatedUser;
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
        }
        Alert.alert("Success", "Your password has been changed successfully.");
        return true;
    }, [user, allAccounts]);

    const authContextValue = {
        user, allAccounts, isLoading, isBiometricEnabled,
        signIn, signUp, googleSignIn: promptAsync, signOut, switchAccount,
        addAccount, signInWithBiometrics, enableBiometrics,
        disableBiometrics, updateProfileImage, updateUserInfo,
        sendPasswordResetOtp, resetPassword, changePassword
    };

    return ( <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider> );
};