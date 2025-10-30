// GoalsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity, Image, StatusBar, TextInput, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import AddGoalModal from '../components/AddGoalModal';
import { useFinance } from '../context/FinanceContext';

const goalsData = [];

export default function GoalsScreen({ navigation }) {
  // Add top padding so header doesn't overlap the device status bar / notch
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [goals, setGoals] = useState(goalsData);
  const [expandedGoalId, setExpandedGoalId] = useState(null);
  const [amountInputs, setAmountInputs] = useState({}); // keyed by goal id
  const { addEntry } = useFinance();

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
    // capture goal info for creating corresponding finance entry
    const goal = goals.find((g) => g.id === goalId) || { title: 'Goal' };

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

    // create a corresponding finance entry so Statistics and Transactions include this movement
    try {
      const entryPayload = {
        date: new Date().toISOString(),
        // use the user-entered category for the goal (e.g., 'Device'), even if the goal is shown under 'Others'
        category: goal.category || 'Uncategorized',
        amount: amt,
        // use the goal title itself as the transaction title
        title: goal.title || 'Goal',
        // adding money to a goal reduces available cash -> treat as expense; withdrawing returns cash -> income
        type: isAdd ? 'expense' : 'income',
      };
      addEntry(entryPayload);
    } catch (e) {
      console.warn('Failed to add finance entry for goal adjustment', e);
    }

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
      category: newGoal.category || newGoal.categoryName || 'Uncategorized',
      target: Number(newGoal.targetAmount) || Number(newGoal.target) || 0,
      note: newGoal.note || '',
      color: newGoal.color || '#3B82F6',
    };

    setGoals((prev) => [goal, ...prev]);
  }

  // Predefined category order to display. 'Others' will contain uncategorized or custom categories.
  const CATEGORY_ORDER = ['Savings', 'Emergency', 'Vacation', 'Education', 'Investment', 'Bills'];

  function renderGoalCard(goal) {
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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <Text style={[styles.goalAmount, past ? styles.pastDueText : null]}>
              {Number(goal.current || 0).toLocaleString()}/{Number(goal.target || 0).toLocaleString()}
            </Text>
            <Text style={[styles.goalAmount, past ? styles.pastDueText : null]}> {goal && Number(goal.target) > 0
                ? `${Math.round((Number(goal.current || 0) / Number(goal.target)) * 100)}%`
                : `${Math.round(((goal.progress ?? 0) || 0) * 100)}%`}
            </Text>
          </View>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.expandedArea}>
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
          {(() => {
            // group goals by predefined categories; uncategorized/custom go to 'Others'
            const groups = {};
            CATEGORY_ORDER.forEach((c) => { groups[c] = []; });
            groups['Others'] = [];

            goals.forEach((g) => {
              const cat = (g.category || '').trim();
              if (cat && groups.hasOwnProperty(cat)) groups[cat].push(g);
              else groups['Others'].push(g);
            });

            // render each category section in order
            return [...CATEGORY_ORDER, 'Others'].map((cat) => (
              <View key={cat} style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#374151', marginBottom: 6 }}>{cat}</Text>
                {groups[cat].length === 0 ? (
                  <View style={[styles.goalCard, { paddingVertical: 18, alignItems: 'center' }]}>
                    <Text style={{ color: '#9CA3AF' }}>-No Goals Yet-</Text>
                  </View>
                ) : (
                  groups[cat].map((goal) => renderGoalCard(goal))
                )}
              </View>
            ));
          })()}
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

const styles = globalStyles.GoalsScreen;