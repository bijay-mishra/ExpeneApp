import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    // --- START: NEW AND UPDATED STYLES ---
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 15,
        height: 50,
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    showPasswordButton: {
        paddingLeft: 10,
    },
    showPasswordText: {
        color: '#9CA3AF',
        fontWeight: '600',
    },
    // --- END: NEW AND UPDATED STYLES ---
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#7B4AF7',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#7B4AF7',
        marginTop: 20,
        textAlign: 'center',
    },
       footerContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    developerName: {
        color: '#6B7280',
        fontWeight: '600',
    },
});