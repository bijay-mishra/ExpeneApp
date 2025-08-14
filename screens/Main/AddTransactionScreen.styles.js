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
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    topButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    actionButton: {
        paddingVertical: 20,
        borderRadius: 20,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    incomeButton: {
        backgroundColor: '#F3EFFF',
    },
    expenseButton: {
        backgroundColor: '#FFF4E3',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
    },
    cardIconContainer: {
        width: 30,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBody: {
        width: '100%',
        height: '85%',
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
    },
    cardStrip: {
        width: '50%',
        height: 4,
        position: 'absolute',
        bottom: 5,
        left: 3,
        borderRadius: 2,
    },
    cardArrowContainer: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee'
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    transactionIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    transactionDetails: {
        marginLeft: 15,
    },
    transactionName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    transactionDate: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    incomeAmount: {
        color: '#4CAF50',
    },
    expenseAmount: {
        color: '#F44336',
    },
});