import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns'; // Make sure 'isValid' is imported
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext';
import styles from './HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
    const { transactions, totalIncome, totalExpenses, totalBalance, isLoading } = useContext(BudgetContext);

    const renderItem = ({ item }) => {
        // --- THIS IS THE FIX ---
        // 1. Attempt to parse the date from the transaction item.
        const dateObject = parseISO(item.date);
        
        // 2. Check if the parsed date is valid before trying to format it.
        // If the date is invalid, we'll show a fallback string. This prevents the crash.
        const displayDate = isValid(dateObject) 
            ? format(dateObject, 'dd MMM yyyy') 
            : 'Processing...'; // Or 'Invalid Date'
        // --- END OF FIX ---

        return (
            <View style={styles.transactionItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.transactionIconContainer}>
                        <Image source={item.icon} style={styles.transactionIcon} />
                    </View>
                    <View>
                        <Text style={styles.transactionType}>{item.name}</Text>
                        <Text style={styles.transactionTime}>{displayDate}</Text>
                    </View>
                </View>
                <Text style={[styles.transactionAmount, item.isIncome && styles.creditAmount]}>
                    {item.isIncome ? '+' : '-'}${item.amount.toFixed(2)}
                </Text>
            </View>
        );
    };
    
    // Add a loading state to prevent rendering with incomplete data
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIconContainer}>
                    <MaterialCommunityIcons name="view-grid" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity 
                    style={styles.headerIconContainer} 
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Ionicons name="notifications-outline" size={28} color="black" />
                    <View style={styles.notificationBadge}></View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#A962F4', '#7846F6']} style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Feather name="more-horizontal" size={24} color="#fff" />
                    </View>
                    <Text style={styles.balanceAmount}>${totalBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
                    <View style={styles.incomeExpenseContainer}>
                        <View style={styles.incomeBox}>
                            <Feather name="arrow-down" size={20} color="#fff" />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.incomeExpenseLabel}>Income</Text>
                                <Text style={styles.incomeAmount}>${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
                            </View>
                        </View>
                        <View style={styles.expenseBox}>
                            <Feather name="arrow-up" size={20} color="#fff" />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.incomeExpenseLabel}>Expenses</Text>
                                <Text style={styles.expenseAmount}>${totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.transactionsHeader}>
                    <Text style={styles.transactionsTitle}>Transactions</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Overview')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>
                
                <FlatList 
                    data={transactions} 
                    renderItem={renderItem} 
                    keyExtractor={item => item.id} 
                    scrollEnabled={false} 
                    contentContainerStyle={{ paddingBottom: 100 }} 
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;