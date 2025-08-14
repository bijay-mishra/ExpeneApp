import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import { NotificationContext } from '../../context/NotificationContext';
import styles from './HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
    const { transactions, totalIncome, totalExpenses, totalBalance, isLoading, deleteTransaction } = useContext(BudgetContext);
    const { formatCurrency } = useContext(CurrencyContext);
    const { hasUnread } = useContext(NotificationContext);
    const handleLongPress = (item) => {
        Alert.alert(
            `Transaction: ${item.name}`,
            'Choose an action for this transaction.',
            [
                {
                    text: 'Edit',
                    onPress: () => {
                        const targetScreen = item.isIncome ? 'AddIncome' : 'AddExpense';
                        navigation.navigate(targetScreen, { transactionToEdit: item });
                    },
                },
                {
                    text: 'Delete',
                    onPress: () => showDeleteConfirmation(item),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const showDeleteConfirmation = (item) => {
        Alert.alert(
            "Delete Transaction",
            `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteTransaction(item.id),
                },
            ]
        );
    };
    const renderItem = ({ item }) => {
        let displayDate = 'Invalid Date';
        if (item && item.date) {
            const dateObject = parseISO(item.date);
            if (isValid(dateObject)) { displayDate = format(dateObject, 'dd MMM yyyy'); }
        }
        return (
            <TouchableOpacity onLongPress={() => handleLongPress(item)} activeOpacity={0.7}>
                <View style={styles.transactionItem}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.transactionIconContainer}>{item.icon ? <Image source={item.icon} style={styles.transactionIcon} /> : <View style={styles.transactionIcon} />}</View>
                        <View>
                            <Text style={styles.transactionType}>{item.name}</Text>
                            <Text style={styles.transactionTime}>{displayDate}</Text>
                        </View>
                    </View>
                    <Text style={[styles.transactionAmount, item.isIncome && styles.creditAmount]}>
                        {formatCurrency(item.isIncome ? item.amount : -item.amount)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    
    if (isLoading) { return ( <SafeAreaView style={styles.container}><View style={styles.header}><Text style={styles.headerTitle}>Home</Text></View><ActivityIndicator size="large" style={{ marginTop: 50 }} /></SafeAreaView> ); }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.navigate('QuickMenu')}>
                    <MaterialCommunityIcons name="view-grid" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Home</Text>
                <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.navigate('Notifications')}>
                    {hasUnread && <View style={styles.notificationBadge}></View>}
                    <Ionicons name="notifications-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#A962F4', '#7846F6']} style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.balanceLabel}>Total Balance</Text>
                            <Feather name="chevron-down" size={20} color="#E0DFFF" style={{ marginLeft: 5 }} />
                        </View>
                        <Menu>
                            <MenuTrigger><Feather name="more-horizontal" size={24} color="#fff" /></MenuTrigger>
                            <MenuOptions customStyles={{ optionsContainer: styles.menuOptionsContainer }}>
                                <MenuOption onSelect={() => Alert.alert('Refresh', 'Balance has been refreshed.')} style={styles.menuOption}><Feather name="refresh-cw" size={16} color="#333" /><Text style={styles.menuOptionText}>Refresh Balance</Text></MenuOption>
                                <MenuOption onSelect={() => navigation.navigate('Activity')} style={styles.menuOption}><Feather name="file-text" size={16} color="#333" /><Text style={styles.menuOptionText}>View Statement</Text></MenuOption>
                                <MenuOption onSelect={() => navigation.navigate('Wallet')} style={styles.menuOption}><Feather name="settings" size={16} color="#333" /><Text style={styles.menuOptionText}>Card Settings</Text></MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
                    <View style={styles.incomeExpenseContainer}>
                        <View style={styles.incomeBox}><Feather name="arrow-down" size={20} color="#fff" /><View style={{ marginLeft: 8 }}><Text style={styles.incomeExpenseLabel}>Income</Text><Text style={styles.incomeAmount}>{formatCurrency(totalIncome)}</Text></View></View>
                        <View style={styles.expenseBox}><Feather name="arrow-up" size={20} color="#fff" /><View style={{ marginLeft: 8 }}><Text style={styles.incomeExpenseLabel}>Expenses</Text><Text style={styles.expenseAmount}>{formatCurrency(totalExpenses)}</Text></View></View>
                    </View>
                </LinearGradient>

                <View style={styles.transactionsHeader}>
                    <Text style={styles.transactionsTitle}>Transactions</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Overview')}><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                </View>
                
                <FlatList data={transactions} renderItem={renderItem} keyExtractor={item => item.id} scrollEnabled={false} contentContainerStyle={{ paddingBottom: 120 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;