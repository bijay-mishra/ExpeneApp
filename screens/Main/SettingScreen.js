import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react'; // Import useContext
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext'; // Import BudgetContext
import styles from './SettingScreen.styles';

// --- Mock Data for Settings Menu Items ---
const menuItems = [
    { id: '1', icon: 'credit-card-outline', color: '#42A5F5', text: 'Payment' },
    { id: '2', icon: 'clock-outline', color: '#FFCA28', text: 'Activity' },
    { id: '3', icon: 'email-outline', color: '#9E9E9E', text: 'Message Center' },
    { id: '4', icon: 'bell-ring-outline', color: '#26A69A', text: 'Reminder' },
    { id: '5', icon: 'web', color: '#EF5350', text: 'Language', special: 'language' },
    { id: '6', icon: 'help-circle-outline', color: '#3D5AFE', text: 'FAQs' },
    { id: '7', icon: 'send-outline', color: '#66BB6A', text: 'Send Feedback' },
    { id: '8', icon: 'alert-outline', color: '#F44336', text: 'Report a Problem' },
];

const SettingsScreen = ({ navigation }) => {
    // Get the factoryReset function from the context
    const { factoryReset } = useContext(BudgetContext);

    const handleFactoryReset = () => {
        // Show a confirmation alert to the user
        Alert.alert(
            "Factory Reset",
            "Are you sure? All transaction data will be permanently deleted.",
            [
                // The "Cancel" button
                {
                    text: "Cancel",
                    onPress: () => console.log("Reset canceled"),
                    style: "cancel"
                },
                // The "OK" button
                { 
                    text: "OK", 
                    onPress: () => factoryReset(),
                    style: 'destructive' // This makes the text red on iOS
                }
            ]
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menuContainer}>
                    {menuItems.map(item => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuItemLeft}><View style={[styles.menuIconContainer, { backgroundColor: item.color }]}><MaterialCommunityIcons name={item.icon} size={22} color="white" /></View><Text style={styles.menuItemText}>{item.text}</Text></View>
                            {item.special === 'language' ? ( <View style={styles.languageContainer}><Image source={require('../../assets/images/us-flag.png')} style={styles.flagImage} /><Feather name="chevron-right" size={24} color="#888" /></View> ) : ( <Feather name="chevron-right" size={24} color="#888" /> )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- START: NEW FACTORY RESET BUTTON --- */}
                <TouchableOpacity style={styles.resetButton} onPress={handleFactoryReset}>
                    <Text style={styles.resetButtonText}>Factory Reset</Text>
                </TouchableOpacity>
                {/* --- END: NEW FACTORY RESET BUTTON --- */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;