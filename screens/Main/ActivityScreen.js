import { Feather } from '@expo/vector-icons';
import { format, isValid, parseISO } from 'date-fns';
import { useContext, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { BudgetContext } from '../../context/BudgetContext';
import { CurrencyContext } from '../../context/CurrencyContext';
import styles from './ActivityScreen.styles';

const ActivityScreen = ({ navigation }) => {
    const { transactions } = useContext(BudgetContext);
    const { formatCurrency } = useContext(CurrencyContext);
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredTransactions = transactions.filter(t => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Income') return t.isIncome;
        if (activeFilter === 'Expense') return !t.isIncome;
        return false;
    });

    const renderItem = ({ item }) => {
        const displayDate = isValid(parseISO(item.date)) ? format(parseISO(item.date), 'dd MMM yyyy') : 'Invalid Date';
        return (
            <View style={styles.transactionItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.transactionIconContainer}><Image source={item.icon} style={styles.transactionIcon} /></View>
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Feather name="arrow-left" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Activity</Text>
                <View style={{ width: 40 }} />
            </View>
            <View style={styles.filterContainer}>
                {['All', 'Income', 'Expense'].map(filter => (
                    <TouchableOpacity key={filter} style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]} onPress={() => setActiveFilter(filter)}>
                        <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredTransactions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No transactions to show.</Text>}
            />
        </SafeAreaView>
    );
};

export default ActivityScreen;