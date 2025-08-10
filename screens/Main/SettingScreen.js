import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext'; // 1. Import the CurrencyContext
import styles from './SettingScreen.styles';

// --- Data for the list of settings options ---
const menuItems = [
    { id: '1', icon: 'credit-card-outline', color: '#42A5F5', text: 'Payment' },
    { id: '2', icon: 'clock-outline', color: '#FFCA28', text: 'Activity' },
    { id: '3', icon: 'email-outline', color: '#9E9E9E', text: 'Message Center' },
    { id: '4', icon: 'bell-ring-outline', color: '#26A69A', text: 'Reminder' },
    // Changed 'Language' to 'Currency' to match the new feature
    { id: '5', icon: 'currency-usd', color: '#EF5350', text: 'Currency', special: 'currency' },
    { id: '6', icon: 'help-circle-outline', color: '#3D5AFE', text: 'FAQs' },
    { id: '7', icon: 'send-outline', color: '#66BB6A', text: 'Send Feedback' },
    { id: '8', icon: 'alert-outline', color: '#F44336', text: 'Report a Problem' },
];

// --- A helper object to map currency codes to flag images for dynamic display ---
const flagImages = {
    usd: require('../../assets/images/us-flag.png'),
    npr: require('../../assets/images/nepal-flag.png'),
    inr: require('../../assets/images/india-flag.png'),
    eur: require('../../assets/images/italy-flag.png'),
};

const SettingsScreen = ({ navigation }) => {
    // Get all necessary state and functions from our global contexts
    const { isBiometricEnabled, enableBiometrics, disableBiometrics } = useContext(AuthContext);
    const { factoryReset } = useContext(BudgetContext);
    const { currency } = useContext(CurrencyContext); // 2. Get the current currency object

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // Check if the device has biometric hardware when the screen loads
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    }, []);

    const handleBiometricToggle = (value) => {
        if (value) { enableBiometrics(); } else { disableBiometrics(); }
    };

    const handleFactoryReset = () => {
        Alert.alert( "Factory Reset", "Are you sure? All transaction data will be permanently deleted.", [ { text: "Cancel", style: "cancel" }, { text: "OK", onPress: () => factoryReset(), style: 'destructive' } ]);
    };

    // --- Updated handler to navigate to all the new screens ---
    const handleMenuPress = (item) => {
        if (item.special === 'currency') {
            navigation.navigate('Currency');
        } else if (item.text === 'FAQs') {
            navigation.navigate('FAQs');
        } else if (item.text === 'Send Feedback') {
            navigation.navigate('Feedback', { isReport: false });
        } else if (item.text === 'Report a Problem') {
            navigation.navigate('Feedback', { isReport: true });
        } else {
            Alert.alert("Coming Soon", `${item.text} screen is under development.`);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Biometric Login Section */}
                {isBiometricSupported && (
                    <View style={styles.menuContainer}>
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIconContainer, { backgroundColor: '#00C853' }]}><MaterialCommunityIcons name="fingerprint" size={22} color="white" /></View>
                                <Text style={styles.menuItemText}>Biometric Login</Text>
                            </View>
                            <Switch trackColor={{ false: "#E5E7EB", true: "#81b0ff" }} thumbColor={isBiometricEnabled ? "#7B4AF7" : "#f4f3f4"} onValueChange={handleBiometricToggle} value={isBiometricEnabled} />
                        </View>
                    </View>
                )}

                {/* Other Menu Items Section */}
                <View style={styles.menuContainer}>
                    {menuItems.map(item => (
                        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}><MaterialCommunityIcons name={item.icon} size={22} color="white" /></View>
                                <Text style={styles.menuItemText}>{item.text}</Text>
                            </View>

                            <View style={styles.languageContainer}>
                                {/* --- 3. DYNAMICALLY DISPLAY THE FLAG --- */}
                                {item.special === 'currency' && (
                                    <Image source={flagImages[currency.code]} style={styles.flagImage} />
                                )}
                                <Feather name="chevron-right" size={24} color="#888" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Factory Reset Button */}
                <TouchableOpacity style={styles.resetButton} onPress={handleFactoryReset}>
                    <Text style={styles.resetButtonText}>Factory Reset</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;