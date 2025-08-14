import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './FeedbackScreen.styles';

const FeedbackScreen = ({ navigation, route }) => {
    const { isReport } = route.params;
    const screenTitle = isReport ? 'Report a Problem' : 'Send Feedback';
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = async () => {
        if (!subject || !message) {
            Alert.alert('Missing Info', 'Please provide a subject and a message.');
            return;
        }

        const isAvailable = await MailComposer.isAvailableAsync();
        if (isAvailable) {
            MailComposer.composeAsync({
                recipients: ['support@expenseapp.com'], 
                subject: `${screenTitle}: ${subject}`,
                body: message,
            });
        } else {
            Alert.alert('Email Not Available', 'Please configure an email account on this device to proceed.');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>{screenTitle}</Text>
                <View style={{ width: 40 }} />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput style={styles.input} placeholder="e.g., Feature Request" value={subject} onChangeText={setSubject} />

                    <Text style={styles.label}>Message</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Please describe your feedback or problem in detail..."
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={sendEmail}>
                        <Text style={styles.submitButtonText}>Send</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default FeedbackScreen;