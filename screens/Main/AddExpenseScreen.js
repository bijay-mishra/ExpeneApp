import { Feather, FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BudgetContext } from '../../context/BudgetContext';
import styles, { calendarTheme } from './AddExpenseScreen.styles'; // Import from the new styles file

const AddExpenseScreen = ({ navigation }) => {
    const { addTransaction } = useContext(BudgetContext);

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

        const newTransaction = {
            id: Date.now().toString(),
            // You can create a map or switch statement for more icons
            icon: selectedCategory === 'Food' ? require('../../assets/images/food.png') : require('../../assets/images/shopping.png'),
            name: title,
            date: new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            amount: parseFloat(amount),
            isIncome: false, // --- THIS IS THE KEY CHANGE ---
        };

        addTransaction(newTransaction);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Add Expense</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.calendarContainer}>
                        <Calendar
                            current={selectedDate}
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={{ [selectedDate]: { selected: true, selectedColor: '#FC844D' } }}
                            theme={calendarTheme}
                        />
                    </View>

                    <Text style={styles.inputLabel}>Expense Title</Text>
                    <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="e.g., Grocery Shopping" value={title} onChangeText={setTitle} /></View>

                    <Text style={styles.inputLabel}>Amount</Text>
                    <View style={styles.inputContainer}><FontAwesome name="dollar" size={18} color="#888" style={{marginRight: 10}} /><TextInput style={styles.input} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} /><FontAwesome name="unsorted" size={16} color="#888" /></View>

                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.categoryContainer}>{categories.map(category => ( <TouchableOpacity key={category} style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]} onPress={() => setSelectedCategory(category)}><Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text></TouchableOpacity> ))}<TouchableOpacity style={styles.addCategoryButton}><Feather name="plus" size={20} color="#888" /></TouchableOpacity></View>
                </View>
            </ScrollView>

            <View style={styles.footer}><TouchableOpacity style={styles.submitButton} onPress={handleAddExpense}><Text style={styles.submitButtonText}>Add Expense</Text></TouchableOpacity></View>
        </SafeAreaView>
    );
};

export default AddExpenseScreen;