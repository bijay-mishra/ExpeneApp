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
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top', // Aligns placeholder to the top on Android
    },
    submitButton: {
        backgroundColor: '#7B4AF7',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 30,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});