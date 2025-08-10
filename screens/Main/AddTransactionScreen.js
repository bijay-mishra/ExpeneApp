import { Feather } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns'; // Import date-fns for formatting
import { useContext } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext'; // 1. Import the CurrencyContext
import styles from './AddTransactionScreen.styles';

// CardIcon component (no changes)
const CardIcon = ({ type }) => {
    const isIncome = type === 'income';
    const iconColor = isIncome ? '#7B4AF7' : '#FC844D';
    const arrowName = isIncome ? 'arrow-down' : 'arrow-up';
    return ( <View style={styles.cardIconContainer}><View style={[styles.cardBody, { backgroundColor: iconColor }]} /><View style={[styles.cardStrip, { backgroundColor: iconColor, opacity: 0.6 }]} /><View style={styles.cardArrowContainer}><Feather name={arrowName} size={8} color={iconColor} /></View></View> );
};

const AddTransactionScreen = ({ navigation }) => {
    // Get data from both contexts
    const { transactions } = useContext(BudgetContext);
    const { formatCurrency } = useContext(CurrencyContext); // 2. Get the currency formatter

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Add</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity style={[styles.actionButton, styles.incomeButton]} onPress={() => navigation.navigate('AddIncome')}><CardIcon type="income" /><Text style={styles.actionButtonText}>Add Income</Text></TouchableOpacity>
                     <TouchableOpacity style={[styles.actionButton, styles.expenseButton]} onPress={() => navigation.navigate('AddExpense')}>
                        <CardIcon type="expense" />
                        <Text style={styles.actionButtonText}>Add Expense</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listTitle}>Last Added</Text>

                {transactions.length > 0 ? (
                    transactions.map((item) => {
                        // Bulletproof date handling for display
                        let displayDate = 'Invalid Date';
                        if (item && item.date) {
                            const dateObject = parseISO(item.date);
                            if (isValid(dateObject)) {
                                displayDate = format(dateObject, 'dd MMM yyyy');
                            }
                        }

                        return (
                            <View key={item.id} style={styles.transactionItem}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.transactionIconContainer}><Image source={item.icon} style={styles.transactionIcon} /></View>
                                    <View style={styles.transactionDetails}>
                                        <Text style={styles.transactionName}>{item.name}</Text>
                                        <Text style={styles.transactionDate}>{displayDate}</Text>
                                    </View>
                                </View>
                                {/* --- 3. THIS IS THE FIX --- */}
                                {/* Use the formatCurrency function to display the amount */}
                                <Text style={[styles.amount, item.isIncome ? styles.incomeAmount : styles.expenseAmount]}>
                                    {formatCurrency(item.isIncome ? item.amount : -item.amount)}
                                </Text>
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.emptyListText}>No transactions added yet.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddTransactionScreen;