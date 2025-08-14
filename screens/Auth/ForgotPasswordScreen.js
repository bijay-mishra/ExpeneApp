import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './ForgotPasswordScreen.styles';

const ForgotPasswordScreen = ({ navigation }) => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const { sendPasswordResetOtp } = useContext(AuthContext);
    const handleSendOtp = () => {
        if (!emailOrPhone) {
            Alert.alert('Input Required', 'Please enter your email or phone number.');
            return;
        }
        sendPasswordResetOtp(emailOrPhone, (otp) => {
            navigation.navigate('VerifyOtp', { emailOrPhone, otp });
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter the email or phone number associated with your account and we'll send an OTP to reset your password.</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor="#888"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
            />
            
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;