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
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    notificationIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginRight: 15,
    },
    notificationTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    notificationText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    notificationTime: {
        fontSize: 13,
        color: '#aaa',
        marginTop: 4,
    },
    actionButton: {
        backgroundColor: '#7B4AF7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
   
    // --- ADD THIS STYLE ---
   
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#aaa',
    },
});