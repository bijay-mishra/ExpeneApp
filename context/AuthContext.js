import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const LOGGED_IN_USER_KEY = '@ExpenseApp_LoggedInUser';
const ALL_USERS_KEY = '@ExpenseApp_AllUsers';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
                if (storedUser) { setUser(JSON.parse(storedUser)); }
            } catch (e) { console.error("Failed to load user from storage", e); }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    const authContextValue = {
        user,
        isLoading,
        // --- START: CORRECTED SIGN-IN FUNCTION ---
        signIn: async (email, password) => {
            try {
                const allUsersString = await AsyncStorage.getItem(ALL_USERS_KEY);
                const allUsers = allUsersString ? JSON.parse(allUsersString) : [];
                const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

                if (!foundUser) {
                    // Case 1: The email address does not exist in our database.
                    Alert.alert("Login Failed", "No account found with this email. Please register first.");
                } else if (foundUser.password === password) {
                    // Case 2: Email exists and password is correct.
                    setUser(foundUser);
                    await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(foundUser));
                } else {
                    // Case 3: Email exists, but the password is incorrect.
                    Alert.alert("Login Failed", "Invalid password.");
                }
            } catch (e) {
                console.error("Failed to sign in", e);
                Alert.alert("Login Error", "An error occurred during login.");
            }
        },
        // --- END: CORRECTED SIGN-IN FUNCTION ---
        signUp: async (name, email, password, onSuccess) => {
            if (!name || !email || !password) { Alert.alert("Input Error", "Please fill all fields."); return; }
            try {
                const allUsersString = await AsyncStorage.getItem(ALL_USERS_KEY);
                let allUsers = allUsersString ? JSON.parse(allUsersString) : [];
                const userExists = allUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
                if (userExists) { Alert.alert("Registration Failed", "An account with this email already exists."); return; }
                const newUser = { name, email, password };
                allUsers.push(newUser);
                await AsyncStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
                Alert.alert("Success", "Registration successful! Please log in.");
                onSuccess();
            } catch (e) { console.error("Failed to sign up", e); Alert.alert("Registration Error", "An error occurred during registration."); }
        },
        signOut: async () => {
            try { await AsyncStorage.removeItem(LOGGED_IN_USER_KEY); setUser(null); }
            catch (e) { console.error("Failed to sign out", e); }
        },
        updateProfileImage: async (imageUri) => {
            if (!user) return;
            const updatedUser = { ...user, profileImage: imageUri };
            try {
                setUser(updatedUser);
                await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));
                const allUsersString = await AsyncStorage.getItem(ALL_USERS_KEY);
                let allUsers = allUsersString ? JSON.parse(allUsersString) : [];
                const userIndex = allUsers.findIndex(u => u.email === user.email);
                if (userIndex !== -1) { allUsers[userIndex] = updatedUser; await AsyncStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers)); }
            } catch (e) { console.error("Failed to update profile image", e); }
        }
    };

    return ( <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider> );
};