import { Feather } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './PrivacyPolicyScreen.styles';

const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Privacy Policy for ExpenseApp</Text>
                <Text style={styles.lastUpdated}>Last updated: August 10, 2025</Text>

                <View style={styles.section}>
                    <Text style={styles.paragraph}>
                        Welcome to ExpenseApp. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. WHAT INFORMATION DO WE COLLECT?</Text>
                    <Text style={styles.paragraph}>
                        We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the application, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, Password, and Contact Preferences.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. HOW DO WE USE YOUR INFORMATION?</Text>
                    <Text style={styles.paragraph}>
                        We use personal information collected via our application for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</Text>
                    <Text style={styles.paragraph}>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not share, sell, rent or trade any of your information with third parties for their promotional purposes.
                    </Text>
                </View>

                {/* You can continue adding more sections as needed */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>4. HOW DO WE KEEP YOUR INFORMATION SAFE?</Text>
                    <Text style={styles.paragraph}>
                        We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicyScreen;