// Statistics_Page.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import MonthYearPicker from '../components/MonthYearPicker';             
import { Ionicons } from '@expo/vector-icons';

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

  // Sample data (To be changed for backend)
  const data = useMemo(
    () => [
      { key: 'income', label: 'Income', value: 290000, percent: 58, color: '#7BBF6D' }, // green
      { key: 'expenses', label: 'Expenses', value: 110000, percent: 22, color: '#E5635E' }, // red
      { key: 'goals', label: 'Goals', value: 100000, percent: 20, color: '#F29C4A' }, // orange
    ],
    []
  );

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

  // SVG donut geometry (The size of the Pie Chart)
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 140;
  const innerR = 75;

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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header area (green) */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation?.goBack?.()}>
            <Text style={styles.headerIcon}>{'‹'}</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.avatar} />
            <Text style={styles.headerTitle}>Kim Gaeul</Text>
          </View>

          <TouchableOpacity style={styles.headerRight}>
            <View style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.smallTitle}>Statistics</Text>
          <Text style={styles.bigTitle}>Monthly Activity</Text>
          <View style={styles.horizontalLine} />

          {/* Month & Year Picker */}
          <View style={styles.pickerRow}>
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
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
                          {`${s.percent}%`}
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
          </View>
        </View>

        {/* Bottom home indicator mimic */}
        <View style={styles.homeIndicator} />
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
    height: 72,
    backgroundColor: '#7FB56A',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'left',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerIcon: {
    color: '#fff',
    fontSize: 22,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 22,
    marginBottom: 4,
  },
  bigTitle: {
    fontSize: 34,
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
  },
  pickerBox: {
    width: 170,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#111827',
    paddingVertical: 14,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendText: {
    flex: 1,
    color: '#615E83',
    fontWeight: 'bold',
    fontSize: 16,
  },
  legendValue: {
    color: '#6B7280',
    fontSize: 16,
  },
  homeIndicator: {
    height: 6,
    alignSelf: 'center',
    backgroundColor: '#787878',
    width: 100,
    borderRadius: 6,
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
