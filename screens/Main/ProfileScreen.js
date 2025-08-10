import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './ProfileScreen.styles';

// Mock Data for Menu Items
const menuItems = [
    { id: '1', icon: 'account-outline', color: '#7B4AF7', text: 'Account Info' },
    { id: '2', icon: 'shield-key-outline', color: '#4CAF50', text: 'Security Code' },
    { id: '3', icon: 'lock-outline', color: '#1E88E5', text: 'Privacy Policy' },
    { id: '4', icon: 'cog-outline', color: '#546E7A', text: 'Settings' },
    { id: '5', icon: 'logout', color: '#F44336', text: 'Logout' },
];

const ProfileScreen = ({ navigation }) => {
    const { user, signOut, updateProfileImage } = useContext(AuthContext);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to allow access to your photos to update your profile picture.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            updateProfileImage(imageUri);
        }
    };

    // --- START: THIS IS THE CORRECTED FUNCTION ---
    const handleMenuPress = (itemId) => {
        if (itemId === '4') {
            navigation.navigate('Settings');
        } else if (itemId === '5') {
            // Show the confirmation alert when the "Logout" item is pressed
            Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "Logout",
                        style: "destructive",
                        // If the user confirms, then call the signOut function
                        onPress: () => signOut()
                    }
                ]
            );
        }
    };
    // --- END: THIS IS THE CORRECTED FUNCTION ---


    const imageSource = user?.profileImage
        ? { uri: `${user.profileImage}?v=${new Date()}` } 
        : require('../../assets/images/profile.png');
        
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIconContainer}><MaterialCommunityIcons name="view-grid" size={28} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
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
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                                    <MaterialCommunityIcons name={item.icon} size={22} color="white" />
                                </View>
                                <Text style={styles.menuItemText}>{item.text}</Text>
                            </View>
                            <Feather name="chevron-right" size={24} color="#888" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;