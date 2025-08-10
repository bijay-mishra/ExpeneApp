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
    headerIconContainer: {
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10, // Added padding to the top
    },
    card: {
        borderRadius: 25,
        padding: 25,
        marginBottom: 20,
        height: 200, // Fixed height for the card
        justifyContent: 'space-between', // Pushes header and footer apart
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    balanceContainer: {
        alignItems: 'flex-end', // Aligns text to the right
    },
    balanceLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    balanceAmount: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    cardFooter: {
        // No extra styles needed as justifyContent pushes it down
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 2,
        color: '#fff',
        marginBottom: 5,
    },
    cardHolderName: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
    },

    // --- STYLES FOR THE "ADD CARD" MODAL ---
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        // Add shadow for a floating effect
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
    },
    disabledInput: {
        backgroundColor: '#E5E7EB', // A slightly darker gray to show it's disabled
        color: '#9CA3AF',
    },
    addButton: {
        backgroundColor: '#7B4AF7',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 30,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});