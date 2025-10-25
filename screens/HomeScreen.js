import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  // Temporary mock data (replace with backend later)
  const user = {
    name: 'Kim Gaeul',
    balance: 64209.67,
    income: 78,  // in percent
    expense: 22, // in percent
  };

  const chartData = {
    labels: ['Income', 'Expense'],
    data: [user.income / 100, user.expense / 100],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/kim.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <AntDesign name="setting" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>
          ₱ {user.balance.toLocaleString()}
        </Text>
      </View>

      {/* Income/Expense Percentage */}
      <View style={styles.percentageContainer}>
        <View style={styles.percentageItem}>
          <View style={[styles.percentageDot, {backgroundColor: '#71c45a'}]} />
          <Text style={styles.percentageText}>{user.income}% Income</Text>
        </View>
        <View style={styles.percentageItem}>
          <View style={[styles.percentageDot, {backgroundColor: '#eb4d4b'}]} />
          <Text style={styles.percentageText}>{user.expense}% Expenses</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <ProgressChart
          data={chartData}
          width={screenWidth - 40}
          height={180}
          strokeWidth={16}
          radius={42}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1, index) => {
              return index === 0 ? '#71c45a' : '#eb4d4b';
            },
            style: {
              borderRadius: 16,
            },
          }}
          hideLegend={true}
        />
      </View>

      {/* Quick Shortcuts */}
      <Text style={styles.shortcutsTitle}>Quick Shortcuts</Text>
      <View style={styles.shortcuts}>
        <TouchableOpacity style={styles.shortcutButton}>
          <MaterialIcons name="add-circle-outline" size={28} color="#3F7D20" />
          <Text style={styles.shortcutText}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutButton}>
          <MaterialIcons name="remove-circle-outline" size={28} color="#eb4d4b" />
          <Text style={styles.shortcutText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutButton}>
          <AntDesign name="piechart" size={24} color="#3F7D20" />
          <Text style={styles.shortcutText}>Set Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shortcutButton}>
          <MaterialIcons name="list-alt" size={24} color="#3F7D20" />
          <Text style={styles.shortcutText}>Transactions</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="home" size={24} color="#3F7D20" />
          <Text style={[styles.navText, {color: '#3F7D20'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="barschart" size={24} color="#bbb" />
          <Text style={styles.navText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="user" size={24} color="#bbb" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAF4E1', 
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6CA16B',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
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
  greeting: { 
    color: 'white', 
    fontSize: 12,
    opacity: 0.8,
  },
  userName: { 
    color: 'white', 
    fontWeight: '600', 
    fontSize: 16 
  },
  balanceCard: { 
    alignItems: 'center', 
    marginVertical: 10,
  },
  balanceLabel: { 
    color: '#3F7D20', 
    fontSize: 16,
    marginBottom: 5,
  },
  balanceValue: { 
    color: '#3F7D20', 
    fontSize: 34, 
    fontWeight: 'bold' 
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 20,
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
    fontSize: 14,
    fontWeight: '500',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  shortcutsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F7D20',
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 10,
  },
  shortcuts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  shortcutButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: (screenWidth - 60) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shortcutText: { 
    fontSize: 13, 
    marginTop: 6, 
    color: '#3F7D20', 
    fontWeight: '500' 
  },
  bottomNav: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 30,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 4,
  },
});