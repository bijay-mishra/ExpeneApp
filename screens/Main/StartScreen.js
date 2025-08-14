import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './StartScreen.styles';

const ONBOARDING_KEY = '@ExpenseApp_HasSeenOnboarding';
const StartScreen = ({ navigation }) => {
    const handleStart = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
            navigation.replace('Auth'); 
        } catch (e) {
            console.error("Failed to save onboarding status", e);
            navigation.replace('Auth');
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/wallet.png')} style={styles.walletImage} />
            </View>
            <Text style={styles.title}>Save your money with Expense Tracker</Text>
            <Text style={styles.subtitle}>Save money! The more your money works for you, the less you have to work for money.</Text>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Text style={styles.buttonText}>Let's Start</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default StartScreen;