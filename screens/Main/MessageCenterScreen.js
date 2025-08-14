import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './MessageCenterScreen.styles';

const messages = [
    { id: '1', title: 'Welcome to ExpenseApp!', preview: 'We are excited to have you on board. Start by adding your first transaction...', time: 'Aug 9', isRead: false },
    { id: '2', title: 'New Feature: Biometric Login', preview: 'You can now secure your account with your fingerprint or Face ID. Enable it in Settings.', time: 'Aug 8', isRead: true },
    { id: '3', title: 'Weekly Report is Ready', preview: 'Your financial summary for the last week is available. Tap to view...', time: 'Aug 7', isRead: true },
];

const MessageCenterScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.messageItem}>
            <View style={[styles.iconContainer, !item.isRead && styles.unreadIcon]}>
                <MaterialCommunityIcons name={item.isRead ? 'email-open-outline' : 'email-outline'} size={24} color={item.isRead ? '#888' : '#7B4AF7'} />
            </View>
            <View style={styles.messageContent}>
                <Text style={[styles.messageTitle, !item.isRead && styles.unreadTitle]}>{item.title}</Text>
                <Text style={styles.messagePreview}>{item.preview}</Text>
            </View>
            <Text style={styles.messageTime}>{item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Message Center</Text>
                <View style={{ width: 40 }} />
            </View>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Your inbox is empty.</Text>}
            />
        </SafeAreaView>
    );
};

export default MessageCenterScreen;