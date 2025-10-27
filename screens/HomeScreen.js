import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AddEntryModal from '../components/AddEntryModal';
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  // State for actual financial data — start empty (user will add entries via modal)
  const [financialData, setFinancialData] = useState({
    income: 0,    // Actual income amount in pesos
    expense: 0,   // Actual expense amount in pesos
    balance: 0,   // Current balance
    entries: [],  // individual entries (income/expense) added by the user
  });

  // Calculate percentages based on actual amounts
  const total = financialData.income + financialData.expense;
  const incomePercentage = total > 0 ? (financialData.income / total) * 100 : 0;
  const expensePercentage = total > 0 ? (financialData.expense / total) * 100 : 0;

  const user = {
    name: 'Kim Gaeul',
    balance: financialData.balance,
    income: Math.round(incomePercentage),
    expense: Math.round(expensePercentage),
  };

  // Modal state for adding entries
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Handler to accept a new entry from the modal and update totals
  function handleAddEntry(entry) {
    setFinancialData((prev) => {
      const addedIncome = entry.type === 'income' ? entry.amount : 0;
      const addedExpense = entry.type === 'expense' ? entry.amount : 0;
      const newIncome = (prev.income || 0) + addedIncome;
      const newExpense = (prev.expense || 0) + addedExpense;
      const newBalance = (prev.balance || 0) + (entry.type === 'income' ? entry.amount : -entry.amount);
      const newEntries = [...(prev.entries || []), entry];
      return {
        ...prev,
        income: newIncome,
        expense: newExpense,
        balance: newBalance,
        entries: newEntries,
      };
    });
  }

  // SVG Donut Chart calculations using your groupmate's approach
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 100;  // Outer radius
  const innerR = 80;  // Inner radius - creates thicker donut
  const strokeWidth = outerR - innerR; // 30px thick donut
  
  // Data for the segments
  const isEmpty = total === 0;
  const data = [
    { percentage: incomePercentage, value: financialData.income, label: 'Income', color: isEmpty ? '#CCCCCC' : '#71c45a' },
    { percentage: expensePercentage, value: financialData.expense, label: 'Expenses', color: isEmpty ? '#CCCCCC' : '#eb4d4b' }
  ];

  // Calculate circumference and segment lengths
  const circumference = 2 * Math.PI * outerR;
  
  let currentOffset = 0;
  const segments = data.map((item) => {
    const segmentLength = (item.percentage / 100) * circumference;
    const segment = {
      ...item,
      strokeDasharray: `${segmentLength} ${circumference - segmentLength}`,
      strokeDashoffset: -currentOffset
    };
    currentOffset += segmentLength;
    return segment;
  });

  return (
    <View style={styles.container}>
      {/* Top Content */}
      <View style={styles.topContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/kim.png')}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance:</Text>
          <Text style={styles.balanceValue}>
            ₱ {financialData.balance.toLocaleString()}
          </Text>
        </View>

        {/* SVG Donut Chart - Updated approach */}
        <View style={styles.chartContainer}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <Circle
              cx={cx}
              cy={cy}
              r={outerR}
              stroke="#f0f0f0"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Segments */}
            {segments.map((segment, index) => (
              <Circle
                key={index}
                cx={cx}
                cy={cy}
                r={outerR}
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
                fill="transparent"
                strokeLinecap="butt"
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            ))}
          </Svg>
          
          {/* Center percentages - show both Income and Expense */}
          <View style={styles.chartCenterText}>
            <Text style={[
              styles.centerPercentage,
              isEmpty ? { color: '#999' } : styles.incomePercentage
            ]}>
              {user.income}%
            </Text>
            <Text style={styles.centerLabel}>Income</Text>
            <Text style={[
              styles.centerPercentage,
              isEmpty ? { color: '#999' } : styles.expensePercentage
            ]}>
              {user.expense}%
            </Text>
            <Text style={styles.centerLabel}>Expenses</Text>
          </View>
        </View>

        {/* Income/Expense Percentage - you can remove this if you want since percentages are in center now */}
        <View style={styles.percentageContainer}>
          <View style={styles.percentageItem}>
            <View style={[styles.percentageDot, { backgroundColor: isEmpty ? '#CCCCCC' : '#71c45a' }]} />
            <Text style={styles.percentageText}>₱ {financialData.income.toLocaleString()} Total Monthly Income</Text>
          </View>
          <View style={styles.percentageItem}>
            <View style={[styles.percentageDot, { backgroundColor: isEmpty ? '#CCCCCC' : '#eb4d4b' }]} />
            <Text style={styles.percentageText}>₱ {financialData.expense.toLocaleString()} Total Monthly Expenses</Text>
          </View>
        </View>
      </View>

      {/* Quick Shortcuts - Pushed to bottom */}
      <View style={styles.bottomSection}>
        {/* Divider */}
        <View style={styles.divider} />

        <Text style={styles.shortcutsTitle}>Quick Shortcuts</Text>
        <View style={styles.shortcuts}>
          {/* Add Income - Green */}
          <TouchableOpacity
            style={[styles.shortcutButton, styles.incomeButton]}
            onPress={() => { setModalType('income'); setModalVisible(true); }}
          >
            <MaterialIcons name="add-circle" size={28} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.incomeText]}>Add Income</Text>
          </TouchableOpacity>
          
          {/* Add Expenses - Red */}
          <TouchableOpacity
            style={[styles.shortcutButton, styles.expenseButton]}
            onPress={() => { setModalType('expense'); setModalVisible(true); }}
          >
            <MaterialIcons name="remove-circle" size={28} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.expenseText]}>Add Expenses</Text>
          </TouchableOpacity>
          
          {/* View Goals - Blue */}
          <TouchableOpacity style={[styles.shortcutButton, styles.goalsButton]}>
            <FontAwesome5 name="bullseye" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.goalsText]}>View Goals</Text>
          </TouchableOpacity>
          
          {/* Transactions - Purple */}
          <TouchableOpacity style={[styles.shortcutButton, styles.transactionsButton]}>
            <MaterialIcons name="list-alt" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.transactionsText]}>Transactions</Text>
          </TouchableOpacity>
          
          {/* View Statistics - Orange */}
          <TouchableOpacity style={[styles.shortcutButton, styles.statisticsButton]}>
            <Feather name="bar-chart" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.statisticsText]}>View Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Entry Modal (income / expense) */}
      <AddEntryModal
        visible={modalVisible}
        type={modalType}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white', 
    paddingVertical: 50,
    paddingHorizontal: 0,
  },
  topContent: {
    flex: 0.9,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6CA16B',
    padding: 15,
    paddingTop: 50,
    marginBottom: 20,
    marginTop: -50,
  },
  profileContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  profileImage: { 
    width: 45, 
    height: 45, 
    borderRadius: 30 
  },
  userName: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 30
  },
  settingsButton: {
    marginRight: 10,
  },
  balanceCard: { 
    alignItems: 'center', 
  },
  balanceLabel: { 
    color: '#3F7D20', 
    fontSize: 20,
  },
  balanceValue: { 
    color: '#3F7D20', 
    fontSize: 40, 
    fontWeight: 'bold' 
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    position: 'relative',
    height: 300,
  },
  chartCenterText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -60 }],
    width: 100,
  },
  centerPercentage: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  incomePercentage: {
    color: '#71c45a',
  },
  expensePercentage: {
    color: '#eb4d4b',
  },
  centerLabel: {
    fontSize: 12,
    color: '#3F7D20',
    textAlign: 'center',
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    gap: 10,
  },
  percentageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  percentageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  percentageText: {
    color: '#3F7D20',
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  bottomSection: {
  },
  shortcutsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3F7D20',
    marginBottom: 15,
    textAlign: 'center',
  },
  shortcuts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  shortcutButton: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    width: (screenWidth - 80) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shortcutText: { 
    fontSize: 12, 
    marginTop: 6, 
    fontWeight: '500',
    textAlign: 'center',
  },
  incomeButton: {
    backgroundColor: '#4CAF50',
  },
  incomeText: {
    color: '#FFFFFF',
  },
  expenseButton: {
    backgroundColor: '#F44336',
  },
  expenseText: {
    color: '#FFFFFF',
  },
  goalsButton: {
    backgroundColor: '#2196F3',
  },
  goalsText: {
    color: '#FFFFFF',
  },
  transactionsButton: {
    backgroundColor: '#9C27B0',
  },
  transactionsText: {
    color: '#FFFFFF',
  },
  statisticsButton: {
    backgroundColor: '#FF9800',
  },
  statisticsText: {
    color: '#FFFFFF',
  },
});