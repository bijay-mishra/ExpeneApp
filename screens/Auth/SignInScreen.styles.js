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
        paddingLeft: 10, // Add space between input and button text
    },
    showPasswordText: {
        color: '#9CA3AF',
        fontWeight: '600',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#7B4AF7',
        borderColor: '#7B4AF7',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#666',
    },
    forgotPasswordText: {
        color: '#7B4AF7',
        fontWeight: '600',
    },
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
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    separatorText: {
        width: 50,
        textAlign: 'center',
        color: '#9CA3AF',
        fontWeight: '600',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        width: '100%',
        height: 50,
    },
    googleIcon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
       footerContainer: {
        position: 'absolute', // Position it at the bottom of the screen
        bottom: 20, // Give it some padding from the very bottom
        left: 20, // Match the container's padding
        right: 20,
        alignItems: 'center', // Center the text
    },
    footerText: {
        fontSize: 12, // Use a small font size for subtlety
        color: '#9CA3AF', // A light, unobtrusive gray color
    },
    developerName: {
        color: '#6B7280', // A slightly darker gray for your name
        fontWeight: '600',
    },
});