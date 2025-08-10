import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const CURRENCY_KEY = '@ExpenseApp_Currency';

// Define the properties for each supported currency
export const currencySettings = {
    usd: { code: 'usd', symbol: '$', name: 'US Dollar', flag: require('../assets/images/us-flag.png') },
    npr: { code: 'npr', symbol: 'Rs', name: 'Nepalese Rupee', flag: require('../assets/images/nepal-flag.png') },
    inr: { code: 'inr', symbol: '₹', name: 'Indian Rupee', flag: require('../assets/images/india-flag.png') },
    eur: { code: 'eur', symbol: '€', name: 'Euro', flag: require('../assets/images/italy-flag.png') },
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(currencySettings.usd);

    useEffect(() => {
        const loadCurrency = async () => {
            const storedCurrencyCode = await AsyncStorage.getItem(CURRENCY_KEY);
            if (storedCurrencyCode && currencySettings[storedCurrencyCode]) {
                setCurrency(currencySettings[storedCurrencyCode]);
            }
        };
        loadCurrency();
    }, []);

    const setAppCurrency = async (currencyCode) => {
        if (currencySettings[currencyCode]) {
            setCurrency(currencySettings[currencyCode]);
            await AsyncStorage.setItem(CURRENCY_KEY, currencyCode);
        }
    };

    // --- START: THIS IS THE CORRECTED FORMATTING FUNCTION ---
    const formatCurrency = (amount) => {
        const number = typeof amount === 'number' ? amount : 0;
        
        // First, handle negative numbers (expenses) by adding a minus sign
        if (amount < 0) {
            // Get the absolute (positive) value of the number to format it
            const positiveAmount = Math.abs(number).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return `-${currency.symbol}${positiveAmount}`;
        }

        // For all positive numbers and zero (income, balances), format without any sign.
        const formattedAmount = number.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        
        return `${currency.symbol}${formattedAmount}`;
    };
    // --- END: THIS IS THE CORRECTED FORMATTING FUNCTION ---

    const value = {
        currency,
        setAppCurrency,
        formatCurrency,
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};