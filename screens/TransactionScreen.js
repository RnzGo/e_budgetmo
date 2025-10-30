import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio,
} from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddIncomeModal from '../components/AddIncomeModal';
import AddExpenseModal from '../components/AddExpenseModal';

const styles = globalStyles.TransactionScreen;

function TransactionScreen({ navigation }) {
  const { finance, addEntry } = useFinance();
  const entries = (finance && finance.entries) || [];
  const [goals, setGoals] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@e_budgetmo_goals');
        if (!mounted) return;
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setGoals(parsed);
        }
      } catch (err) {
        console.warn('Failed to load goals for transactions', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Merge finance entries with goal transactions (map goal.transactions to transaction entries)
  const mergedEntries = React.useMemo(() => {
    // copy existing finance entries
    const existing = Array.isArray(entries) ? entries.slice() : [];

    // build a set of keys to avoid duplicates: dateISO|amount|title|category
    const existingKeys = new Set();
    for (const e of existing) {
      try {
        const dateISO = e?.date ? new Date(e.date).toISOString() : '';
        const amt = Math.abs(Number(e.amount) || 0);
        const title = (e.title || e.note || '').toString();
        const category = (e.category || '').toString();
        existingKeys.add(`${dateISO}|${amt}|${title}|${category}`);
      } catch (err) {
        // ignore
      }
    }

    const mapped = [];
    if (Array.isArray(goals)) {
      for (const g of goals) {
        const txs = Array.isArray(g.transactions) ? g.transactions : [];
        for (const t of txs) {
          if (!t || !t.date) continue;
          const dateISO = new Date(t.date).toISOString();
          const amt = Math.abs(Number(t.amount) || 0);
          const title = g.title || '';
          const category = g.category || '';
          const type = (Number(t.amount) || 0) > 0 ? 'expense' : 'income';
          const key = `${dateISO}|${amt}|${title}|${category}`;
          if (!existingKeys.has(key)) {
            mapped.push({
              id: t.id ?? `goal-${g.id}-${dateISO}`,
              date: dateISO,
              amount: amt,
              title,
              category,
              type,
            });
            existingKeys.add(key);
          }
        }
      }
    }

    return [...existing, ...mapped];
  }, [entries, goals]);
  const [incomeModalVisible, setIncomeModalVisible] = React.useState(false);
  const [expenseModalVisible, setExpenseModalVisible] = React.useState(false);

  return (
    <View style={styles.root}>
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
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="view-list" size={34} color="#4B7BE5" />
            <Text style={styles.cardTitle}>Transactions</Text>
          </View>

          <View style={styles.cardBody}>
            <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={true}>
                {(() => {
                  // Sort entries by date (newest first). We merge finance.entries with goal.transactions mapped into entries.
                  const sorted = (mergedEntries || []).slice().sort((a, b) => {
                    const ta = a?.date ? new Date(a.date).getTime() : 0;
                    const tb = b?.date ? new Date(b.date).getTime() : 0;
                    return tb - ta;
                  });

                  return sorted.length === 0 ? (
                    <View style={styles.card}>
                      <Text style={{ color: '#666' }}>No transactions yet.</Text>
                    </View>
                  ) : (
                    sorted.map((e, idx) => (
                      <View key={`${e.id ?? idx}`} style={styles.transRow}>
                        <View style={styles.transLeft}>
                          <View
                            style={[
                              styles.transIcon,
                              { backgroundColor: e.type === 'income' ? '#71c45a' : '#eb4d4b' },
                            ]}
                          >
                            <MaterialIcons name={e.type === 'income' ? 'attach-money' : 'money-off'} size={16} color="#fff" />
                          </View>
                          <View style={{ marginLeft: 8, flexShrink: 1 }}>
                            <Text style={styles.transTitle}>{e.title || e.note || (e.type === 'income' ? 'Income' : 'Expense')}</Text>
                            <Text style={styles.transDate}>{e.date ? new Date(e.date).toLocaleDateString() : ''}</Text>
                          </View>
                        </View>

                        <View style={styles.transAmountContainer}>
                          <Text style={[styles.transAmount, { color: e.type === 'income' ? '#2D6CDF' : '#F56B6B' }]}> 
                            {e.type === 'income' ? '+' : '-'}₱{Math.abs(Number(e.amount || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </Text>
                          <Text style={styles.transCategory}>{e.category || (e.type === 'income' ? 'Income' : 'Expense')}</Text>
                        </View>
                      </View>
                    ))
                  );
                })()}
            </ScrollView>
          </View>

          {/* Buttons inside card */}
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.addIncomeBtn} onPress={() => setIncomeModalVisible(true)}>
                <MaterialIcons name="add-circle" size={20} color="#FFFFFF" style={styles.addBtnIcon} />
              <Text style={styles.addBtnText}>Add Income</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addExpenseBtn} onPress={() => setExpenseModalVisible(true)}>
              <MaterialIcons name="remove-circle" size={20} color="#FFFFFF" style={styles.addBtnIcon} />
              <Text style={styles.addBtnText}>Add Expenses</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.statsBtnSmall} onPress={() => navigation?.navigate?.('Statistics_Page')}>
              <MaterialIcons name="show-chart" size={18} color="white" style={styles.addBtnIcon} />
              <Text style={styles.statsBtnText}>View Statistics</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ height: 48 }} />
      </ScrollView>

        <AddIncomeModal
          visible={incomeModalVisible}
          onClose={() => setIncomeModalVisible(false)}
          onSubmit={(payload) => {
            try { addEntry(payload); } catch (e) { console.warn('Failed to add income', e); }
            setIncomeModalVisible(false);
          }}
        />

        <AddExpenseModal
          visible={expenseModalVisible}
          onClose={() => setExpenseModalVisible(false)}
          onSubmit={(payload) => {
            try { addEntry(payload); } catch (e) { console.warn('Failed to add expense', e); }
            setExpenseModalVisible(false);
          }}
        />
    </View>
  );
}

export default TransactionScreen;

