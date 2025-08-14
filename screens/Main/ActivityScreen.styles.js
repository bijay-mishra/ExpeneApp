import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
    backButton: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    filterButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 15, backgroundColor: '#F3F4F6' },
    filterButtonActive: { backgroundColor: '#7B4AF7' },
    filterText: { fontSize: 14, fontWeight: '600', color: '#666' },
    filterTextActive: { color: '#fff' },
    transactionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
    transactionIconContainer: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    transactionIcon: { width: 30, height: 30, resizeMode: 'contain' },
    transactionType: { fontSize: 16, fontWeight: '500' },
    transactionTime: { fontSize: 13, color: '#888', marginTop: 2 },
    transactionAmount: { fontSize: 16, fontWeight: 'bold', color: '#F44336' },
    creditAmount: { color: '#4CAF50' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});