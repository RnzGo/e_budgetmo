import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function FullDatePicker({ initialDate, onApply, onClose }) {
  const start = initialDate instanceof Date ? initialDate : new Date();
  const [year, setYear] = useState(start.getFullYear());
  const [month, setMonth] = useState(start.getMonth());
  const [day, setDay] = useState(start.getDate());

  useEffect(() => {
    if (initialDate instanceof Date) {
      setYear(initialDate.getFullYear());
      setMonth(initialDate.getMonth());
      setDay(initialDate.getDate());
    }
  }, [initialDate]);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const firstWeekday = (y, m) => new Date(y, m, 1).getDay(); // 0=Sun

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11); setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0); setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const handleDayPress = (d) => setDay(d);

  const handleApply = () => {
    const chosen = new Date(year, month, day);
    if (onApply) onApply(chosen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth} style={styles.iconButton}>
          <AntDesign name="left" size={16} color="#777" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.monthText}>{months[month]} {year}</Text>
        </View>

        <TouchableOpacity onPress={nextMonth} style={styles.iconButton}>
          <AntDesign name="right" size={16} color="#777" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysRow}>
        {['S','M','T','W','T','F','S'].map((w) => (
          <Text key={w} style={styles.weekday}>{w}</Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {Array.from({ length: firstWeekday(year, month) }).map((_, i) => (
          <View key={`pad-${i}`} style={styles.dayCell} />
        ))}

        {Array.from({ length: daysInMonth(year, month) }).map((_, idx) => {
          const d = idx + 1;
          const selected = d === day;
          return (
            <TouchableOpacity key={d} style={[styles.dayCell, selected && styles.selectedDay]} onPress={() => handleDayPress(d)}>
              <Text style={[styles.dayText, selected && styles.selectedDayText]}>{d}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onClose} style={[styles.ctrlButton, styles.cancelButton]}>
          <Text style={styles.ctrlText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleApply} style={[styles.ctrlButton, styles.applyButton]}>
          <Text style={[styles.ctrlText, { color: '#fff' }]}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconButton: {
    padding: 6,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  weekday: {
    width: `${100/7}%`,
    textAlign: 'center',
    color: '#666',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: `${100/7}%`,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#111',
  },
  selectedDay: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '700',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctrlButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F2F3F4',
  },
  applyButton: {
    backgroundColor: '#7FB56A',
  },
  ctrlText: {
    fontSize: 15,
    color: '#111',
    fontWeight: '600',
  },
});
