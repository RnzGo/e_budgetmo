import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AddIncomeModal from '../components/AddIncomeModal';
import AddExpenseModal from '../components/AddExpenseModal';
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Svg, Circle } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  // Shared finance state (provided by FinanceProvider)
  const { finance, addEntry } = useFinance();

  // Limit displayed data to the current month: filter entries by month/year
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyEntries = (finance.entries || []).filter((entry) => {
    try {
      const d = new Date(entry.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    } catch (e) {
      return false;
    }
  });

  const monthlyIncome = monthlyEntries
    .filter((e) => e.type === 'income')
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const monthlyExpense = monthlyEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const total = monthlyIncome + monthlyExpense;
  let incomePercentage = 0;
  let expensePercentage = 0;

  if (monthlyIncome > 0) {
    expensePercentage = Math.min((monthlyExpense / monthlyIncome) * 100, 100);
    incomePercentage = Math.max(100 - expensePercentage, 0);
  } else if (total > 0) {
    incomePercentage = (monthlyIncome / total) * 100;
    expensePercentage = (monthlyExpense / total) * 100;
  }

  const { user } = useUser();
  const userView = {
    name: user?.name ?? 'User',
    balance: finance.balance,
    income: Math.round(incomePercentage),
    expense: Math.round(expensePercentage),
  };

  // Modal state for adding entries (separate modals for income and expense)
  const [incomeModalVisible, setIncomeModalVisible] = useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);

  // addEntry is provided by the finance context (see context/FinanceContext.js)

  // SVG Donut Chart calculations using your groupmate's approach
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 100;  // Outer radius
  const innerR = 80;  // Inner radius - creates thicker donut
  const strokeWidth = outerR - innerR; // 30px thick donut
  
  // Data for the segments
  const isEmpty = total === 0 && monthlyIncome === 0;
  // Use monthly values so chart reflects the current month, and clamp percentages
  // to the [0,100] range to avoid drawing issues when values overflow.
  const data = [
    { percentage: Math.max(0, Math.min(incomePercentage, 100)), value: monthlyIncome, label: 'Income', color: isEmpty ? '#CCCCCC' : '#71c45a' },
    { percentage: Math.max(0, Math.min(expensePercentage, 100)), value: monthlyExpense, label: 'Expenses', color: isEmpty ? '#CCCCCC' : '#eb4d4b' }
  ];

  // Calculate circumference and segment lengths
  const circumference = 2 * Math.PI * outerR;
  
  let currentOffset = 0;
  const segments = data.map((item) => {
    const pct = Math.max(0, Math.min(item.percentage, 100));
    const segmentLength = (pct / 100) * circumference;
    const remaining = Math.max(0, circumference - segmentLength);
    const segment = {
      ...item,
      strokeDasharray: `${segmentLength.toFixed(2)} ${remaining.toFixed(2)}`,
      strokeDashoffset: -currentOffset
    };
    currentOffset += segmentLength;
    return segment;
  });

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={user?.profilePicture ? { uri: user.profilePicture } : require('../assets/kim.png')}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{userView?.name ?? 'User'}</Text>
          </View>
          <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
      </View>

  <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.container, { paddingBottom: 180 }]}>
        {/* Top Content */}
        <View style={styles.topContent}>
          {/* Balance Card */}
          <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance:</Text>
          <Text style={styles.balanceValue}>
            ₱ {((finance.balance || 0)).toLocaleString()}
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
                {userView.income ?? 0}%
            </Text>
            <Text style={styles.centerLabel}>Income</Text>
            <Text style={[
              styles.centerPercentage,
              isEmpty ? { color: '#999' } : styles.expensePercentage
            ]}>
              {userView.expense ?? 0}%
            </Text>
            <Text style={styles.centerLabel}>Expenses</Text>
          </View>
        </View>

        {/* Income and Expense Summary */}
        <View style={styles.percentageContainer}>
          <View style={styles.percentageItem}>
            <View style={[styles.percentageDot, { backgroundColor: isEmpty ? '#CCCCCC' : '#71c45a' }]} />
            <Text style={styles.percentageText}>₱ {(monthlyIncome || 0).toLocaleString()} Total Monthly Income</Text>
          </View>
          <View style={styles.percentageItem}>
            <View style={[styles.percentageDot, { backgroundColor: isEmpty ? '#CCCCCC' : '#eb4d4b' }]} />
            <Text style={styles.percentageText}>₱ {(monthlyExpense || 0).toLocaleString()} Total Monthly Expenses</Text>
          </View>
        </View>
        </View>

        {/* Quick Shortcuts - Pushed to bottom */}
        <View style={styles.bottomSection}>
        <View style={styles.divider} />

        <Text style={styles.shortcutsTitle}>Quick Shortcuts</Text>
        <View style={styles.shortcuts}>
          {/* Add Income - Green */}
          <TouchableOpacity
            style={[styles.shortcutButton, styles.incomeButton]}
            onPress={() => { setIncomeModalVisible(true); }}
          >
            <MaterialIcons name="add-circle" size={28} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.incomeText]}>Add Income</Text>
          </TouchableOpacity>
          
          {/* Add Expenses - Red */}
          <TouchableOpacity
            style={[styles.shortcutButton, styles.expenseButton]}
            onPress={() => { setExpenseModalVisible(true); }}
          >
            <MaterialIcons name="remove-circle" size={28} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.expenseText]}>Add Expenses</Text>
          </TouchableOpacity>
          
          {/* View Goals - Orange */}
          <TouchableOpacity style={[styles.shortcutButton, styles.goalsButton]}
                            onPress={() => navigation.navigate('GoalsScreen')}>
            <FontAwesome5 name="bullseye" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.goalsText]}>View Goals</Text>
          </TouchableOpacity>

          {/* Transactions - Blue */}
          <TouchableOpacity style={[styles.shortcutButton, styles.transactionsButton]}
                            onPress={() => navigation.navigate('TransactionScreen')}>
            <MaterialIcons name="list-alt" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.transactionsText]}>Transactions</Text>
          </TouchableOpacity>
          
          {/* View Statistics - Purple */}
          <TouchableOpacity style={[styles.shortcutButton, styles.statisticsButton]} 
                            onPress={() => navigation.navigate('Statistics_Page')}>
            <Feather name="bar-chart" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.statisticsText]}>View Statistics</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddIncomeModal
        visible={incomeModalVisible}
        onClose={() => setIncomeModalVisible(false)}
        onSubmit={(payload) => {
          addEntry(payload);
          setIncomeModalVisible(false);
        }}
      />

      <AddExpenseModal
        visible={expenseModalVisible}
        onClose={() => setExpenseModalVisible(false)}
        onSubmit={(payload) => {
          addEntry(payload);
          setExpenseModalVisible(false);
        }}
      />
      </ScrollView>
    </View>
  );
}

const styles = globalStyles.HomeScreen;