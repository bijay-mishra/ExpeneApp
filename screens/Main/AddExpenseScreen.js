import { Feather, FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { NotificationContext } from '../../context/NotificationContext'; // 1. Import NotificationContext
import styles, { calendarTheme } from './AddExpenseScreen.styles';

const AddExpenseScreen = ({ navigation }) => {
    // Get functions from all necessary contexts
    const { addTransaction } = useContext(BudgetContext);
    const { currency, formatCurrency } = useContext(CurrencyContext);
    const { addNotification } = useContext(NotificationContext); // 2. Get the addNotification function

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const categories = ['Food', 'Shopping', 'Bills', 'Entertainment'];

    const handleAddExpense = () => {
        if (!title || !amount) {
            Alert.alert('Missing Information', 'Please fill out the title and amount.');
            return;
        }
        const numericAmount = parseFloat(amount);
        const newTransaction = {
            id: Date.now().toString(),
            icon: selectedCategory === 'Food' ? require('../../assets/images/food.png') : require('../../assets/images/shopping.png'),
            name: title,
            date: selectedDate,
            amount: numericAmount,
            isIncome: false,
        };
        addTransaction(newTransaction);

        // 3. Create a new notification after adding the transaction
        addNotification({
            type: 'icon',
            image: require('../../assets/images/bill.png'),
            text: `You added an expense of ${formatCurrency(numericAmount)} for "${title}".`
        });

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity><Text style={styles.headerTitle}>Add Expense</Text><View style={{ width: 40 }} /></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.calendarContainer}><Calendar current={selectedDate} onDayPress={(day) => setSelectedDate(day.dateString)} markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FC844D' } }} theme={calendarTheme} /></View>
                    <Text style={styles.inputLabel}>Expense Title</Text>
                    <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="e.g., Grocery Shopping" value={title} onChangeText={setTitle} /></View>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <View style={styles.inputContainer}><Text style={{fontSize: 18, color: '#888', marginRight: 10}}>{currency.symbol}</Text><TextInput style={styles.input} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} /><FontAwesome name="unsorted" size={16} color="#888" /></View>
                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.categoryContainer}>{categories.map(category => ( <TouchableOpacity key={category} style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]} onPress={() => setSelectedCategory(category)}><Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text></TouchableOpacity> ))}<TouchableOpacity style={styles.addCategoryButton}><Feather name="plus" size={20} color="#888" /></TouchableOpacity></View>
                </View>
            </ScrollView>
            <View style={styles.footer}><TouchableOpacity style={styles.submitButton} onPress={handleAddExpense}><Text style={styles.submitButtonText}>Add Expense</Text></TouchableOpacity></View>
        </SafeAreaView>
    );
};

export default AddExpenseScreen;