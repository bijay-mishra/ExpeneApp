import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './ChangePasswordScreen.styles';
import { AuthContext } from '../../context/AuthContext';

const ChangePasswordScreen = ({ navigation }) => {
    const { changePassword } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCurrentVisible, setIsCurrentVisible] = useState(false);
    const [isNewVisible, setIsNewVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }
        const success = await changePassword(currentPassword, newPassword);
        if (success) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} secureTextEntry={!isCurrentVisible} value={currentPassword} onChangeText={setCurrentPassword} />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsCurrentVisible(!isCurrentVisible)}>
                        <Text style={styles.showPasswordText}>{isCurrentVisible ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} secureTextEntry={!isNewVisible} value={newPassword} onChangeText={setNewPassword} />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsNewVisible(!isNewVisible)}>
                        <Text style={styles.showPasswordText}>{isNewVisible ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} secureTextEntry={!isConfirmVisible} value={confirmPassword} onChangeText={setConfirmPassword} />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={() => setIsConfirmVisible(!isConfirmVisible)}>
                        <Text style={styles.showPasswordText}>{isConfirmVisible ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
                    <Text style={styles.saveButtonText}>Update Password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;