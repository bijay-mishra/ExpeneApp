import { StyleSheet } from 'react-native';

const orangeColor = '#FC844D'; 

export const calendarTheme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: orangeColor, 
    selectedDayTextColor: '#ffffff',
    todayTextColor: orangeColor, 
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: orangeColor, 
    selectedDotColor: '#ffffff',
    arrowColor: orangeColor, 
    monthTextColor: '#2d4150',
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 14,
    'stylesheet.calendar.header': { week: { marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' } }
};

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
    backButton: { padding: 8, borderRadius: 12, backgroundColor: '#fff', elevation: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2.62 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    contentContainer: { paddingHorizontal: 20, paddingBottom: 100 },
    calendarContainer: { backgroundColor: '#F3F4F6', borderRadius: 20, padding: 10, marginVertical: 20 },
    inputLabel: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 20, marginBottom: 10 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 15, paddingHorizontal: 15, height: 55 },
    input: { flex: 1, fontSize: 16, color: '#333' },
    categoryContainer: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
    categoryButton: { backgroundColor: '#F3F4F6', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15, marginRight: 10, marginBottom: 10 },
    categoryButtonActive: { backgroundColor: orangeColor }, 
    categoryText: { fontSize: 14, fontWeight: '500', color: '#333' },
    categoryTextActive: { color: '#fff' },
    addCategoryButton: { width: 40, height: 40, borderRadius: 15, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#fff' },
    submitButton: { backgroundColor: orangeColor, padding: 15, borderRadius: 20, alignItems: 'center' },
    submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});