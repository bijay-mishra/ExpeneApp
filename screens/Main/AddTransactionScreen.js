import { Feather } from '@expo/vector-icons';
import { useContext } from 'react'; // 1. Import useContext
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext'; // 2. Import the BudgetContext
import styles from './AddTransactionScreen.styles';

// CardIcon component remains the same
const CardIcon = ({ type }) => {
    const isIncome = type === 'income';
    const iconColor = isIncome ? '#7B4AF7' : '#FC844D';
    const arrowName = isIncome ? 'arrow-down' : 'arrow-up';
    return ( <View style={styles.cardIconContainer}><View style={[styles.cardBody, { backgroundColor: iconColor }]} /><View style={[styles.cardStrip, { backgroundColor: iconColor, opacity: 0.6 }]} /><View style={styles.cardArrowContainer}><Feather name={arrowName} size={8} color={iconColor} /></View></View> );
};

const AddTransactionScreen = ({ navigation }) => {
    // 3. Get the global transaction list from the context
    // This `transactions` variable will automatically update whenever a new income is added
    const { transactions } = useContext(BudgetContext);

    // 4. All old state management (useState, useEffect, AsyncStorage) is now removed.

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Add</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity style={[styles.actionButton, styles.incomeButton]} onPress={() => navigation.navigate('AddIncome')}><CardIcon type="income" /><Text style={styles.actionButtonText}>Add Income</Text></TouchableOpacity>
                    {/* The "Add Expense" button would navigate to an "AddExpenseScreen" */}
                     <TouchableOpacity 
                        style={[styles.actionButton, styles.expenseButton]} 
                        onPress={() => navigation.navigate('AddExpense')}
                    >
                        <CardIcon type="expense" />
                        <Text style={styles.actionButtonText}>Add Expense</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.listTitle}>Last Added</Text>

                {/* 5. Map over the transaction list from the context */}
                {transactions.map((item) => (
                    <View key={item.id} style={styles.transactionItem}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.transactionIconContainer}><Image source={item.icon} style={styles.transactionIcon} /></View>
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionName}>{item.name}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>
                        </View>
                        {/* Correctly format the amount from a number to a string */}
                        <Text style={[styles.amount, item.isIncome ? styles.incomeAmount : styles.expenseAmount]}>
                            {item.isIncome ? '+' : '-'}${item.amount.toFixed(2)}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddTransactionScreen;