import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagImage: {
        width: 30,
        height: 20,
        borderRadius: 4,
        marginRight: 10,
    },
     resetButton: {
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: '#FEE2E2', // A light red background
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F44336' // A red border
    },
    resetButtonText: {
        color: '#F44336', // Red text
        fontSize: 16,
        fontWeight: 'bold',
    },
});