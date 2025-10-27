import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddEntryModal({ visible, type, onClose, onSubmit }) {
  const title = type === 'expense' ? 'Add Expense' : 'Add Income';

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!visible) {
      setDate('');
      setCategory('');
      setAmount('');
      setNote('');
    }
  }, [visible]);

  function handleSubmit() {
    const parsed = parseFloat(amount);
    if (Number.isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount greater than zero.');
      return;
    }

    const entry = {
      type: type === 'expense' ? 'expense' : 'income',
      date: date || new Date().toISOString(),
      category: category || 'Uncategorized',
      amount: parsed,
      note: note || '',
      id: `${Date.now()}`,
    };

    if (typeof onSubmit === 'function') onSubmit(entry);
    if (typeof onClose === 'function') onClose();
  }

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent={true}
      visible={!!visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.content}>
            {/* Date Form */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date:</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD or leave blank"
                placeholderTextColor="#999"
                value={date}
                onChangeText={setDate}
              />
            </View>

            {/* Category Form */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Category:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Category"
                placeholderTextColor="#999"
                value={category}
                onChangeText={setCategory}
              />
            </View>

            {/* Amount Form */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Note Form */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Note:</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter Note"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={note}
                onChangeText={setNote}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onClose}
              accessibilityLabel="Close"
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.submitButton]}
              onPress={handleSubmit}
              accessibilityLabel="Submit"
            >
              <Text style={[styles.actionText, { color: '#fff' }]}>{type === 'expense' ? 'Add Expense' : 'Add Income'}</Text>
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
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});