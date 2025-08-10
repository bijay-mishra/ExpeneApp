import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { endOfMonth, endOfWeek, format, isWithinInterval, parseISO, startOfMonth, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { useContext, useMemo, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BudgetContext } from '../../context/BudgetContext';
import styles from './OverviewScreen.styles';

const formatDateForDisplay = (dateString) => format(parseISO(dateString), 'dd MMM yyyy');

const BarChart = ({ data }) => {
    const chartHeight = 150;
    const yAxisMax = Math.max(...data.income, ...data.expenses, 1);
    return ( <View style={styles.barChartContainer}>{data.labels.map((label, index) => ( <View key={label} style={styles.barWrapper}><View style={[styles.bar, styles.incomeBar, { height: (data.income[index] / yAxisMax) * chartHeight }]} /><View style={[styles.bar, styles.expenseBar, { height: (data.expenses[index] / yAxisMax) * chartHeight }]} /><Text style={styles.barLabel}>{label}</Text></View> ))}</View> );
};

const YAxis = ({ data }) => {
    const maxValue = Math.max(...data.income, ...data.expenses, 1);
    return ( <View style={styles.yAxisContainer}><Text style={styles.yAxisLabel}>${(maxValue).toLocaleString()}</Text><Text style={styles.yAxisLabel}>...</Text><Text style={styles.yAxisLabel}>$0</Text></View> );
};


const OverviewScreen = ({ navigation }) => {
    const { transactions, totalIncome, totalExpenses, isLoading } = useContext(BudgetContext);
    const [activeTab, setActiveTab] = useState('Expenses');
    const [timePeriod, setTimePeriod] = useState('weekly');

    const dropdownData = [{ label: 'Weekly', value: 'weekly' }, { label: 'Monthly', value: 'monthly' }];

    const chartData = useMemo(() => {
        // Guard against running calculations if transactions aren't ready
        if (!transactions || transactions.length === 0) {
            return { labels: [], income: [], expenses: [] };
        }
        
        const today = new Date();
        let labels, incomeByPeriod, expensesByPeriod;

        if (timePeriod === 'weekly') {
            labels = ['Week 1', 'Week 2', 'Week 3', 'This Week'];
            incomeByPeriod = [0, 0, 0, 0];
            expensesByPeriod = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                const weekStart = startOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
                const weekEnd = endOfWeek(subWeeks(today, 3 - i), { weekStartsOn: 1 });
                const weeklyTx = transactions.filter(t => isWithinInterval(parseISO(t.date), { start: weekStart, end: weekEnd }));
                weeklyTx.forEach(t => t.isIncome ? incomeByPeriod[i] += t.amount : expensesByPeriod[i] += t.amount);
            }
        } else {
            labels = [format(subMonths(today, 3), 'MMM'), format(subMonths(today, 2), 'MMM'), format(subMonths(today, 1), 'MMM'), format(today, 'MMM')];
            incomeByPeriod = [0, 0, 0, 0];
            expensesByPeriod = [0, 0, 0, 0];
            for (let i = 0; i < 4; i++) {
                const monthStart = startOfMonth(subMonths(today, 3 - i));
                const monthEnd = endOfMonth(subMonths(today, 3 - i));
                const monthlyTx = transactions.filter(t => isWithinInterval(parseISO(t.date), { start: monthStart, end: monthEnd }));
                monthlyTx.forEach(t => t.isIncome ? incomeByPeriod[i] += t.amount : expensesByPeriod[i] += t.amount);
            }
        }
        return { labels, income: incomeByPeriod, expenses: expensesByPeriod };
    }, [transactions, timePeriod]);

    const filteredTransactions = transactions.filter(t => activeTab === 'Income' ? t.isIncome : !t.isIncome);

    // --- RENDER GUARD 1: Show a loading spinner while fetching data ---
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}><Text style={styles.headerTitle}>Overview</Text></View>
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}><TouchableOpacity style={styles.headerIconContainer}><MaterialCommunityIcons name="view-grid" size={28} color="black" /></TouchableOpacity><Text style={styles.headerTitle}>Overview</Text><View style={{ width: 50 }} /></View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.summaryContainer}><View style={[styles.summaryBox, styles.incomeSummaryBox]}><Text style={styles.summaryLabel}>Total Income</Text><View style={styles.summaryAmountContainer}><View style={styles.iconCirclePurple}><Feather name="arrow-down" size={16} color="#fff" /></View><Text style={styles.summaryAmount}>${totalIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text></View></View><View style={[styles.summaryBox, styles.expenseSummaryBox]}><Text style={styles.summaryLabel}>Total Expenses</Text><View style={styles.summaryAmountContainer}><View style={styles.iconCircleOrange}><Feather name="arrow-up" size={16} color="#fff" /></View><Text style={styles.summaryAmount}>${totalExpenses.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text></View></View></View>
                
                {/* --- RENDER GUARD 2: Only show stats if there is data to display --- */}
                {transactions.length > 0 ? (
                    <View style={styles.statsSection}>
                        <View style={styles.statsHeader}><Text style={styles.statsTitle}>Statistics</Text><Dropdown style={styles.dropdown} containerStyle={styles.dropdownContainer} itemTextStyle={styles.dropdownItemText} selectedTextStyle={styles.dropdownSelectedText} data={dropdownData} labelField="label" valueField="value" value={timePeriod} onChange={item => setTimePeriod(item.value)} renderRightIcon={() => <Feather name="chevron-down" size={16} color="#000" />} /></View>
                        <Text style={styles.statsPeriod}>Last 4 {timePeriod === 'weekly' ? 'Weeks' : 'Months'}</Text>
                        <View style={styles.chartArea}><YAxis data={chartData} /><BarChart data={chartData} /></View>
                    </View>
                ) : (
                    <View style={styles.statsSection}><Text style={styles.emptyListText}>No transaction data to show statistics.</Text></View>
                )}
                
                <View style={styles.toggleContainer}><TouchableOpacity style={[styles.toggleButton, activeTab === 'Income' && styles.toggleButtonActiveIncome]} onPress={() => setActiveTab('Income')}><Text style={[styles.toggleButtonText, activeTab === 'Income' && styles.toggleButtonTextActive]}>Income</Text></TouchableOpacity><TouchableOpacity style={[styles.toggleButton, activeTab === 'Expenses' && styles.toggleButtonActiveExpense]} onPress={() => setActiveTab('Expenses')}><Text style={[styles.toggleButtonText, activeTab === 'Expenses' && styles.toggleButtonTextActive]}>Expenses</Text></TouchableOpacity></View>

                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(item => (
                        <View key={item.id} style={styles.expenseItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}><View style={styles.expenseIconContainer}><Image source={item.icon} style={styles.expenseIcon} /></View><View><Text style={styles.expenseCategory}>{item.name}</Text><Text style={styles.expenseDate}>{formatDateForDisplay(item.date)}</Text></View></View>
                            <Text style={[styles.amountText, item.isIncome ? styles.incomeAmountText : styles.expenseAmountText]}>
                                {item.isIncome ? '+' : '-'}${item.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyListText}>No {activeTab.toLowerCase()} transactions yet.</Text>
                )}
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default OverviewScreen;