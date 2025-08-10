import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './SignInScreen.styles';

const REMEMBERED_EMAIL_KEY = '@ExpenseApp_RememberedEmail';
const BIOMETRIC_ENABLED_KEY = '@ExpenseApp_BiometricEnabled';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for the show/hide toggle
    
    const { signIn, googleSignIn, signInWithBiometrics } = useContext(AuthContext);

    // Effect to check for and trigger biometrics on screen load
    useEffect(() => {
        const checkBiometrics = async () => {
            const isBiometricEnabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY) === 'true';
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (isBiometricEnabled && hasHardware && isEnrolled) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Log in to ExpenseApp',
                    cancelLabel: 'Use Password',
                });
                if (result.success) {
                    signInWithBiometrics();
                }
            }
        };
        checkBiometrics();
    }, []);

    // Effect to load a remembered email on screen load
    useEffect(() => {
        const loadRememberedEmail = async () => {
            const remembered = await AsyncStorage.getItem(REMEMBERED_EMAIL_KEY);
            if (remembered) {
                setEmail(remembered);
                setRememberMe(true);
            }
        };
        loadRememberedEmail();
    }, []);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Input Error", "Please enter your credentials.");
            return;
        }
        if (rememberMe) {
            await AsyncStorage.setItem(REMEMBERED_EMAIL_KEY, email);
        } else {
            await AsyncStorage.removeItem(REMEMBERED_EMAIL_KEY);
        }
        signIn(email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                </View>

                <Text style={styles.title}>Welcome Back!</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or Phone Number"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible} // Controlled by state
                    />
                    {password.length > 0 && (
                        <TouchableOpacity
                            style={styles.showPasswordButton}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Text style={styles.showPasswordText}>
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setRememberMe(!rememberMe)}>
                        <View style={[styles.checkbox, rememberMe && styles.checked]}>
                            {rememberMe && <Feather name="check" size={14} color="white" />}
                        </View>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Don't have an account? Register</Text>
                </TouchableOpacity>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>OR</Text>
                    <View style={styles.line} />
                </View>

                <TouchableOpacity style={styles.googleButton} onPress={() => googleSignIn()}>
                    <Image source={require('../../assets/images/google-icon.png')} style={styles.googleIcon} />
                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </ScrollView>
             <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                    Developed by <Text style={styles.developerName}>Er. Bijay Mishra</Text>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default SignInScreen;