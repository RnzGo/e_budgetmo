// components/MonthYearPicker.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import globalStyles from '../styles/globalStyles';
import { AntDesign } from "@expo/vector-icons";

export default function MonthYearPicker(props) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const now = new Date();
  const currentYear = now.getFullYear();
  const [year, setYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

const styles = globalStyles.MonthYearPicker;
  useEffect(() => {
    if (props.initialDate instanceof Date) {
      setYear(props.initialDate.getFullYear());
      setSelectedMonth(props.initialDate.getMonth());
    }
  }, [props.initialDate]);

  const handlePrevYear = () => setYear((y) => y - 1);
  const handleNextYear = () => setYear((y) => y + 1);

  const handleSelectMonth = (index) => {
    setSelectedMonth(index);
    const chosen = new Date(year, index, 1);
    if (props.onChange) {
      props.onChange(chosen);
    }
  };

  const handleApply = () => {
    const chosen = new Date(year, selectedMonth, 1);
    if (props.onApply) props.onApply(chosen);
    // Do not auto-close here; parent may close modal in response to onApply.
    // But we also call onClose if parent expects it.
    if (props.autoCloseOnApply && props.onClose) {
      props.onClose();
    }
  };

  const handleClose = () => {
    if (props.onClose) props.onClose();
  };

  return (
    <View style={styles.container}>
      {/* Header with year and navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevYear} style={styles.iconButton}>
          <AntDesign name="left" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.yearContainer}
          activeOpacity={0.8}
          onPress={() => {
            if (props.onOpenYear) props.onOpenYear();
          }}
        >
          <Text style={styles.yearText}>{year}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextYear} style={styles.iconButton}>
          <AntDesign name="right" size={16} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Grid of months */}
      <View style={styles.monthGrid}>
        {months.map((month, index) => {
          const selected = selectedMonth === index;
          return (
            <TouchableOpacity
              key={month}
              onPress={() => handleSelectMonth(index)}
              style={[styles.monthButton, selected && styles.selectedMonth]}
              activeOpacity={0.8}
            >
              <Text style={[styles.monthText, selected && styles.selectedMonthText]}>
                {month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer controls (Apply / Close) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleClose} style={[styles.ctrlButton, styles.cancelButton]}>
          <Text style={styles.ctrlText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleApply} style={[styles.ctrlButton, styles.applyButton]}>
          <Text style={[styles.ctrlText, { color: '#fff' }]}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// use global styles
