import { useContext, useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './SignInScreen.styles';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleSignIn = () => {
        if (!email || !password) {
            Alert.alert("Input Error", "Please enter both email and password.");
            return;
        }
        signIn(email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SignInScreen;