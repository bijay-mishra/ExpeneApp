import { Feather } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns';
import { useContext } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { WalletContext } from '../../context/WalletContext'; // Import the WalletContext
import styles from './AddTransactionScreen.styles';

// CardIcon component (no changes)
const CardIcon = ({ type }) => {
    const isIncome = type === 'income';
    const iconColor = isIncome ? '#7B4AF7' : '#FC844D';
    const arrowName = isIncome ? 'arrow-down' : 'arrow-up';
    return ( <View style={styles.cardIconContainer}><View style={[styles.cardBody, { backgroundColor: iconColor }]} /><View style={[styles.cardStrip, { backgroundColor: iconColor, opacity: 0.6 }]} /><View style={styles.cardArrowContainer}><Feather name={arrowName} size={8} color={iconColor} /></View></View> );
};

const AddTransactionScreen = ({ navigation }) => {
    // Get data from all necessary contexts
    const { transactions } = useContext(BudgetContext);
    const { accounts } = useContext(WalletContext);
    const { formatCurrency } = useContext(CurrencyContext);

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
                        // Find the account associated with this transaction
                        const account = accounts.find(acc => acc.id === item.accountId);
                        
                        // Create the descriptive source text
                        const sourceText = item.isIncome ? `added to ${account?.name}` : `paid via ${account?.name}`;
                        
                        // Safely format the date for display
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
                                    <View style={styles.transactionIconContainer}>
                                        {/* --- START: THIS IS THE FIX --- */}
                                        {item.icon ? (
                                            <Image source={item.icon} style={styles.transactionIcon} />
                                        ) : (
                                            <Text style={styles.fallbackIconText}>
                                                {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                                            </Text>
                                        )}
                                        {/* --- END: THIS IS THE FIX --- */}
                                    </View>
                                    <View style={styles.transactionDetails}>
                                        <Text style={styles.transactionName}>{item.name}</Text>
                                        {/* If an account is linked, show the source. Otherwise, show the date. */}
                                        {account ? (
                                            <Text style={styles.transactionSource}>{sourceText}</Text>
                                        ) : (
                                            <Text style={styles.transactionDate}>{displayDate}</Text>
                                        )}
                                    </View>
                                </View>
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