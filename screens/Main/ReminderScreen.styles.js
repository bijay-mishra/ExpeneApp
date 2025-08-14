import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    backButton: { padding: 8 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    contentContainer: { padding: 20 },
    settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    settingTextContainer: { flex: 1, marginRight: 15 },
    settingTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
    settingDescription: { fontSize: 13, color: '#888', marginTop: 4, lineHeight: 18 },
});