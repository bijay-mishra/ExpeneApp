import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './CreateNewPasswordScreen.styles';

const CreateNewPasswordScreen = ({ route, navigation }) => {
    const { emailOrPhone } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword } = useContext(AuthContext);

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in both password fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        resetPassword(emailOrPhone, newPassword, () => {
            navigation.navigate('SignIn');
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity></View>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>Your new password must be different from previous used passwords.</Text>
            <TextInput style={styles.input} placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}><Text style={styles.buttonText}>Reset Password</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default CreateNewPasswordScreen;
