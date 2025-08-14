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
    const deleteCard = (cardId) => {
        const updatedCards = cards.filter(card => card.id !== cardId);
        setCards(updatedCards);
        saveCards(updatedCards);
    };
    const value = {
        cards,
        isLoading,
        addCard,
        deleteCard, 
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};