import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AuthContext } from '../../context/AuthContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { WalletContext } from '../../context/WalletContext';
import styles from './WalletScreen.styles';

// --- DATA & LOGOS ---
const cardTypes = [ { label: 'Visa', value: 'visa' }, { label: 'Mastercard', value: 'mastercard' }, { label: 'Dollar Card', value: 'dollar' } ];
const nepalBanks = [ { label: 'Nabil Bank', value: 'nabil' }, { label: 'NIC Asia Bank', value: 'nic' }, { label: 'Global IME Bank', value: 'gime' }, { label: 'Rastriya Banijya Bank', value: 'rbb' }, { label: 'Nepal Bank Limited', value: 'nbl' }, { label: 'Prabhu Bank', value: 'prabhu' }, { label: 'Siddhartha Bank', value: 'sbl' }, { label: 'Kumari Bank', value: 'kumari' }, { label: 'Laxmi Sunrise Bank', value: 'laxmi' }, { label: 'Himalayan Bank', value: 'himalayan' }, { label: 'Nepal Investment Mega Bank', value: 'nimb' }, { label: 'Sanima Bank', value: 'sanima' }, { label: 'Citizens Bank', value: 'citizens' }, { label: 'Everest Bank', value: 'everest' }, { label: 'NMB Bank', value: 'nmb' } ];
const nepalWallets = [ { label: 'eSewa', value: 'esewa' }, { label: 'Khalti', value: 'khalti' }, { label: 'Namaste Pay', value: 'namastepay' }, { label: 'IME Pay', value: 'imepay' } ];
// NOTE: You must add these logo images to your assets/images folder for them to appear
const cardLogos = { visa: require('../../assets/images/visa.png'), mastercard: require('../../assets/images/mastercard.png'), dollar: require('../../assets/images/dollar-card-logo.png'), };
const bankLogos = { nabil: require('../../assets/images/nabil.png'), nic: require('../../assets/images/nic.png'), };
const walletLogos = { esewa: require('../../assets/images/esewa-logo.png'), khalti: require('../../assets/images/khalti.png'), };


// --- MODAL COMPONENTS ---
const AddCardModal = ({ isVisible, onClose, onAdd, existingAccounts }) => {
    const { user } = useContext(AuthContext);
    const { currency } = useContext(CurrencyContext);
    const [balance, setBalance] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('visa');
    const handleCardNumberChange = (text) => { const cleaned = text.replace(/\D/g, ''); const formatted = cleaned.match(/.{1,4}/g); setCardNumber(formatted ? formatted.join(' ') : ''); };
    const handleAdd = () => {
        if (!balance || cardNumber.replace(/\s/g, '').length !== 16) { Alert.alert('Invalid Input', 'Please fill all required fields.'); return; }
        const alreadyExists = existingAccounts.some(acc => acc.type === 'card' && acc.number === cardNumber);
        if (alreadyExists) { Alert.alert('Duplicate Card', 'You have already added a card with this number.'); return; }
        const selectedCard = cardTypes.find(c => c.value === cardType);
        onAdd({ type: 'card', name: selectedCard.label, balance, number: cardNumber, holder: user.name, cardType });
        onClose();
    };
    return ( <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}><View style={styles.modalBackdrop}><View style={styles.modalContainer}><View style={styles.modalHeader}><Text style={styles.modalTitle}>Add New Card</Text><TouchableOpacity style={styles.closeButton} onPress={onClose}><Feather name="x" size={24} color="#888" /></TouchableOpacity></View><Text style={styles.inputLabel}>Card Holder</Text><TextInput style={[styles.input, styles.disabledInput]} value={user?.name} editable={false} /><Text style={styles.inputLabel}>Card Type</Text><Dropdown style={styles.dropdown} data={cardTypes} labelField="label" valueField="value" value={cardType} onChange={item => setCardType(item.value)} /><Text style={styles.inputLabel}>Card Number</Text><TextInput style={styles.input} placeholder="0000 0000 0000 0000" keyboardType="numeric" value={cardNumber} onChangeText={handleCardNumberChange} maxLength={19} /><Text style={styles.inputLabel}>Balance</Text><View style={styles.amountInputContainer}><Text style={styles.currencySymbol}>{currency.symbol}</Text><TextInput style={styles.amountInput} placeholder="0.00" keyboardType="numeric" value={balance} onChangeText={setBalance} maxLength={8}/></View><TouchableOpacity style={styles.addButton} onPress={handleAdd}><Text style={styles.addButtonText}>Add Card</Text></TouchableOpacity></View></View></Modal> );
};

const AddBankModal = ({ isVisible, onClose, onAdd, existingAccounts }) => {
    const { user } = useContext(AuthContext);
    const { currency } = useContext(CurrencyContext);
    const [bankValue, setBankValue] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setBalance] = useState('');
    const handleAdd = () => {
        if (!balance || !accountNumber || !bankValue) { Alert.alert('Invalid Input', 'Please fill all fields.'); return; }
        const alreadyExists = existingAccounts.some(acc => acc.type === 'bank' && acc.bankNameValue === bankValue);
        if (alreadyExists) { Alert.alert('Duplicate Bank', 'You have already added this bank account.'); return; }
        const selectedBank = nepalBanks.find(b => b.value === bankValue);
        onAdd({ type: 'bank', name: selectedBank.label, balance, accountNumber, holder: user.name, bankNameValue: bankValue });
        onClose();
    };
    return ( <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}><View style={styles.modalBackdrop}><View style={styles.modalContainer}><View style={styles.modalHeader}><Text style={styles.modalTitle}>Add Bank Account</Text><TouchableOpacity style={styles.closeButton} onPress={onClose}><Feather name="x" size={24} color="#888" /></TouchableOpacity></View><Text style={styles.inputLabel}>Account Holder</Text><TextInput style={[styles.input, styles.disabledInput]} value={user?.name} editable={false} /><Text style={styles.inputLabel}>Bank Name</Text><Dropdown style={styles.dropdown} data={nepalBanks} labelField="label" valueField="value" value={bankValue} onChange={item => setBankValue(item.value)} placeholder="Select a bank" /><Text style={styles.inputLabel}>Account Number</Text><TextInput style={styles.input} keyboardType="numeric" value={accountNumber} onChangeText={setAccountNumber} maxLength={16} /><Text style={styles.inputLabel }>Balance</Text><View style={styles.amountInputContainer}><Text style={styles.currencySymbol}>{currency.symbol}</Text><TextInput style={styles.amountInput} placeholder="0.00" keyboardType="numeric" value={balance} onChangeText={setBalance} maxLength={8} /></View><TouchableOpacity style={styles.addButton} onPress={handleAdd}><Text style={styles.addButtonText}>Add Bank Account</Text></TouchableOpacity></View></View></Modal> );
};

const AddWalletModal = ({ isVisible, onClose, onAdd, existingAccounts }) => {
    const { user } = useContext(AuthContext);
    const { currency } = useContext(CurrencyContext);
    const [walletValue, setWalletValue] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [balance, setBalance] = useState('');
    const handleAdd = () => {
        if (!balance || !walletValue || !phoneNumber) { Alert.alert('Invalid Input', 'Please fill all fields.'); return; }
        const alreadyExists = existingAccounts.some(acc => acc.type === 'wallet' && acc.walletTypeValue === walletValue);
        if (alreadyExists) { Alert.alert('Duplicate Wallet', 'You have already added this wallet provider.'); return; }
        const selectedWallet = nepalWallets.find(w => w.value === walletValue);
        onAdd({ type: 'wallet', name: selectedWallet.label, balance, phone: phoneNumber, holder: user.name, walletTypeValue: walletValue });
        onClose();
    };
    return ( <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}><View style={styles.modalBackdrop}><View style={styles.modalContainer}><View style={styles.modalHeader}><Text style={styles.modalTitle}>Add Wallet</Text><TouchableOpacity style={styles.closeButton} onPress={onClose}><Feather name="x" size={24} color="#888" /></TouchableOpacity></View><Text style={styles.inputLabel}>Wallet Holder</Text><TextInput style={[styles.input, styles.disabledInput]} value={user?.name} editable={false} /><Text style={styles.inputLabel}>Wallet Provider</Text><Dropdown style={styles.dropdown} data={nepalWallets} labelField="label" valueField="value" value={walletValue} onChange={item => setWalletValue(item.value)} placeholder="Select a wallet" /><Text style={styles.inputLabel}>Phone Number / ID</Text><TextInput style={styles.input} placeholder="Enter wallet phone number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} maxLength={10}/><Text style={styles.inputLabel}>Balance</Text><View style={styles.amountInputContainer}><Text style={styles.currencySymbol}>{currency.symbol}</Text><TextInput style={styles.amountInput} placeholder="0.00" keyboardType="numeric" value={balance} onChangeText={setBalance} maxLength={7} /></View><TouchableOpacity style={styles.addButton} onPress={handleAdd}><Text style={styles.addButtonText}>Add Wallet</Text></TouchableOpacity></View></View></Modal> );
};

// --- DISPLAY COMPONENTS ---
const CreditCard = ({ card }) => { const { formatCurrency } = useContext(CurrencyContext); return ( <LinearGradient colors={card.gradient} style={styles.card}><View style={styles.cardHeader}>{card.cardType && cardLogos[card.cardType] && <Image source={cardLogos[card.cardType]} style={styles.cardLogo} />}<View style={styles.balanceContainer}><Text style={styles.balanceLabel}>Balance</Text><Text style={styles.balanceAmount}>{formatCurrency(parseFloat(card.balance))}</Text></View></View><View style={styles.cardFooter}><Text style={styles.cardNumber}>{card.number}</Text><Text style={styles.cardHolderName}>{card.holder}</Text></View></LinearGradient> ); };
const BankAccount = ({ account }) => {
    const { formatCurrency } = useContext(CurrencyContext);
    return (
        <LinearGradient colors={account.gradient} style={styles.card}>
            {/* Top Section */}
            <View style={styles.cardHeader}>
                {account.bankNameValue && bankLogos[account.bankNameValue] ? (
                    <Image source={bankLogos[account.bankNameValue]} style={styles.cardLogo} />
                ) : (
                    <FontAwesome name="bank" size={40} color="white" />
                )}
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceLabel}>Balance</Text>
                    <Text style={styles.balanceAmount}>{formatCurrency(parseFloat(account.balance))}</Text>
                </View>
            </View>
            
            {/* Middle Section - Displays the Bank Name */}
            <View>
                <Text style={styles.bankNameOnCard}>{account.name}</Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.cardFooter}>
                <Text style={styles.cardNumber}>{account.accountNumber}</Text>
                <Text style={styles.cardHolderName}>{account.holder}</Text>
            </View>
        </LinearGradient>
    );
};
const WalletAccount = ({ account }) => { const { formatCurrency } = useContext(CurrencyContext); return ( <LinearGradient colors={account.gradient} style={styles.card}><View style={styles.cardHeader}>{account.walletTypeValue && walletLogos[account.walletTypeValue] ? <Image source={walletLogos[account.walletTypeValue]} style={styles.cardLogo} /> : <FontAwesome name="google-wallet" size={40} color="white" />}<View style={styles.balanceContainer}><Text style={styles.balanceLabel}>Balance</Text><Text style={styles.balanceAmount}>{formatCurrency(parseFloat(account.balance))}</Text></View></View><View style={styles.cardFooter}><Text style={styles.cardNumber}>{account.phone}</Text><Text style={styles.cardHolderName}>{account.holder}</Text></View></LinearGradient> ); };


const WalletScreen = ({ navigation }) => {
    const { accounts, addAccount, deleteAccount } = useContext(WalletContext);
    const [activeTab, setActiveTab] = useState('cards');
    const [isModalVisible, setIsModalVisible] = useState(false);

    // This is the corrected filter logic
    const filteredAccounts = accounts.filter(acc => acc.type === activeTab.slice(0, -1));

    const openAddModal = () => setIsModalVisible(true);
    const handleAddAccount = (newAccountData) => { addAccount(newAccountData); setIsModalVisible(false); };
    const handleDelete = (accountId) => { Alert.alert("Delete Account", "Are you sure?", [ { text: "Cancel" }, { text: "Delete", style: "destructive", onPress: () => deleteAccount(accountId) } ]); };
    
    const renderModal = () => {
        if (activeTab === 'cards') return <AddCardModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAdd={handleAddAccount} existingAccounts={accounts} />;
        if (activeTab === 'banks') return <AddBankModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAdd={handleAddAccount} existingAccounts={accounts} />;
        if (activeTab === 'wallets') return <AddWalletModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAdd={handleAddAccount} existingAccounts={accounts} />;
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderModal()}
            <View style={styles.header}><TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.navigate('QuickMenu')}><MaterialCommunityIcons name="view-grid" size={28} color="black" /></TouchableOpacity><Text style={styles.headerTitle}>My Wallet</Text><TouchableOpacity style={styles.headerIconContainer} onPress={openAddModal}><Feather name="plus" size={28} color="black" /></TouchableOpacity></View>
            
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'cards' && styles.tabButtonActive]} onPress={() => setActiveTab('cards')}><Text style={[styles.tabText, activeTab === 'cards' && styles.tabTextActive]}>Cards</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'banks' && styles.tabButtonActive]} onPress={() => setActiveTab('banks')}><Text style={[styles.tabText, activeTab === 'banks' && styles.tabTextActive]}>Banks</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.tabButton, activeTab === 'wallets' && styles.tabButtonActive]} onPress={() => setActiveTab('wallets')}><Text style={[styles.tabText, activeTab === 'wallets' && styles.tabTextActive]}>Wallets</Text></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {filteredAccounts.length > 0 ? (
                    filteredAccounts.map(acc => (
                        <TouchableOpacity key={acc.id} onLongPress={() => handleDelete(acc.id)} activeOpacity={0.8}>
                            {acc.type === 'card' && <CreditCard card={acc} />}
                            {acc.type === 'bank' && <BankAccount account={acc} />}
                            {acc.type === 'wallet' && <WalletAccount account={acc} />}
                        </TouchableOpacity>
                    ))
                ) : ( <Text style={{textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16}}>No {activeTab.slice(0,-1)} accounts added yet. Tap '+' to add one.</Text> )}
            </ScrollView>
        </SafeAreaView>
    );
};
export default WalletScreen;