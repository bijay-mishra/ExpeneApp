import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    backButton: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 20 },
    currencyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    currencyLeft: { flexDirection: 'row', alignItems: 'center' },
    flagIcon: { width: 32, height: 32, marginRight: 15 },
    currencyName: { fontSize: 16, fontWeight: '500' },
});