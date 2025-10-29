import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AddGoalModal({ visible, onClose, onSubmit }) {
  const title = 'Add New Goal';

  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!visible) {
      setGoalTitle('');
      setGoalCategory('');
      setTargetAmount('');
      setDueDate('');
    }
  }, [visible]);

  function handleSubmit() {
    const parsedAmt = parseFloat(targetAmount);
    if (Number.isNaN(parsedAmt) || parsedAmt <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount greater than zero.');
      return;
    }

    // validate date string
    const parsedDate = new Date(dueDate);
    if (!dueDate || Number.isNaN(parsedDate.getTime())) {
      Alert.alert('Invalid date', 'Please enter a valid date in YYYY-MM-DD format.');
      return;
    }

    const goal = {
      id: `${Date.now()}`,
      title: goalTitle || 'New Goal',
      category: goalCategory || 'Uncategorized',
      targetAmount: parsedAmt,
      dueDate: parsedDate.toISOString(),
      progress: 0,
      current: 0,
    };

    if (typeof onSubmit === 'function') onSubmit(goal);
    if (typeof onClose === 'function') onClose();
  }

  const parsedAmtForDisable = parseFloat(targetAmount);
  const isAmountValid = !Number.isNaN(parsedAmtForDisable) && parsedAmtForDisable > 0;
  const isDateValid = dueDate && !Number.isNaN(new Date(dueDate).getTime());
  const submitDisabled = !(isAmountValid && isDateValid);

  return (
    <Modal animationType="fade" transparent statusBarTranslucent={true} visible={!!visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Goal Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Goal Title"
                placeholderTextColor="#999"
                value={goalTitle}
                onChangeText={setGoalTitle}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Category:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Category"
                placeholderTextColor="#999"
                value={goalCategory}
                onChangeText={setGoalCategory}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                <Text style={styles.required}>*</Text> Amount:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={targetAmount}
                onChangeText={setTargetAmount}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                <Text style={styles.required}>*</Text> Date:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                value={dueDate}
                onChangeText={setDueDate}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onClose} accessibilityLabel="Close">
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, submitDisabled ? styles.disabledButton : styles.submitButton]}
              onPress={handleSubmit}
              accessibilityLabel="Submit"
              accessibilityState={{ disabled: submitDisabled }}
              disabled={submitDisabled}
            >
              <Text style={[styles.actionText, submitDisabled ? styles.disabledText : { color: '#fff' }]}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // cover the entire screen regardless of parent layout
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  content: {
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  fieldContainer: {
    width: '100%',
    paddingBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#C8C8C8',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  disabledText: {
    color: '#6B6B6B',
  },
  required: {
    color: '#E53E3E',
    marginRight: 6,
    fontWeight: '700',
  },
});