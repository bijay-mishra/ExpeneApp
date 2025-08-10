import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { languages } from '../localization/languages';

const LANGUAGE_KEY = '@ExpenseApp_Language';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    useEffect(() => {
        const loadLanguage = async () => {
            const storedLocale = await AsyncStorage.getItem(LANGUAGE_KEY);
            if (storedLocale) {
                setLocale(storedLocale);
            }
        };
        loadLanguage();
    }, []);

    const setLanguage = async (langCode) => {
        setLocale(langCode);
        await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
    };

    const t = (key) => {
        if (languages[locale] && languages[locale][key]) {
            return languages[locale][key];
        }
        return languages['en'][key] || key;
    };

    const value = {
        locale,
        setLanguage,
        t,
    };

    return (
        // --- THIS IS THE FIX: The closing tag is now correct ---
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};