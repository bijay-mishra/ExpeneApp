import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
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
        marginLeft: 20,
    },
    contentContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    dropdown: {
        height: 55,
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
        padding: 15,
    },
    dropdownContainer: {
        borderRadius: 15,
    },
    dropdownItem: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    flagIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    dropdownItemText: {
        flex: 1,
        fontSize: 16,
    },
    dropdownSelectedText: {
        fontSize: 16,
    },
});