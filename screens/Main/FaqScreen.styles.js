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
    faqItem: {
        backgroundColor: '#F9FAFB',
        borderRadius: 15,
        marginBottom: 15,
        padding: 15,
    },
    faqQuestionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginRight: 10,
    },
    faqAnswerContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 15,
    },
    faqAnswer: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
    },
});