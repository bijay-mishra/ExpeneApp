import { Feather, FontAwesome } from '@expo/vector-icons';
import { useContext, useMemo, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { NotificationContext } from '../../context/NotificationContext';
import { WalletContext } from '../../context/WalletContext';
import styles, { calendarTheme } from './AddExpenseScreen.styles';

const AddExpenseScreen = ({ navigation, route }) => {
    const { addTransaction, updateTransaction } = useContext(BudgetContext);
    const { currency, formatCurrency } = useContext(CurrencyContext);
    const { addNotification } = useContext(NotificationContext);
    const { accounts, updateAccountBalance } = useContext(WalletContext);

    const transactionToEdit = route.params?.transactionToEdit;
    const isEditMode = !!transactionToEdit;

    const [sourceType, setSourceType] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(isEditMode ? transactionToEdit.accountId : null);
    const [title, setTitle] = useState(isEditMode ? transactionToEdit.name : '');
    const [amount, setAmount] = useState(isEditMode ? transactionToEdit.amount.toString() : '');
    const [selectedDate, setSelectedDate] = useState(isEditMode ? transactionToEdit.date : new Date().toISOString().split('T')[0]);
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const categories = ['Food', 'Shopping', 'Bills', 'Entertainment'];
    
    const sourceTypesData = [ { label: 'Debit/Credit Card', value: 'card' }, { label: 'Bank Account', value: 'bank' }, { label: 'Wallet', value: 'wallet' } ];

    const accountDropdownData = useMemo(() => {
        if (!sourceType) return [];
        return accounts
            .filter(acc => acc.type === sourceType)
            .map(acc => ({
                // --- THIS IS THE FIX ---
                // We now correctly use the `name` property and format the balance.
                label: `${acc.name} (${formatCurrency(parseFloat(acc.balance))})`,
                value: acc.id,
            }));
    }, [accounts, sourceType, currency]);

    const handleSubmit = () => {
        if (!title || !amount || !selectedAccount) { Alert.alert('Missing Information', 'Please fill all fields, including source.'); return; }
        const numericAmount = parseFloat(amount);
        const sourceAccount = accounts.find(acc => acc.id === selectedAccount);
        if (parseFloat(sourceAccount.balance) < numericAmount) { Alert.alert("Insufficient Balance", `Not enough funds in the selected account.`); return; }
        if (isEditMode) { /* ... Update logic ... */ }
        else {
            const newTransaction = { id: Date.now().toString(), icon: require('../../assets/images/bill.png'), name: title, date: selectedDate, amount: numericAmount, isIncome: false, accountId: selectedAccount };
            addTransaction(newTransaction);
            updateAccountBalance(selectedAccount, numericAmount, false);
            addNotification({ type: 'icon', image: require('../../assets/images/bill.png'), text: `You made a payment of ${formatCurrency(numericAmount)} for "${title}".` });
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity><Text style={styles.headerTitle}>{isEditMode ? 'Edit Expense' : 'Add Expense'}</Text><View style={{ width: 40 }} /></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.calendarContainer}><Calendar current={selectedDate} onDayPress={(day) => setSelectedDate(day.dateString)} markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FC844D' } }} theme={calendarTheme} /></View>
                    <Text style={styles.inputLabel}>Expense Title</Text>
                    <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="e.g., Grocery Shopping" value={title} onChangeText={setTitle} /></View>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <View style={styles.inputContainer}><Text style={{fontSize: 18, color: '#888', marginRight: 10}}>{currency.symbol}</Text><TextInput style={styles.input} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} /><FontAwesome name="unsorted" size={16} color="#888" /></View>
                    <Text style={styles.inputLabel}>Paid From</Text>
                    <Dropdown style={styles.dropdown} data={sourceTypesData} labelField="label" valueField="value" placeholder="Select a source type" value={sourceType} onChange={item => { setSourceType(item.value); setSelectedAccount(null); }} />
                    {sourceType && (
                        <View style={{marginTop: 15}}>
                            <Dropdown
                                style={styles.dropdown}
                                data={accountDropdownData}
                                labelField="label" valueField="value"
                                placeholder={`Select a specific ${sourceType}`}
                                value={selectedAccount}
                                onChange={item => setSelectedAccount(item.value)}
                            />
                        </View>
                    )}
                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.categoryContainer}>{categories.map(category => ( <TouchableOpacity key={category} style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]} onPress={() => setSelectedCategory(category)}><Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text></TouchableOpacity> ))}<TouchableOpacity style={styles.addCategoryButton}><Feather name="plus" size={20} color="#888" /></TouchableOpacity></View>
                </View>
            </ScrollView>
            <View style={styles.footer}><TouchableOpacity style={styles.submitButton} onPress={handleSubmit}><Text style={styles.submitButtonText}>{isEditMode ? 'Save Changes' : 'Add Expense'}</Text></TouchableOpacity></View>
        </SafeAreaView>
    );
};
export default AddExpenseScreen;