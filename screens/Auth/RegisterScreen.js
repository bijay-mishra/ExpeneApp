import { useContext, useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = useContext(AuthContext);

    const handleSignUp = () => {
        if (!name || !email || !password) {
            Alert.alert("Input Error", "Please fill in all fields.");
            return;
        }
        // Pass a callback function to navigate after success
        signUp(name, email, password, () => navigation.navigate('SignIn'));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.linkText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default RegisterScreen;