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
  balanceCard: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 25,
    borderRadius: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#E0DFFF',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  incomeBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incomeExpenseLabel: {
    color: '#E0DFFF',
    fontSize: 14,
  },
  incomeAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  expenseAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#7846F6',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  transactionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionTime: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336', // Red for debit
  },
  creditAmount: {
    color: '#4CAF50', // Green for credit
  },
  // Bottom Tab Bar Styles
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 10, // For notch/home indicator space
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#7846F6',
    justifyContent: 'center',
    alignItems: 'center',
    // To lift it up
    bottom: 25,
    // Shadows
    shadowColor: '#7846F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
   notificationBadge: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
});