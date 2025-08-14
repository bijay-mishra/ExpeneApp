import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './FaqScreen.styles';

const faqs = [
    { 
        id: '1', 
        question: 'How do I add a new transaction?', 
        answer: 'From any of the main screens (Home, Overview, etc.), tap the large purple "+" button at the bottom center of the tab bar. This will take you to the "Add" screen where you can choose to add either an income or an expense.' 
    },
    { 
        id: '2', 
        question: 'How does the statistics graph work?', 
        answer: 'The graph automatically groups your transactions from the last 4 periods into totals. You can use the dropdown on the Overview screen to switch between a weekly view (last 4 weeks) and a monthly view (last 4 months) to visualize your financial habits.' 
    },
    { 
        id: '3', 
        question: 'Can I edit or delete a transaction?', 
        answer: 'Yes. On the Home screen, simply long-press (tap and hold) on any transaction in the list. A menu will appear allowing you to either "Edit" or "Delete" that specific item.' 
    },
    { 
        id: '4', 
        question: 'Is my financial data secure?', 
        answer: 'Yes. All of your financial and personal data is stored locally and securely on your device using encrypted storage. We do not have access to your financial information, and your data is not uploaded to any external servers.'
    },
    { 
        id: '5', 
        question: 'Can I change my password?', 
        answer: 'Yes. Navigate to Profile > Security, then tap "Change Password". You will need to enter your current password to set a new one. Please note, this option is not available if you signed up using Google Sign-In.' 
    },
    { 
        id: '6', 
        question: 'Why can\'t I change my password if I used Google Sign-In?', 
        answer: 'For accounts created with Google, your password and account security are managed directly by Google. This is the most secure method. To change your password, you must do so through your Google account settings.' 
    },
    { 
        id: '7', 
        question: 'How do I enable biometric login (Fingerprint/Face ID)?', 
        answer: 'First, log in with your email and password. Then, go to Profile > Settings. If your device has the necessary hardware, you will see a "Biometric Login" toggle. Turn it on to enable quick and secure login for your next session.' 
    },
    { 
        id: '8', 
        question: 'How do I delete a card from my Wallet?', 
        answer: 'To delete a card, go to the Wallet screen and long-press (tap and hold) on the card you wish to remove. A confirmation message will appear to prevent accidental deletion. This action is permanent.' 
    },
    { 
        id: '9', 
        question: 'Can I change the currency?', 
        answer: 'Yes. Go to Profile > Settings and tap on the "Currency" option. You can select your preferred currency from the list, and all financial values in the app will update automatically.'
    },
    { 
        id: '10', 
        question: 'What does "Factory Reset" do?', 
        answer: 'This is a permanent action that will delete ALL of your transaction, budget, and card data from the app and from your device. Your user account itself will not be deleted, but all financial records will be cleared. This action cannot be undone.' 
    },
];
const FaqItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View style={styles.faqItem}>
            <TouchableOpacity style={styles.faqQuestionContainer} onPress={() => setIsOpen(!isOpen)}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#7B4AF7" />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
            )}
        </View>
    );
};

const FaqScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
            <Text style={styles.headerTitle}>FAQs</Text>
            <View style={{ width: 40 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {faqs.map(faq => <FaqItem key={faq.id} item={faq} />)}
        </ScrollView>
    </SafeAreaView>
);

export default FaqScreen;