import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './VerifyOtpScreen.styles';

const VerifyOtpScreen = ({ route, navigation }) => {
    const { emailOrPhone, otp: correctOtp } = route.params; 
    const [enteredOtp, setEnteredOtp] = useState('');

    const handleVerifyOtp = () => {
        if (enteredOtp === correctOtp.toString()) {
            Alert.alert('Success', 'OTP Verified!');
            navigation.navigate('CreateNewPassword', { emailOrPhone });
        } else {
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity></View>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>An 4 digit code has been sent to your {emailOrPhone.includes('@') ? 'email' : 'phone'}.</Text>
            <TextInput style={styles.input} placeholder="_ _ _ _" keyboardType="numeric" maxLength={4} value={enteredOtp} onChangeText={setEnteredOtp} />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}><Text style={styles.buttonText}>Verify</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default VerifyOtpScreen;