import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { useContext, useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext'; 
import styles from './SettingScreen.styles';

const menuItems = [
    { id: '1', icon: 'credit-card-outline', color: '#42A5F5', text: 'Payment' },
    { id: '2', icon: 'clock-outline', color: '#FFCA28', text: 'Activity' },
    { id: '3', icon: 'email-outline', color: '#9E9E9E', text: 'Message Center' },
    { id: '4', icon: 'bell-ring-outline', color: '#26A69A', text: 'Reminder' },
    { id: '5', icon: 'currency-usd', color: '#EF5350', text: 'Currency', special: 'currency' },
    { id: '6', icon: 'help-circle-outline', color: '#3D5AFE', text: 'FAQs' },
    { id: '7', icon: 'send-outline', color: '#66BB6A', text: 'Send Feedback' },
    { id: '8', icon: 'alert-outline', color: '#F44336', text: 'Report a Problem' },
];
const flagImages = {
    usd: require('../../assets/images/us-flag.png'),
    npr: require('../../assets/images/nepal-flag.png'),
    inr: require('../../assets/images/india-flag.png'),
    eur: require('../../assets/images/italy-flag.png'),
};

const SettingsScreen = ({ navigation }) => {
    const { isBiometricEnabled, enableBiometrics, disableBiometrics } = useContext(AuthContext);
    const { factoryReset } = useContext(BudgetContext);
    const { currency } = useContext(CurrencyContext); 
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
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
        Alert.alert("Factory Reset", "Are you sure? All transaction data will be permanently deleted.", [{ text: "Cancel", style: "cancel" }, { text: "OK", onPress: () => factoryReset(), style: 'destructive' }]);
    };
    const handleMenuPress = (item) => {
        if (item.special === 'currency') {
            navigation.navigate('Currency');
        } else if (item.text === 'FAQs') {
            navigation.navigate('FAQs');
        } else if (item.text === 'Send Feedback') {
            navigation.navigate('Feedback', { isReport: false });
        } else if (item.text === 'Report a Problem') {
            navigation.navigate('Feedback', { isReport: true });
        }
        else if (item.text === 'Payment') navigation.navigate('Payment');
        else if (item.text === 'Activity') navigation.navigate('Activity');
        else if (item.text === 'Message Center') navigation.navigate('MessageCenter');
        else if (item.text === 'Reminder') navigation.navigate('Reminder');
        else {
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
                <View style={styles.menuContainer}>
                    {menuItems.map(item => (
                        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}><MaterialCommunityIcons name={item.icon} size={22} color="white" /></View>
                                <Text style={styles.menuItemText}>{item.text}</Text>
                            </View>

                            <View style={styles.languageContainer}>
                                {item.special === 'currency' && (
                                    <Image source={flagImages[currency.code]} style={styles.flagImage} />
                                )}
                                <Feather name="chevron-right" size={24} color="#888" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={handleFactoryReset}>
                    <Text style={styles.resetButtonText}>Factory Reset</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingsScreen;