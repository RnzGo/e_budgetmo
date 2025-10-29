// Statistics_Page.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import MonthYearPicker from '../components/MonthYearPicker';             
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFinance } from '../context/FinanceContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Responsive helpers (simple normalize based on screen width)
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const guidelineBaseWidth = 375; // iPhone 8 width baseline
const scale = SCREEN_WIDTH / guidelineBaseWidth;
function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

/**
 * Helper to create a donut slice path.
 * startAngle/endAngle in degrees (0..360), 0 at top, clockwise
 */
function describeDonutSlice(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const toRad = (deg) => (Math.PI / 180) * (deg - 90); // shift so 0 is top
  const startOuter = { x: cx + rOuter * Math.cos(toRad(startAngle)), y: cy + rOuter * Math.sin(toRad(startAngle)) };
  const endOuter = { x: cx + rOuter * Math.cos(toRad(endAngle)), y: cy + rOuter * Math.sin(toRad(endAngle)) };
  const startInner = { x: cx + rInner * Math.cos(toRad(endAngle)), y: cy + rInner * Math.sin(toRad(endAngle)) };
  const endInner = { x: cx + rInner * Math.cos(toRad(startAngle)), y: cy + rInner * Math.sin(toRad(startAngle)) };

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  // Path: move to startOuter -> arc to endOuter -> line to startInner -> arc back to endInner -> close
  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ');
}

// approximate centroid for a donut slice for placing label
function donutSliceCentroid(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const mid = (startAngle + endAngle) / 2;
  const rad = (Math.PI / 180) * (mid - 90);
  const radius = (rOuter + rInner) / 2;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

export default function Statistics_Page({ navigation }) {
  // Picker date state
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false); // opens MonthYearPicker modal
  const [pickerTempSelection, setPickerTempSelection] = useState(null); // fallback if child returns selection

  /* We used react-native-svg library for the Donut Pie Chart for this screen */

  // Use shared finance data for Income and Expenses; keep Goals exclusive to this screen
  const { finance } = useFinance();
  // Local persisted goals (stored by GoalsScreen in AsyncStorage)
  const [goals, setGoals] = useState([]);

  // Load goals from AsyncStorage so we can sum their "current" amounts
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
        // silently ignore - keep goals as []
        console.warn('Failed to load goals for Statistics page', err);
      }
    })();
    return () => { mounted = false; };
  }, []);
  // Helpers to move month selection
  const prevMonth = () => setSelectedMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setSelectedMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // Compute monthly totals by filtering entries for selected month
  const data = useMemo(() => {
    const entries = Array.isArray(finance?.entries)
      ? finance.entries.filter((e) => e && (e.type === 'income' || e.type === 'expense'))
      : [];
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    let incomeVal = 0;
    let expenseVal = 0;

    for (const e of entries) {
      const d = e && e.date ? new Date(e.date) : null;
      if (!d || Number.isNaN(d.getTime())) continue;
      if (d.getFullYear() === year && d.getMonth() === month) {
        if (e.type === 'income') incomeVal += Number(e.amount) || 0;
        if (e.type === 'expense') expenseVal += Number(e.amount) || 0;
      }
    }

    // Goals: sum only the amounts added to goals during the selected month.
    // We record goal transactions when users add/withdraw in GoalsScreen; each transaction has { date, amount }.
    const goalsVal = Array.isArray(goals)
      ? goals.reduce((acc, g) => {
          const txs = Array.isArray(g.transactions) ? g.transactions : [];
          const monthSum = txs.reduce((s, t) => {
            if (!t || !t.date) return s;
            const td = new Date(t.date);
            if (Number.isNaN(td.getTime())) return s;
            if (td.getFullYear() === year && td.getMonth() === month) {
              const amt = Number(t.amount) || 0;
              // only count positive additions toward goals for statistics
              return s + (amt > 0 ? amt : 0);
            }
            return s;
          }, 0);
          return acc + monthSum;
        }, 0)
      : 0;
    const total = incomeVal + expenseVal + goalsVal;
    const isEmpty = incomeVal + expenseVal === 0;

    const make = (key, label, value, color) => {
      let finalColor = color;
      if (isEmpty && (key === 'income' || key === 'expenses')) finalColor = '#CCCCCC';
      if (key === 'goals' && Number(value) === 0) finalColor = '#CCCCCC';
      return {
        key,
        label,
        value,
        percent: total > 0 ? (value / total) * 100 : 0,
        color: finalColor,
      };
    };

    return [
      make('income', 'Income', incomeVal, '#7BBF6D'),
      make('expenses', 'Expenses', expenseVal, '#E5635E'),
      make('goals', 'Goals', goalsVal, '#F29C4A'),
    ];
  }, [finance?.entries, selectedMonth, goals]);

  // Compute slices angles (startAngle, endAngle)
  const slices = useMemo(() => {
    let start = 0;
    return data.map((d) => {
      const sweep = (d.percent / 100) * 360;
      const slice = { ...d, startAngle: start, endAngle: start + sweep };
      start += sweep;
      return slice;
    });
  }, [data]);

  // Remaining balance calculation: compute as this month's income minus
  // this month's expenses and this month's goal additions. This matches
  // the expected example: remaining = income - expenses - goals
  const remainingBalance = (() => {
    const incomeMonth = data.find((d) => d.key === 'income')?.value || 0;
    const expenseMonth = data.find((d) => d.key === 'expenses')?.value || 0;
    const goalsMonth = data.find((d) => d.key === 'goals')?.value || 0;
    return incomeMonth - expenseMonth - goalsMonth;
  })();

  // Format a percent number to at most 2 decimal places (hundredths)
  function formatPercent(p) {
    if (typeof p !== 'number' || Number.isNaN(p)) return '0';
    // Fix to 2 decimals then strip trailing zeros
    const fixed = p.toFixed(2); // e.g. "12.30"
    return parseFloat(fixed).toString(); // "12.3" or "12" or "12.34"
  }

  // Responsive geometry: scale chart to screen width (max 320)
  const svgSize = Math.min(Math.round(SCREEN_WIDTH * 0.85), 320);
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const outerR = Math.round(svgSize * 0.44);
  const innerR = Math.round(svgSize * 0.22);

  // Top padding to avoid status bar / notch overlap:
  const topPadding =
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 44; // 44 is a safe default for iOS notch

  // Handler called by child MonthYearPicker when the user picks a date (if it supports onApply)
  const handlePickerApply = (newDate) => {
    // newDate should be a JS Date object (e.g. new Date(2025, 0))
    if (newDate && newDate instanceof Date) {
      setSelectedMonth(newDate);
    } else if (newDate && typeof newDate === 'object') {
      // fallback if child sends { year, month }
      if (typeof newDate.year === 'number' && typeof newDate.month === 'number') {
        setSelectedMonth(new Date(newDate.year, newDate.month));
      }
    }
    setPickerVisible(false);
  };

  // Fallback "Apply" from wrapper: apply temp selection if child uses a callback to set it
  const applyTempSelection = () => {
    if (pickerTempSelection && pickerTempSelection instanceof Date) {
      setSelectedMonth(pickerTempSelection);
    } else if (pickerTempSelection && typeof pickerTempSelection === 'object') {
      if (typeof pickerTempSelection.year === 'number' && typeof pickerTempSelection.month === 'number') {
        setSelectedMonth(new Date(pickerTempSelection.year, pickerTempSelection.month));
      }
    }
    setPickerVisible(false);
    setPickerTempSelection(null);
  };

  return (
    <View style={[styles.root, { paddingTop: topPadding }]}> 
      {/* Header area (fixed) */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation?.goBack?.()}>
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
          onPress={() => navigation.navigate('Settings')}>
          <AntDesign name="setting" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.smallTitle}>Statistics</Text>
          <Text style={styles.bigTitle}>Monthly Activity</Text>
          <View style={styles.horizontalLine} />

          {/* Month & Year Picker with prev/next buttons */}
          <View style={styles.pickerRow}>
            <TouchableOpacity onPress={prevMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-back" size={20} color="#615E83" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerBox}
              onPress={() => setPickerVisible(true)} // open MonthYearPicker component
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.pickerText}>
                  {selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#615E83" style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={nextMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-forward" size={20} color="#615E83" />
            </TouchableOpacity>
          </View>

          {/* Modal that displays your MonthYearPicker component from components folder */}
          <Modal
            visible={pickerVisible}
            transparent
            animationType="fade"
            onRequestClose={() => {
              setPickerVisible(false);
              setPickerTempSelection(null);
            }}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalWrapper}>
                {/* Pass onApply and onClose to the child component.
                    If your MonthYearPicker component calls props.onApply(date) the wrapper will update selectedMonth automatically.
                    If it doesn't, the component's own Apply/Cancel will handle selection. */}
                <MonthYearPicker
                  onApply={(date) => {
                    handlePickerApply(date);
                  }}
                  onClose={() => {
                    setPickerVisible(false);
                    setPickerTempSelection(null);
                  }}
                  onChange={(temp) => {
                    // child may call with Date or {year, month} - we stash it as a fallback
                    setPickerTempSelection(temp);
                  }}
                />
                {/* removed modal-level Close/Apply buttons as requested */}
              </View>
            </View>
          </Modal>

        {/** ------ CHART CONTAINER ------ */}
          <View style={styles.chartContainer}>
              <Svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
              <G>
                {/* subtle background circle ring */}
                <Circle cx={cx} cy={cy} r={outerR + 6} fill="rgba(0,0,0,0.03)" />

                {slices.map((s) => (
                  <G key={s.key}>
                    <Path
                      d={describeDonutSlice(cx, cy, outerR, innerR, s.startAngle, s.endAngle)}
                      fill={s.color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                    {/* percentage label */}
                    {(() => {
                      const { x, y } = donutSliceCentroid(cx, cy, outerR, innerR, s.startAngle, s.endAngle);
                      return (
                        <SvgText
                          key={`label-${s.key}`}
                          x={x}
                          y={y}
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="700"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                        >
                          {`${formatPercent(s.percent)}%`}
                        </SvgText>
                      );
                    })()}
                  </G>
                ))}

                {/* inner white donut hole to match design */}
                <Circle cx={cx} cy={cy} r={innerR - 1} fill="#fff" />
              </G>
            </Svg>
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {data.map((d) => (
              <View key={d.key} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: d.color }]} />
                <Text style={styles.legendText}>{d.label}</Text>
                <Text style={styles.legendValue}>
                  {d.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Text>
              </View>
            ))}
            {/* Remaining balance after this month's expenses and goal additions */}
            <View style={styles.remainingRow}>
              <Text style={styles.remainingLabel}>Remaining Balance</Text>
              <Text style={styles.remainingValue}>{remainingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5', // header background color (green)
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: normalize(36),
    height: normalize(36),
    borderRadius: normalize(18),
    backgroundColor: '#FFF0E6', // placeholder avatar color
    marginRight: 8,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  headerRight: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  settingsIcon: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#fff', // placeholder for gear icon
    opacity: 0.95,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8, // small gap between back button and profile
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

  card: {
    marginTop: 12,
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    padding: 14,
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
  smallTitle: {
    color: '#8B5CF6',
    fontWeight: 'bold',
    fontSize: normalize(22),
    marginBottom: 4,
  },
  bigTitle: {
    fontSize: normalize(34),
    fontWeight: 'bold',
    fontFamily: 'Poppins-ExtraBold',
    color: '#111827',
    marginBottom: 12,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    marginBottom: 20,
  },
  pickerRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBox: {
    width: normalize(170),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthNavButton: {
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(6),
    marginHorizontal: normalize(8),
    borderRadius: normalize(8),
  },
  pickerText: {
    fontSize: normalize(16),
    color: '#111827',
    paddingVertical: normalize(14),
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  legend: {
    marginTop: 6,
    paddingTop: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  legendDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: 999, // ensure perfectly round on all screen densities
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    marginRight: normalize(10),
  },
  legendText: {
    flex: 1,
    color: '#615E83',
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  legendValue: {
    color: '#6B7280',
    fontSize: normalize(16),
  },
  remainingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  remainingLabel: {
    color: '#374151',
    fontWeight: '700',
    fontSize: normalize(16),
  },
  remainingValue: {
    color: '#111827',
    fontWeight: '800',
    fontSize: normalize(16),
  },
  homeIndicator: {
    height: normalize(6),
    alignSelf: 'center',
    backgroundColor: '#787878',
    width: normalize(100),
    borderRadius: normalize(6),
    marginTop: 18,
  },

  /* Modal wrapper used when calling MonthYearPicker component */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.26)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  modalCloseButton: {
    marginTop: 12,
    backgroundColor: '#7FB56A',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: '700',
  },
});
