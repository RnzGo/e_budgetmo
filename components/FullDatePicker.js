import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
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
        {['S','M','T','W','T','F','S'].map((w, i) => (
          <Text key={`weekday-${i}`} style={styles.weekday}>{w}</Text>
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

const styles = globalStyles.FullDatePicker;
