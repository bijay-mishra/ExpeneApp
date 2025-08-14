import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './ReminderScreen.styles';

const ReminderScreen = ({ navigation }) => {
    const [billReminders, setBillReminders] = useState(true);
    const [promoReminders, setPromoReminders] = useState(false);
    const [budgetAlerts, setBudgetAlerts] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Reminders</Text>
                <View style={{ width: 40 }} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Upcoming Bill Reminders</Text>
                        <Text style={styles.settingDescription}>Get notified 3 days before a bill is due.</Text>
                    </View>
                    <Switch value={billReminders} onValueChange={setBillReminders} ios_backgroundColor="#E5E7EB" trackColor={{ false: "#E5E7EB", true: "#81b0ff" }} thumbColor={billReminders ? "#7B4AF7" : "#f4f3f4"} />
                </View>
                <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Budget Alerts</Text>
                        <Text style={styles.settingDescription}>Receive an alert when you are close to your monthly spending limit.</Text>
                    </View>
                    <Switch value={budgetAlerts} onValueChange={setBudgetAlerts} ios_backgroundColor="#E5E7EB" trackColor={{ false: "#E5E7EB", true: "#81b0ff" }} thumbColor={budgetAlerts ? "#7B4AF7" : "#f4f3f4"} />
                </View>
                <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                        <Text style={styles.settingTitle}>Promotions & Offers</Text>
                        <Text style={styles.settingDescription}>Get notified about special offers and new features.</Text>
                    </View>
                    <Switch value={promoReminders} onValueChange={setPromoReminders} ios_backgroundColor="#E5E7EB" trackColor={{ false: "#E5E7EB", true: "#81b0ff" }} thumbColor={promoReminders ? "#7B4AF7" : "#f4f3f4"} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ReminderScreen;