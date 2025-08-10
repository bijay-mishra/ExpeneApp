import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const BudgetContext = createContext();

const TRANSACTIONS_STORAGE_KEY = '@ExpenseApp_Transactions';

// Initial data for the very first app launch
const firstTimeTransactions = [
    { id: '1', name: 'Initial Income', date: new Date().toISOString().split('T')[0], amount: 1000, isIncome: true, icon: require('../assets/images/salary.png') },
    { id: '2', name: 'Groceries', date: new Date().toISOString().split('T')[0], amount: 50, isIncome: false, icon: require('../assets/images/food.png') },
];

export const BudgetProvider = ({ children }) => {
    // Default state is always a valid empty array
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const storedTransactions = await AsyncStorage.getItem(TRANSACTIONS_STORAGE_KEY);
                if (storedTransactions !== null) {
                    setTransactions(JSON.parse(storedTransactions));
                } else {
                    setTransactions(firstTimeTransactions);
                }
            } catch (e) {
                console.error('Failed to load transactions.', e);
                setTransactions(firstTimeTransactions);
            }
            setIsLoading(false);
        };
        loadTransactions();
    }, []);
    
    const saveTransactions = async (newTransactions) => {
        try {
            await AsyncStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(newTransactions));
        } catch (e) {
            console.error('Failed to save transactions.', e);
        }
    };

    const totalIncome = transactions.filter(t => t.isIncome).reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => !t.isIncome).reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;
    
    const addTransaction = (newTransaction) => {
        const newTransactionList = [newTransaction, ...transactions];
        setTransactions(newTransactionList);
        saveTransactions(newTransactionList);
    };

    const factoryReset = () => {
        const emptyList = [];
        setTransactions(emptyList);
        saveTransactions(emptyList);
    };

    const value = {
        transactions,
        totalIncome,
        totalExpenses,
        totalBalance,
        isLoading,
        addTransaction,
        factoryReset,
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};