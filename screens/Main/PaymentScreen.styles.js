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
    headerButton: {
        padding: 8,
    },
    scrollContainer: {
        padding: 20,
    },
    methodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },
    methodIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 15,
    },
    methodDetails: {
        flex: 1,
    },
    methodType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    methodNumber: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
});