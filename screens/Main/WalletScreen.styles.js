import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
    headerIconContainer: { padding: 8, borderRadius: 12, backgroundColor: '#fff', elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2.62, },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    
    // --- STYLES FOR THREE TABS ---
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Use space-between for three items
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
    },
    tabButton: {
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        flex: 1, // Each tab takes equal space
        alignItems: 'center',
    },
    tabButtonActive: {
        borderBottomColor: '#7B4AF7',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
    },
    tabTextActive: {
        color: '#7B4AF7',
        fontWeight: 'bold',
    },
    
    scrollContainer: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 20 },
    card: { borderRadius: 25, padding: 25, marginBottom: 20, height: 200, justifyContent: 'space-between' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    cardLogo: { width: 50, height: 35, resizeMode: 'contain'},
    balanceContainer: { alignItems: 'flex-end' },
    balanceLabel: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
    balanceAmount: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 5 },
    cardFooter: {},
    cardNumber: { fontSize: 18, letterSpacing: 2, color: '#fff', marginBottom: 5 },
    cardHolderName: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },

    // --- MODAL STYLES ---
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // Allows the title to take up space and center correctly
    },
    closeButton: {
        position: 'absolute',
        right: -15, // Position it outside the padding
        top: -15,
        padding: 5,
    },
     bankNameOnCard: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        textAlign: 'center', // Center the text
        letterSpacing: 1,
    },
    inputLabel: { fontSize: 16, color: '#666', marginBottom: 8, marginTop: 15 },
    input: { backgroundColor: '#F3F4F6', borderRadius: 15, padding: 15, fontSize: 16 },
    disabledInput: { backgroundColor: '#E5E7EB', color: '#9CA3AF' },
    amountInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 15, paddingHorizontal: 15 },
    currencySymbol: { fontSize: 16, color: '#9CA3AF', marginRight: 10 },
    amountInput: { flex: 1, fontSize: 16, paddingVertical: 15 },
    addButton: { backgroundColor: '#7B4AF7', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 30 },
    addButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    dropdown: { height: 55, backgroundColor: '#F3F4F6', borderRadius: 15, paddingHorizontal: 15 },
    dropdownContainer: { borderRadius: 15 },
    dropdownItemText: { fontSize: 16, padding: 5 },
    dropdownSelectedText: { fontSize: 16 },
});