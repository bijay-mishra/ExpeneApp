import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext();

// --- UPDATED KEYS FOR MULTI-ACCOUNT SYSTEM ---
const ALL_ACCOUNTS_KEY = '@ExpenseApp_AllAccounts'; // Replaces ALL_USERS_KEY
const CURRENT_ACCOUNT_EMAIL_KEY = '@ExpenseApp_CurrentAccountEmail';
const BIOMETRIC_ENABLED_KEY = '@ExpenseApp_BiometricEnabled';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // The currently active user
    const [allAccounts, setAllAccounts] = useState([]); // List of all saved accounts
    const [isLoading, setIsLoading] = useState(true);
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    });

    // Effect to handle the response from Google Sign-In
    useEffect(() => { /* ... */ }, [response]);

    // Effect to load initial state (all accounts and the last active user)
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

    const authContextValue = {
        user,
        allAccounts,
        isLoading,
        isBiometricEnabled,
        signIn: async (email, password) => {
            const foundUser = allAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
            if (!foundUser) { Alert.alert("Login Failed", "No account found. Please register."); }
            else if (foundUser.isGoogleUser) { Alert.alert("Login Failed", "This account uses Google Sign-In."); }
            else if (foundUser.password === password) {
                setUser(foundUser);
                await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, foundUser.email);
            } else { Alert.alert("Login Failed", "Invalid password."); }
        },
        signUp: async (name, email, password, onSuccess) => {
            const userExists = allAccounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
            if (userExists) { Alert.alert("Registration Failed", "An account with this email already exists."); return; }
            const newUser = { name, email, password };
            const newAccountList = [...allAccounts, newUser];
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
            Alert.alert("Success", "Registration successful! Please log in.");
            onSuccess();
        },
        googleSignIn: () => promptAsync(),
        signOut: async () => {
            const newAccountList = allAccounts.filter(acc => acc.email !== user.email);
            setAllAccounts(newAccountList);
            await AsyncStorage.setItem(ALL_ACCOUNTS_KEY, JSON.stringify(newAccountList));
            setUser(null);
            await AsyncStorage.removeItem(CURRENT_ACCOUNT_EMAIL_KEY);
        },
        switchAccount: async (email) => {
            const accountToSwitchTo = allAccounts.find(acc => acc.email === email);
            if (accountToSwitchTo) {
                setUser(accountToSwitchTo);
                await AsyncStorage.setItem(CURRENT_ACCOUNT_EMAIL_KEY, accountToSwitchTo.email);
            }
        },
        addAccount: async () => {
            setUser(null);
            await AsyncStorage.removeItem(CURRENT_ACCOUNT_EMAIL_KEY);
        },
        updateUserInfo: async (newName) => {
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
        },
        // ... (all other functions like changePassword, updateProfileImage, biometrics, etc.)
    };

    return ( <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider> );
};