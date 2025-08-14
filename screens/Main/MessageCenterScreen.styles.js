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
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#F3F4F6', 
    },
    unreadIcon: {
        backgroundColor: '#E0E7FF', 
    },
    messageContent: {
        flex: 1,
    },
    messageTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    unreadTitle: {
        fontWeight: 'bold',
        color: '#333',
    },
    messagePreview: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    messageTime: {
        fontSize: 12,
        color: '#aaa',
        fontWeight: '500',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
});