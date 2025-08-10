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
    contentContainer: {
        padding: 20,
    },
    infoRow: {
        marginBottom: 25,
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    input: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        padding: 15,
    },
    disabledInput: {
        backgroundColor: '#E5E7EB',
        color: '#9CA3AF',
    },
    changePasswordButton: {
        marginTop: 10,
        alignSelf: 'flex-start', // Align button to the left
    },
    changePasswordText: {
        color: '#7B4AF7',
        fontWeight: '600',
        fontSize: 16,
    }
});