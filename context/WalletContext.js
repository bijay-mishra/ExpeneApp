import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const WalletContext = createContext();

const WALLET_STORAGE_KEY = '@ExpenseApp_WalletAccounts_V2';

// A predefined list of beautiful gradients for new cards and accounts
const gradients = [
    ['#F97794', '#623AA2'], ['#A962F4', '#7846F6'], ['#FDBB2D', '#22C1C3'],
    ['#00c6ff', '#0072ff'], ['#a8e063', '#56ab2f'], ['#614385', '#516395'],
    ['#FF5F6D', '#FFC371'], ['#11998e', '#38ef7d'],
];

export const WalletProvider = ({ children }) => {
    // This single state will hold all account types: cards, banks, and wallets
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load all saved accounts from the device when the app starts
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const storedAccounts = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
                if (storedAccounts !== null) {
                    setAccounts(JSON.parse(storedAccounts));
                }
            } catch (e) {
                console.error('Failed to load accounts from storage.', e);
            }
            setIsLoading(false);
        };
        loadAccounts();
    }, []);

    // Helper function to save the entire list of accounts to the device
    const saveAccounts = async (newAccounts) => {
        try {
            await AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(newAccounts));
        } catch (e) {
            console.error('Failed to save accounts to storage.', e);
        }
    };

    // Function to add a new account (card, bank, or wallet)
    const addAccount = (newAccountData) => {
        // Pick the next gradient from the list, cycling through them
        const nextGradientIndex = accounts.length % gradients.length;
        
        const newAccount = {
            id: Date.now().toString(),
            gradient: gradients[nextGradientIndex],
            ...newAccountData, // This will include type, balance, number, cardType, etc.
        };

        const newAccountList = [newAccount, ...accounts];
        setAccounts(newAccountList);
        saveAccounts(newAccountList); // Save the updated list permanently
    };

    // Function to delete an account by its ID
    const deleteAccount = (accountId) => {
        const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
        setAccounts(updatedAccounts);
        saveAccounts(updatedAccounts); // Save the updated list permanently
    };
     const updateAccountBalance = (accountId, amount, isIncome) => {
        const newAccountList = accounts.map(acc => {
            if (acc.id === accountId) {
                const currentBalance = parseFloat(acc.balance);
                const newBalance = isIncome ? currentBalance + amount : currentBalance - amount;
                return { ...acc, balance: newBalance.toString() };
            }
            return acc;
        });
        setAccounts(newAccountList);
        saveAccounts(newAccountList); // Save the updated list
    };

    // The value that will be provided to all other components
    const value = {
        accounts,
        isLoading,
        addAccount,
        deleteAccount,
        updateAccountBalance
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};