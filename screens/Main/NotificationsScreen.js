import { Feather } from '@expo/vector-icons';
import { isToday, isYesterday } from 'date-fns';
import { useContext, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NotificationContext } from '../../context/NotificationContext';
import styles from './NotificationsScreen.styles';

const NotificationsScreen = ({ navigation }) => {
    // 1. Get the real notifications and functions from the context
    const { notifications, markAllAsRead } = useContext(NotificationContext);

    // 2. This effect runs every time the user focuses on this screen
    // It calls the function to mark all notifications as read, which will make the red dot disappear.
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            markAllAsRead();
        });
        // Cleanup the listener when the component is unmounted
        return unsubscribe;
    }, [navigation, markAllAsRead]);

    // 3. Dynamically group the real notifications by date
    // The `id` is a timestamp from Date.now(), so we can convert it to a Date object.
    const todayNotifications = notifications.filter(n => isToday(new Date(parseInt(n.id))));
    const yesterdayNotifications = notifications.filter(n => isYesterday(new Date(parseInt(n.id))));
    const olderNotifications = notifications.filter(n => !isToday(new Date(parseInt(n.id))) && !isYesterday(new Date(parseInt(n.id))));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 4. Handle the case where there are no notifications at all */}
                {notifications.length === 0 ? (
                    <Text style={styles.emptyText}>You have no notifications.</Text>
                ) : (
                    <>
                        {/* Render "Today" section only if there are notifications for today */}
                        {todayNotifications.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Today</Text>
                                {todayNotifications.map(item => (
                                    <View key={item.id} style={styles.notificationItem}>
                                        <Image source={item.image} style={styles.notificationIcon} />
                                        <View style={styles.notificationTextContainer}>
                                            <Text style={styles.notificationText}>{item.text}</Text>
                                            <Text style={styles.notificationTime}>{item.time}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Render "Yesterday" section */}
                        {yesterdayNotifications.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Yesterday</Text>
                                {yesterdayNotifications.map(item => (
                                    <View key={item.id} style={styles.notificationItem}>
                                        <Image source={item.image} style={styles.notificationIcon} />
                                        <View style={styles.notificationTextContainer}>
                                            <Text style={styles.notificationText}>{item.text}</Text>
                                            <Text style={styles.notificationTime}>{item.time}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Render "Older" section */}
                        {olderNotifications.length > 0 && (
                             <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Older</Text>
                                {olderNotifications.map(item => (
                                    <View key={item.id} style={styles.notificationItem}>
                                        <Image source={item.image} style={styles.notificationIcon} />
                                        <View style={styles.notificationTextContainer}>
                                            <Text style={styles.notificationText}>{item.text}</Text>
                                            <Text style={styles.notificationTime}>{item.time}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationsScreen;