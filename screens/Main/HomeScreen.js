import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { NotificationContext } from '../../context/NotificationContext'; // 1. Import NotificationContext
import styles from './HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
    // Get data from all necessary contexts
    const { transactions, totalIncome, totalExpenses, totalBalance, isLoading } = useContext(BudgetContext);
    const { formatCurrency } = useContext(CurrencyContext);
    const { hasUnread } = useContext(NotificationContext); // 2. Get the unread status

    const renderItem = ({ item }) => {
        let displayDate = 'Date unavailable';
        if (item && item.date) {
            const dateObject = parseISO(item.date);
            if (isValid(dateObject)) {
                displayDate = format(dateObject, 'dd MMM yyyy');
            }
        }
        return (
            <View style={styles.transactionItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.transactionIconContainer}>
                        {item.icon ? <Image source={item.icon} style={styles.transactionIcon} /> : <View style={styles.transactionIcon} />}
                    </View>
                    <View>
                        <Text style={styles.transactionType}>{item.name}</Text>
                        <Text style={styles.transactionTime}>{displayDate}</Text>
                    </View>
                </View>
                <Text style={[styles.transactionAmount, item.isIncome && styles.creditAmount]}>
                    {formatCurrency(item.isIncome ? item.amount : -item.amount)}
                </Text>
            </View>
        );
    };
    
    if (isLoading) {
        return ( <SafeAreaView style={styles.container}><View style={styles.header}><Text style={styles.headerTitle}>Home</Text></View><ActivityIndicator size="large" style={{ marginTop: 50 }} /></SafeAreaView> );
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
                    {/* 3. The red dot now only appears if there are unread notifications */}
                    {hasUnread && <View style={styles.notificationBadge}></View>}
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#A962F4', '#7846F6']} style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Feather name="more-horizontal" size={24} color="#fff" />
                    </View>
                    <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
                    <View style={styles.incomeExpenseContainer}>
                        <View style={styles.incomeBox}>
                            <Feather name="arrow-down" size={20} color="#fff" />
                            <View style={{ marginLeft: 8 }}><Text style={styles.incomeExpenseLabel}>Income</Text><Text style={styles.incomeAmount}>{formatCurrency(totalIncome)}</Text></View>
                        </View>
                        <View style={styles.expenseBox}>
                            <Feather name="arrow-up" size={20} color="#fff" />
                            <View style={{ marginLeft: 8 }}><Text style={styles.incomeExpenseLabel}>Expenses</Text><Text style={styles.expenseAmount}>{formatCurrency(totalExpenses)}</Text></View>
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