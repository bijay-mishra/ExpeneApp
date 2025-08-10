import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { CurrencyContext } from '../../context/CurrencyContext'; // 1. Import CurrencyContext
import { WalletContext } from '../../context/WalletContext';
import styles from './WalletScreen.styles';

// --- Updated AddCardModal Component ---
const AddCardModal = ({ isVisible, onClose, onAddCard }) => {
    const { user } = useContext(AuthContext);
    const { currency } = useContext(CurrencyContext); // Get currency for the symbol
    const [balance, setBalance] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (text) => { const cleaned = text.replace(/\D/g, ''); const formatted = cleaned.match(/.{1,4}/g); setCardNumber(formatted ? formatted.join(' ') : ''); };
    
    const handleAdd = () => {
        if (!balance || cardNumber.replace(/\s/g, '').length !== 16) { Alert.alert('Invalid Input', 'Please enter a valid balance and a 16-digit card number.'); return; }
        onAddCard({ balance, number: cardNumber, holder: user.name });
        setBalance(''); setCardNumber('');
    };

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose}>
                <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add New Card</Text>
                    <Text style={styles.inputLabel}>Card Holder</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={user?.name} editable={false} />
                    <Text style={styles.inputLabel}>Card Number</Text>
                    <TextInput style={styles.input} placeholder="0000 0000 0000 0000" keyboardType="numeric" value={cardNumber} onChangeText={handleCardNumberChange} maxLength={19} />
                    
                    {/* --- START: UPDATED BALANCE INPUT --- */}
                    <Text style={styles.inputLabel}>Balance</Text>
                    <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={balance}
                            onChangeText={setBalance}
                        />
                    </View>
                    {/* --- END: UPDATED BALANCE INPUT --- */}

                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}><Text style={styles.addButtonText}>Add Card</Text></TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

// --- Updated CreditCard Component ---
const CreditCard = ({ card }) => {
    const { formatCurrency } = useContext(CurrencyContext); // Get the formatter
    return (
        <LinearGradient colors={card.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
            <View style={styles.cardHeader}>
                <FontAwesome name="cc-visa" size={40} color="white" />
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    {/* Use formatCurrency to display the balance */}
                    <Text style={styles.balanceAmount}>{formatCurrency(parseFloat(card.balance))}</Text>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.cardNumber}>{card.number}</Text>
                <Text style={styles.cardHolderName}>{card.holder}</Text>
            </View>
        </LinearGradient>
    );
};


const WalletScreen = ({ navigation }) => {
    const { cards, addCard, deleteCard } = useContext(WalletContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddCard = (newCardData) => {
        addCard(newCardData);
        setIsModalVisible(false);
    };

    const handleDeletePress = (cardId) => {
        Alert.alert( "Delete Card", "Are you sure you want to permanently delete this card?", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => deleteCard(cardId) }] );
    };

    return (
        <SafeAreaView style={styles.container}>
            <AddCardModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAddCard={handleAddCard} />
            <View style={styles.header}><TouchableOpacity style={styles.headerIconContainer}><MaterialCommunityIcons name="view-grid" size={28} color="black" /></TouchableOpacity><Text style={styles.headerTitle}>My Card</Text><TouchableOpacity style={styles.headerIconContainer} onPress={() => setIsModalVisible(true)}><Feather name="plus" size={28} color="black" /></TouchableOpacity></View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {cards.length > 0 ? (
                    cards.map(card => (
                        <TouchableOpacity key={card.id} onLongPress={() => handleDeletePress(card.id)} activeOpacity={0.8} >
                            <CreditCard card={card} />
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16}}>No cards yet. Tap '+' to add one!</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default WalletScreen;