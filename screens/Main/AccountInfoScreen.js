import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './AccountInfoScreen.styles';

const AccountInfoScreen = ({ navigation }) => {
    // Get the current user and the update function from the context
    const { user, updateUserInfo } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    // Initialize the name state with the user's current name
    const [name, setName] = useState(user?.name || '');

    const handleSave = () => {
        if (name.trim() === '') {
            Alert.alert("Invalid Name", "Name cannot be empty.");
            return;
        }
        // Call the context function to update the user's name
        updateUserInfo(name);
        // Exit editing mode
        setIsEditing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Info</Text>
                {/* The Edit/Done button */}
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={{ width: 50, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#7B4AF7', fontSize: 16, fontWeight: '600' }}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentContainer}>
                {/* Name Field */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    ) : (
                        <Text style={styles.value}>{user?.name}</Text>
                    )}
                </View>

                {/* Email Field (Non-Editable) */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={user?.email}
                        editable={false}
                    />
                </View>
            </ScrollView>

            {/* Show the Save button only when in editing mode */}
            {isEditing && (
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default AccountInfoScreen;