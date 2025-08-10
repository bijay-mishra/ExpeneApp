import { Feather } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './NotificationsScreen.styles';

// Mock Data for Notifications
const todayNotifications = [
    { id: '1', type: 'avatar', image: 'https://i.pravatar.cc/150?u=smith', text: 'You received a payment of $1500 from Smith Jonson.', time: '02:23 PM' },
    { id: '2', type: 'icon', image: require('../../assets/images/mastercard.png'), text: 'Your new payment method has been added successfully.', time: '11:05 AM' },
    { id: '3', type: 'avatar', image: 'https://i.pravatar.cc/150?u=william', text: 'William James requested a payment of $400.', time: '10:16 AM', action: 'Pay' },
    { id: '4', type: 'icon', image: require('../../assets/images/discount.png'), text: 'You get $100 discount from your shopping.', time: '09:10 AM' },
];

const yesterdayNotifications = [
    { id: '5', type: 'icon', image: require('../../assets/images/upwork.png'), text: 'You received a new payment from upwork.', time: '12:26 PM' },
    { id: '6', type: 'icon', image: require('../../assets/images/alert.png'), text: 'Your monthly expense almost break the budget.', time: '10:10 AM' },
    { id: '7', type: 'icon', image: require('../../assets/images/bill.png'), text: 'Your electric bill is successfully paid.', time: '09:50 AM' },
];


const NotificationsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Today's Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today</Text>
                    {todayNotifications.map(item => (
                        <View key={item.id} style={styles.notificationItem}>
                            {/* This logic is correct for handling both types */}
                            <Image
                                source={item.type === 'avatar' ? { uri: item.image } : item.image}
                                style={styles.notificationIcon}
                            />
                            <View style={styles.notificationTextContainer}>
                                <Text style={styles.notificationText}>{item.text}</Text>
                                <Text style={styles.notificationTime}>{item.time}</Text>
                            </View>
                            {item.action && (
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionButtonText}>{item.action}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                {/* Yesterday's Notifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Yesterday</Text>
                    {yesterdayNotifications.map(item => (
                        <View key={item.id} style={styles.notificationItem}>
                            {/* --- THIS IS THE FIX --- */}
                            {/* The previous code was missing this conditional logic. */}
                            {/* We now use the SAME logic as the "Today" list. */}
                            <Image
                                source={item.type === 'avatar' ? { uri: item.image } : item.image}
                                style={styles.notificationIcon}
                            />
                            <View style={styles.notificationTextContainer}>
                                <Text style={styles.notificationText}>{item.text}</Text>
                                <Text style={styles.notificationTime}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationsScreen;