import { Feather } from '@expo/vector-icons';
import { isToday, isYesterday } from 'date-fns';
import { useContext, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NotificationContext } from '../../context/NotificationContext';
import styles from './NotificationsScreen.styles';

const NotificationsScreen = ({ navigation }) => {
    const { notifications, markAllAsRead } = useContext(NotificationContext);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            markAllAsRead();
        });
        return unsubscribe;
    }, [navigation, markAllAsRead]);
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
                {notifications.length === 0 ? (
                    <Text style={styles.emptyText}>You have no notifications.</Text>
                ) : (
                    <>
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