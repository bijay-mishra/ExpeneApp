import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './QuickMenuScreen.styles';

const menuItems = [
    { id: '1', title: 'Profile', icon: 'account-circle-outline', color: '#7B4AF7', navigateTo: 'Profile' },
    { id: '2', title: 'My Wallet', icon: 'wallet-outline', color: '#26A69A', navigateTo: 'Wallet' },
    { id: '3', title: 'Settings', icon: 'cog-outline', color: '#546E7A', navigateTo: 'Settings' },
    { id: '4', title: 'Notifications', icon: 'bell-ring-outline', color: '#EF5350', navigateTo: 'Notifications' },
];

const QuickMenuScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
                navigation.goBack();
                navigation.navigate(item.navigateTo);
            }}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <MaterialCommunityIcons name={item.icon} size={32} color="white" />
            </View>
            <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Feather name="x" size={28} color="black" />
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} 
                contentContainerStyle={styles.gridContainer}
            />
        </SafeAreaView>
    );
};

export default QuickMenuScreen;