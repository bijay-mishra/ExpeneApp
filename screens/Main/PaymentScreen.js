import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './PaymentScreen.styles';

const paymentMethods = [
    { id: '1', type: 'Mastercard', number: '•••• 1234', icon: require('../../assets/images/mastercard.png') },
    { id: '2', type: 'Visa', number: '•••• 5678', icon: require('../../assets/images/visa.png') },
    { id: '3', type: 'Bank Account', number: '•••• 9012', icon: require('../../assets/images/bank.png') },
];
const PaymentScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Feather name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {paymentMethods.map(item => (
                    <View key={item.id} style={styles.methodItem}>
                        <Image source={item.icon} style={styles.methodIcon} />
                        <View style={styles.methodDetails}>
                            <Text style={styles.methodType}>{item.type}</Text>
                            <Text style={styles.methodNumber}>{item.number}</Text>
                        </View>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="#888" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default PaymentScreen;