// GoalsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Image, StatusBar, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import AddGoalModal from '../components/AddGoalModal';

const goalsData = [];

export default function GoalsScreen({ navigation }) {
  // Add top padding so header doesn't overlap the device status bar / notch
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [goals, setGoals] = useState(goalsData);
  const [expandedGoalId, setExpandedGoalId] = useState(null);
  const [amountInputs, setAmountInputs] = useState({}); // keyed by goal id

  // Load saved goals on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('@e_budgetmo_goals');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (mounted && Array.isArray(parsed)) setGoals(parsed);
        }
      } catch (err) {
        console.warn('Failed to load goals from storage', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // Persist goals whenever they change
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('@e_budgetmo_goals', JSON.stringify(goals || []));
      } catch (err) {
        console.warn('Failed to save goals to storage', err);
      }
    };
    save();
  }, [goals]);

  function parseDueDate(due) {
    if (!due) return null;
    // If it's an ISO or full date string, try Date constructor
    if (typeof due === 'string' && (due.includes('-') || due.includes('T') || due.includes(','))) {
      const parsed = new Date(due);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }

    // Accept formats like 'DD/MM/YY' or 'DD/MM/YYYY'
    const parts = String(due).split('/').map((p) => p.trim());
    if (parts.length === 3) {
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      const dt = new Date(year, month, day);
      if (!Number.isNaN(dt.getTime())) return dt;
    }

    // fallback
    const parsed = new Date(due);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function isPastDue(goal) {
    const dueDate = parseDueDate(goal.due);
    if (!dueDate) return false;
    // Compare date-only (ignore time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    return d < today;
  }

  function toggleExpand(goalId) {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;
    if (isPastDue(goal)) return; // don't expand past-due goals
    setExpandedGoalId((prev) => (prev === goalId ? null : goalId));
  }

  function handleAdjustGoal(goalId, isAdd) {
    const raw = amountInputs[goalId] || '';
    const amt = parseFloat(raw);
    if (Number.isNaN(amt) || amt <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount greater than zero.');
      return;
    }

    setGoals((prev) => prev.map((g) => {
      if (g.id !== goalId) return g;
      const current = Number(g.current) || 0;
      const target = Number(g.target) || 0;
      let newCurrent = isAdd ? current + amt : Math.max(0, current - amt);
      const newProgress = target > 0 ? Math.min(1, newCurrent / target) : g.progress;
      // record a transaction on the goal for history (used by statistics)
      const prevTx = Array.isArray(g.transactions) ? g.transactions : [];
      const tx = {
        id: Date.now(),
        date: new Date().toISOString(),
        amount: isAdd ? amt : -amt,
        action: isAdd ? 'add' : 'withdraw',
      };
      return { ...g, current: newCurrent, progress: newProgress, transactions: [...prevTx, tx] };
    }));

    setAmountInputs((prev) => ({ ...prev, [goalId]: '' }));
  }

  function handleDeleteGoal(goalId) {
    Alert.alert(
      'Delete goal',
      'Are you sure you want to delete this goal? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setGoals((prev) => prev.filter((g) => g.id !== goalId));
          if (expandedGoalId === goalId) setExpandedGoalId(null);
        } }
      ]
    );
  }

  function handleAddGoal(newGoal) {
    // normalize incoming goal and add to local list
    const goal = {
      id: newGoal.id || Date.now(),
      title: newGoal.title || 'New Goal',
      due: new Date(newGoal.dueDate || newGoal.due || Date.now()).toLocaleDateString(),
      progress: newGoal.progress ?? 0,
      current: Number(newGoal.current) || 0,
      transactions: Array.isArray(newGoal.transactions) ? newGoal.transactions : [],
      target: Number(newGoal.targetAmount) || Number(newGoal.target) || 0,
      note: newGoal.note || '',
      color: newGoal.color || '#3B82F6',
    };

    setGoals((prev) => [goal, ...prev]);
  }

  return (
    <View style={[styles.root, { paddingTop: topPadding }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation?.goBack?.()}>
            <Text style={styles.headerIcon}>{'‹'}</Text>
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/kim.png')} style={styles.profileImage} />
            <Text style={styles.userName}>Kim Gaeul</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation?.navigate?.('Settings')}
        >
          <AntDesign name="setting" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <View style={styles.goalsHeader}>
          <FontAwesome5 name="bullseye" size={34} color="#F56B6B" />
          <Text style={styles.goalsTitle}>Goals</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {goals.map((goal) => {
            const past = isPastDue(goal);
            const expanded = expandedGoalId === goal.id;
            return (
              <View key={goal.id} style={[styles.goalCard, past ? styles.pastDueCard : null]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={past}
                  onPress={() => toggleExpand(goal.id)}
                >
                  <View style={styles.goalRow}>
                    <Text style={[styles.goalTitle, past ? styles.pastDueText : null]}>{goal.title}</Text>
                    <Text style={[styles.goalDue, past ? styles.pastDueText : null]}>Due: {goal.due}</Text>
                  </View>

                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${(Number(goal.progress) || 0) * 100}%`, backgroundColor: goal.color },
                      ]}
                    />
                  </View>

                  <Text style={[styles.goalAmount, past ? styles.pastDueText : null]}>
                    {Number(goal.current || 0).toLocaleString()}/{Number(goal.target || 0).toLocaleString()}
                  </Text>
                </TouchableOpacity>

                {expanded && (
                  <View style={styles.expandedArea}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailText}>Progress: {Math.round(((goal.progress ?? (goal.target ? (goal.current || 0) / goal.target : 0)) || 0) * 100)}%</Text>
                      <Text style={styles.detailText}>Target: {Number(goal.target || 0).toLocaleString()}</Text>
                    </View>

                    {goal.note ? (
                      <Text style={styles.noteText}>{goal.note}</Text>
                    ) : null}

                    <TextInput
                      style={styles.amountInput}
                      placeholder="Enter amount"
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={amountInputs[goal.id] || ''}
                      onChangeText={(t) => setAmountInputs((prev) => ({ ...prev, [goal.id]: t }))}
                    />

                    <View style={styles.actionRow}>
                      <TouchableOpacity style={[styles.smallButton, styles.addBtn]} onPress={() => handleAdjustGoal(goal.id, true)}>
                        <Text style={styles.buttonText}>Add</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.smallButton, styles.withdrawBtn]} onPress={() => handleAdjustGoal(goal.id, false)}>
                        <Text style={styles.buttonText}>Withdraw</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.smallButton, styles.deleteBtn]} onPress={() => handleDeleteGoal(goal.id)}>
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
          
        {/** ----- Add Goals Button ------ */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setModalType('add');
            setModalVisible(true);
          }}
          accessibilityLabel="Add Goals"
        >
          <Ionicons name="add-circle" size={18} color="#fff" />
          <Text style={styles.addText}>Add Goals</Text>
        </TouchableOpacity>

        {/* AddGoalModal rendered as a pop-up */}
        <AddGoalModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={(goal) => {
            handleAddGoal(goal);
            setModalVisible(false);
          }}
        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6CA16B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
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
    fontSize: 22,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  userName: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  settingsButton: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#FAF9F6',
    borderRadius: 23,
    padding: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '90%',
    height: '70%',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 6 },
          },
          android: {
            elevation: 3,
          },
        }),
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalsTitle: {
    marginLeft: 8,
    fontSize: 34,
    fontWeight: '900',
    color: '#EA580C',
    marginLeft: 8,
  },
  goalCard: {
    backgroundColor: '#FAF9F6',
    borderRadius: 23,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '98%',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 3 },
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#374151',
  },
  goalDue: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 4,
  },
  goalAmount: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 12,
    alignSelf: 'center',
    width: '40%',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 16,
  },
  pastDueCard: {
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },
  pastDueText: {
    color: '#9CA3AF',
  },
  expandedArea: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  detailText: {
    color: '#374151',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteText: {
    color: '#4B5563',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: '#22C55E',
  },
  withdrawBtn: {
    backgroundColor: '#F59E0B',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});