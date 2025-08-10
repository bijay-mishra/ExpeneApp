import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { createContext, useEffect, useState } from 'react';

const NOTIFICATIONS_KEY = '@ExpenseApp_Notifications';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    // --- NEW: State to track if there are unread notifications ---
    const [hasUnread, setHasUnread] = useState(false);

    useEffect(() => {
        const loadNotifications = async () => {
            const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
            if (stored) {
                const loadedNotifs = JSON.parse(stored);
                setNotifications(loadedNotifs);
                // Check if any loaded notifications are unread
                if (loadedNotifs.some(n => n.isUnread)) {
                    setHasUnread(true);
                }
            }
        };
        loadNotifications();
    }, []);

    const saveNotifications = async (notifs) => {
        await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
    };

    const addNotification = (newNotification) => {
        const notificationWithDetails = {
            id: Date.now().toString(),
            time: format(new Date(), 'hh:mm a'), // e.g., 03:30 PM
            isUnread: true, // All new notifications are unread
            ...newNotification,
        };

        const updatedNotifications = [notificationWithDetails, ...notifications];
        setNotifications(updatedNotifications);
        setHasUnread(true); // There is now at least one unread notification
        saveNotifications(updatedNotifications);
    };

    // --- NEW: Function to mark all notifications as read ---
    const markAllAsRead = () => {
        if (!hasUnread) return; // No need to update if everything is already read

        const readNotifications = notifications.map(n => ({ ...n, isUnread: false }));
        setNotifications(readNotifications);
        setHasUnread(false); // All notifications are now read
        saveNotifications(readNotifications);
    };

    const value = {
        notifications,
        hasUnread,
        addNotification,
        markAllAsRead,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};