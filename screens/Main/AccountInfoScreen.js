import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './AccountInfoScreen.styles';

const AccountInfoScreen = ({ navigation }) => {
    const { user, updateUserInfo } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const handleSave = () => {
        if (name.trim() === '') {
            Alert.alert("Invalid Name", "Name cannot be empty.");
            return;
        }
        updateUserInfo(name);
        setIsEditing(false);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Info</Text>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={{ width: 50, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#7B4AF7', fontSize: 16, fontWeight: '600' }}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentContainer}>
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
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        value={user?.email}
                        editable={false}
                    />
                </View>
            </ScrollView>
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