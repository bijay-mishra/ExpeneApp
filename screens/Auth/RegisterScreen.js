import { useContext, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './RegisterScreen.styles';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const { signUp } = useContext(AuthContext);
    const handleSignUp = () => {
        if (!name || !email || !password || !confirmPassword) { Alert.alert("Input Error", "Please fill in all fields."); return; }
        if (password !== confirmPassword) { Alert.alert("Password Error", "Passwords do not match."); return; }
        signUp(name, email, password, () => {
            navigation.navigate('SignIn');
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={styles.logoContainer}><Image source={require('../../assets/images/icon.png')} style={styles.logo} /></View>
                <Text style={styles.title}>Create Account</Text>
                <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} /></View>
                <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="Email or Phone Number" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" /></View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!isPasswordVisible} />
                    {password.length > 0 && (<TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsPasswordVisible(!isPasswordVisible)}><Text style={styles.showPasswordText}>{isPasswordVisible ? 'Hide' : 'Show'}</Text></TouchableOpacity>)}
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!isConfirmPasswordVisible} />
                    {confirmPassword.length > 0 && (<TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}><Text style={styles.showPasswordText}>{isConfirmPasswordVisible ? 'Hide' : 'Show'}</Text></TouchableOpacity>)}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.linkText}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footerContainer}><Text style={styles.footerText}>Developed by <Text style={styles.developerName}>Er.Bijay Mishra</Text></Text></View>
        </SafeAreaView>
    );
};
export default RegisterScreen;