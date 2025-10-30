import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AddIncomeModal from '../components/AddIncomeModal';
import AddExpenseModal from '../components/AddExpenseModal';
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Svg, Circle, G } from 'react-native-svg';

export default function HomeScreen({ navigation }) {
  // Shared finance state (provided by FinanceProvider)
  const { finance, addEntry } = useFinance();

  // Calculate percentages based on actual amounts
  const total = (finance.income || 0) + (finance.expense || 0);
  const incomePercentage = total > 0 ? (finance.income / total) * 100 : 0;
  const expensePercentage = total > 0 ? (finance.expense / total) * 100 : 0;

  const user = {
    name: 'Kim Gaeul',
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
  const isEmpty = total === 0;
  const data = [
    { percentage: incomePercentage, value: finance.income, label: 'Income', color: isEmpty ? '#CCCCCC' : '#71c45a' },
    { percentage: expensePercentage, value: finance.expense, label: 'Expenses', color: isEmpty ? '#CCCCCC' : '#eb4d4b' }
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
    <View style={styles.root}>
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
            <Text style={styles.percentageText}>₱ {(finance.income || 0).toLocaleString()} Total Monthly Income</Text>
          </View>
          <View style={styles.percentageItem}>
            <View style={[styles.percentageDot, { backgroundColor: isEmpty ? '#CCCCCC' : '#eb4d4b' }]} />
            <Text style={styles.percentageText}>₱ {(finance.expense || 0).toLocaleString()} Total Monthly Expenses</Text>
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
          
          {/* View Goals - Blue */}
          <TouchableOpacity style={[styles.shortcutButton, styles.goalsButton]}
                            onPress={() => navigation.navigate('GoalsScreen')}>
            <FontAwesome5 name="bullseye" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.goalsText]}>View Goals</Text>
          </TouchableOpacity>
          
          {/* Transactions - Purple */}
          <TouchableOpacity style={[styles.shortcutButton, styles.transactionsButton]}
                            onPress={() => navigation.navigate('TransactionScreen')}>
            <MaterialIcons name="list-alt" size={24} color="#FFFFFF" />
            <Text style={[styles.shortcutText, styles.transactionsText]}>Transactions</Text>
          </TouchableOpacity>
          
          {/* View Statistics - Orange */}
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