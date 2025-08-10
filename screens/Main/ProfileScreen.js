import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { AuthContext } from '../../context/AuthContext';
import styles from './ProfileScreen.styles';

// Data for the static list of menu items
const menuItems = [
    { id: '1', icon: 'account-outline', color: '#7B4AF7', text: 'Account Info' },
    { id: '2', icon: 'shield-key-outline', color: '#4CAF50', text: 'Security' },
    { id: '3', icon: 'lock-outline', color: '#1E88E5', text: 'Privacy Policy' },
    { id: '4', icon: 'cog-outline', color: '#546E7A', text: 'Settings' },
    { id: '5', icon: 'logout', color: '#F44336', text: 'Logout' },
];

const ProfileScreen = ({ navigation }) => {
    // Get all necessary data and functions from the context
    const { user, signOut, updateProfileImage, allAccounts, switchAccount, addAccount } = useContext(AuthContext);

    const pickImage = async () => { /* ... (no changes) ... */ };

    const handleMenuPress = (itemId) => {
        if (itemId === '1') { navigation.navigate('AccountInfo'); } 
        else if (itemId === '2') { navigation.navigate('Security'); } 
        else if (itemId === '3') { navigation.navigate('PrivacyPolicy'); } 
        else if (itemId === '4') { navigation.navigate('Settings'); } 
        else if (itemId === '5') {
            Alert.alert("Confirm Logout", "Are you sure you want to log out?", [ { text: "Cancel", style: "cancel" }, { text: "Logout", style: "destructive", onPress: () => signOut() } ]);
        }
    };
    
    const imageSource = user?.profileImage ? { uri: `${user.profileImage}?v=${new Date()}` } : require('../../assets/images/profile.png');
        
    return (
        <SafeAreaView style={styles.container}>
            {/* --- UPDATED HEADER WITH ACCOUNT SWITCHER --- */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIconContainer}><MaterialCommunityIcons name="view-grid" size={28} color="black" /></TouchableOpacity>

                <Menu>
                    <MenuTrigger style={styles.menuTrigger}>
                        <Text style={styles.headerTitle}>{user?.name || 'Profile'}</Text>
                        <Feather name="chevron-down" size={24} color="black" style={{ marginLeft: 5 }} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptionsContainer }}>
                        {allAccounts.map(account => (
                            <MenuOption key={account.email} onSelect={() => switchAccount(account.email)} style={styles.menuOption}>
                                <Text style={styles.menuOptionText}>{account.name}</Text>
                                {user?.email === account.email && <Feather name="check" size={20} color="#7B4AF7" />}
                            </MenuOption>
                        ))}
                        <View style={styles.divider} />
                        <MenuOption onSelect={() => addAccount()} style={styles.menuOption}>
                            <Feather name="plus-circle" size={20} color="#333" />
                            <Text style={[styles.menuOptionText, { marginLeft: 10 }]}>Add Account</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>

                <TouchableOpacity style={styles.headerIconContainer}><Feather name="edit" size={24} color="black" /></TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image key={user?.profileImage} source={imageSource} style={styles.profileImage} />
                        <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                            <Feather name="edit-2" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
                    <Text style={styles.profileEmail}>{user?.email || 'user@email.com'}</Text>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map(item => (
                        <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.id)}>
                            <View style={styles.menuItemLeft}><View style={[styles.menuIconContainer, { backgroundColor: item.color }]}><MaterialCommunityIcons name={item.icon} size={22} color="white" /></View><Text style={styles.menuItemText}>{item.text}</Text></View>
                            <Feather name="chevron-right" size={24} color="#888" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;