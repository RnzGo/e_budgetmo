// screens/TransactionScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// normalize helper (for scaling)
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375;
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default function TransactionScreen({ navigation }) {
  const [income] = useState([
    { id: 'i1', title: 'Income 1', date: 'January 1, 2025', amount: 30000 },
    { id: 'i2', title: 'Income 2', date: 'January 1, 2025', amount: 50000 },
  ]);

  const [goals] = useState([
    { id: 'g1', title: 'Goal 1', date: 'January 1, 2025', amount: 500 },
  ]);

  const [expenses] = useState([
    { id: 'e1', title: 'Expense 1', date: 'January 1, 2025', amount: 1000 },
    { id: 'e2', title: 'Expense 2', date: 'January 1, 2025', amount: 2500 },
  ]);

  // Top padding to avoid status bar / notch overlap
  const topPadding =
    Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

  const TransactionRow = ({ type, title, date, amount }) => {
    const sign = type === 'income' ? '+' : '-';
    const color =
      type === 'income' ? '#4CAF50' : type === 'goal' ? '#E57373' : '#E57373';

    return (
      <View style={localStyles.transRow}>
        <View style={localStyles.transLeft}>
          <View style={[localStyles.transIcon, { borderColor: color }]}>
            <Text style={{ color }}>{type === 'income' ? '+' : '–'}</Text>
          </View>
          <View style={{ marginLeft: 8 }}>
            <Text style={localStyles.transTitle}>{title}</Text>
            <Text style={localStyles.transDate}>{date}</Text>
          </View>
        </View>
        <Text style={[localStyles.transAmount, { color }]}>
          {sign} PHP {amount.toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.root, { paddingTop: topPadding }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => navigation?.goBack?.()}>
            <Text style={styles.headerIcon}>{'‹'}</Text>
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/kim.png')}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Kim Gaeul</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation?.navigate?.('Settings')}>
          <AntDesign name="setting" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Transactions Card */}
        <View style={localStyles.card}>
          <View style={localStyles.cardHeader}>
            <MaterialIcons name="view-list" size={20} color="#4B7BE5" />
            <Text style={localStyles.cardTitle}>Transactions</Text>
          </View>

          <View style={localStyles.cardBody}>
            <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={true}>
              {income.map(item => (
                <TransactionRow key={item.id} type="income" {...item} />
              ))}

              {goals.map(item => (
                <TransactionRow key={item.id} type="goal" {...item} />
              ))}

              {expenses.map(item => (
                <TransactionRow key={item.id} type="expense" {...item} />
              ))}
            </ScrollView>
          </View>

          {/* Buttons inside card */}
          <View style={localStyles.cardFooter}>
            <TouchableOpacity style={localStyles.addIncomeBtn}>
                <MaterialIcons name="add-circle" size={28} color="#FFFFFF" />
              <Text style={localStyles.addBtnText}>Add Income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={localStyles.addExpenseBtn}>
              <MaterialIcons name="remove-circle" size={28} color="#FFFFFF" />
              <Text style={localStyles.addBtnText}>Add Expenses</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* View Statistics Button */}
        <TouchableOpacity style={localStyles.statsBtn}>
            <MaterialIcons name="show-chart" size={30} color="white" /> 
            <Text style={localStyles.statsBtnText}>View Statistics
          </Text>
        </TouchableOpacity>

        <View style={{ height: 48 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 16,
    paddingBottom: 48,
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
    marginHorizontal: -16,
    borderRadius: 0,
  },
  headerLeft: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    color: '#fff',
    fontSize: normalize(22),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
  },
  profileImage: {
    width: normalize(45),
    height: normalize(45),
    borderRadius: normalize(30),
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(20),
  },
  settingsButton: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#2D6CDF',
    fontSize: normalize(20),
    fontWeight: '800',
    marginLeft: 6,
  },
  cardBody: {
    paddingRight: 6,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 6,
  },
  addIncomeBtn: {
    flex: 1,
    backgroundColor: '#6CA16B',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  addExpenseBtn: {
    flex: 1,
    backgroundColor: '#F56B6B',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  statsBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 8,
    backgroundColor: '#A934DB',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 24,
  },
  statsBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  transRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  transLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transTitle: {
    fontWeight: '700',
    fontSize: normalize(14),
  },
  transDate: {
    color: '#999',
    fontSize: normalize(12),
    marginTop: 2,
  },
  transAmount: {
    fontWeight: '700',
    fontSize: normalize(13),
    marginLeft: 8,
  },
});
