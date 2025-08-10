import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { CurrencyContext, currencySettings } from '../../context/CurrencyContext';
import styles from './CurrencyScreen.styles';

const CurrencyScreen = ({ navigation }) => {
    const { currency, setAppCurrency } = useContext(CurrencyContext);
    const currencyData = Object.values(currencySettings); // Get an array of all currency objects

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Currency</Text>
                <View style={{ width: 40 }} />
            </View>
            <FlatList
                data={currencyData}
                keyExtractor={item => item.code}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.currencyItem}
                        onPress={() => {
                            setAppCurrency(item.code);
                            navigation.goBack(); // Go back after selection
                        }}
                    >
                        <View style={styles.currencyLeft}>
                            <Image source={item.flag} style={styles.flagIcon} />
                            <Text style={styles.currencyName}>{item.name} ({item.code.toUpperCase()})</Text>
                        </View>
                        {currency.code === item.code && (
                            <Feather name="check-circle" size={24} color="#7B4AF7" />
                        )}
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default CurrencyScreen;