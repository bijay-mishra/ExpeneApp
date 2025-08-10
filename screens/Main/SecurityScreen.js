import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from './SecurityScreen.styles';

const SecurityScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Security</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.contentContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={user?.name} editable={false} />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email / Phone Number</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={user?.email} editable={false} />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={"••••••••••••"} editable={false} secureTextEntry={true} />
                    
                    {/* Only show "Change Password" for non-Google users */}
                    {!user?.isGoogleUser && (
                        <TouchableOpacity 
                            style={styles.changePasswordButton}
                            onPress={() => navigation.navigate('ChangePassword')}
                        >
                            <Text style={styles.changePasswordText}>Change Password</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SecurityScreen;