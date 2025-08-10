import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const WalletContext = createContext();

const WALLET_STORAGE_KEY = '@ExpenseApp_WalletCards';

const gradients = [
    ['#F97794', '#623AA2'],
    ['#A962F4', '#7846F6'],
    ['#FDBB2D', '#22C1C3'],
    ['#00c6ff', '#0072ff'],
    ['#a8e063', '#56ab2f'],
    ['#614385', '#516395'],
];

export const WalletProvider = ({ children }) => {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
                if (storedCards !== null) {
                    setCards(JSON.parse(storedCards));
                }
            } catch (e) {
                console.error('Failed to load cards.', e);
            }
            setIsLoading(false);
        };
        loadCards();
    }, []);

    const saveCards = async (newCards) => {
        try {
            await AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(newCards));
        } catch (e) {
            console.error('Failed to save cards.', e);
        }
    };

    const addCard = (newCardData) => {
        const nextGradientIndex = cards.length % gradients.length;
        const newCard = {
            id: Date.now().toString(),
            gradient: gradients[nextGradientIndex],
            ...newCardData,
        };
        const newCardList = [newCard, ...cards];
        setCards(newCardList);
        saveCards(newCardList);
    };

    // --- START: NEW FUNCTION TO DELETE A CARD ---
    const deleteCard = (cardId) => {
        // Create a new array that excludes the card with the matching ID
        const updatedCards = cards.filter(card => card.id !== cardId);
        // Update the state
        setCards(updatedCards);
        // Save the new, shorter list to persistent storage
        saveCards(updatedCards);
    };
    // --- END: NEW FUNCTION ---

    const value = {
        cards,
        isLoading,
        addCard,
        deleteCard, // Expose the new function to the rest of the app
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};