import { Feather, FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from 'react'; // Import useContext
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BudgetContext } from '../../context/BudgetContext'; // Import BudgetContext
import styles, { calendarTheme } from './AddIncomeScreen.styles';

const AddIncomeScreen = ({ navigation }) => {
    const { addTransaction } = useContext(BudgetContext); // Get the addTransaction function

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedCategory, setSelectedCategory] = useState('Salary');
    const categories = ['Salary', 'Discount', 'Investment'];

    const handleAddIncome = () => {
        if (!title || !amount) {
            Alert.alert('Missing Information', 'Please fill out the title and amount.');
            return;
        }

        const newTransaction = {
            id: Date.now().toString(),
            icon: selectedCategory === 'Salary' ? require('../../assets/images/salary.png') : require('../../assets/images/discount.png'),
            name: title,
            date: new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            amount: parseFloat(amount), // Store amount as a number
            isIncome: true,
        };

        // Use the context function to add the new transaction
        addTransaction(newTransaction);
        
        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Add Income</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.calendarContainer}><Calendar current={selectedDate} onDayPress={(day) => setSelectedDate(day.dateString)} markedDates={{ [selectedDate]: { selected: true, selectedColor: '#7B4AF7' } }} theme={calendarTheme} /></View>
                    <Text style={styles.inputLabel}>Income Title</Text>
                    <View style={styles.inputContainer}><TextInput style={styles.input} placeholder="e.g., Monthly Salary" value={title} onChangeText={setTitle} /></View>
                    <Text style={styles.inputLabel}>Amount</Text>
                    <View style={styles.inputContainer}><FontAwesome name="dollar" size={18} color="#888" style={{marginRight: 10}} /><TextInput style={styles.input} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} /><FontAwesome name="unsorted" size={16} color="#888" /></View>
                    <Text style={styles.inputLabel}>Category</Text>
                    <View style={styles.categoryContainer}>{categories.map(category => ( <TouchableOpacity key={category} style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]} onPress={() => setSelectedCategory(category)}><Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text></TouchableOpacity> ))}<TouchableOpacity style={styles.addCategoryButton}><Feather name="plus" size={20} color="#888" /></TouchableOpacity></View>
                </View>
            </ScrollView>

            <View style={styles.footer}><TouchableOpacity style={styles.submitButton} onPress={handleAddIncome}><Text style={styles.submitButtonText}>Add Income</Text></TouchableOpacity></View>
        </SafeAreaView>
    );
};

export default AddIncomeScreen;