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
        paddingTop: 10,
        paddingBottom: 10,
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
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    summaryBox: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '48%',
    },
    incomeSummaryBox: {
        backgroundColor: '#F3EFFF',
    },
    expenseSummaryBox: {
        backgroundColor: '#FFF4E3',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    summaryAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCirclePurple: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#7B4AF7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    iconCircleOrange: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FC844D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    summaryAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    statsSection: {
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdown: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        width: 110,
    },
    dropdownContainer: {
        borderRadius: 10,
        borderWidth: 0,
    },
    dropdownItemText: {
        color: '#333',
        fontSize: 14,
    },
    dropdownSelectedText: {
        marginRight: 5,
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
    },
    statsPeriod: {
        color: '#888',
        marginTop: 5,
        marginBottom: 10,
    },
    chartArea: {
        flexDirection: 'row',
        height: 180,
    },
    yAxisContainer: {
        width: 35,
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    yAxisLabel: {
        color: '#888',
        fontSize: 12,
    },
    barChartContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EFEFEF',
        paddingTop: 10,
    },
    barWrapper: {
        position: 'relative',
        width: '20%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    bar: {
        width: 12,
        borderRadius: 6,
        marginHorizontal: 4,
    },
    incomeBar: {
        backgroundColor: '#7B4AF7',
    },
    expenseBar: {
        backgroundColor: '#FC844D',
    },
    barLabel: {
        position: 'absolute',
        bottom: -20,
        color: '#888',
        fontSize: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
        marginHorizontal: 40,
    },
    toggleButton: {
        paddingVertical: 12,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
    },
    toggleButtonActiveIncome: {
        backgroundColor: '#7B4AF7',
    },
    toggleButtonActiveExpense: {
        backgroundColor: '#FC844D',
    },
    toggleButtonText: {
        fontWeight: 'bold',
        color: '#666',
    },
    toggleButtonTextActive: {
        color: '#fff',
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    expenseIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    expenseIcon: {
        width: 30,
        height: 30,
    },
    expenseCategory: {
        fontSize: 16,
        fontWeight: '500',
    },
    expenseDate: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    expenseAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F44336',
    },
      amountText: { // A generic style for the amount
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: { flex: 1, backgroundColor: '#fff',},
    //... keep all styles the same until the end
    expenseCategory: { fontSize: 16, fontWeight: '500',},
    expenseDate: { fontSize: 13, color: '#888', marginTop: 2,},
    incomeAmountText: {
        color: '#4CAF50', // Green for income
    },
    expenseAmountText: {
        color: '#F44336', // Red for expenses
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
        fontSize: 16,
    }
});