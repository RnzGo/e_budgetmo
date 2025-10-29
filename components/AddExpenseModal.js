import React, { useState, useEffect } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';

import FullDatePicker from './FullDatePicker';

// Expense-specific category suggestions
const EXPENSE_SUGGESTIONS = ['Food', 'Transport', 'Rent', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];

export default function AddExpenseModal({ visible, onClose = () => {}, title, onSubmit = () => {} }) {
  const modalTitle = title || 'Add Expense';
  const [date, setDate] = useState(null);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [category, setCategory] = useState('');
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    const parsedAmt = parseFloat(amount);
    const payload = {
      date,
      category,
      amount: Number.isNaN(parsedAmt) ? 0 : parsedAmt,
      note,
      type: 'expense',
    };
    try {
      onSubmit(payload);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (!visible) {
      setShowCategorySuggestions(false);
      setShowDatePicker(false);
    }
  }, [visible]);

  return (
    <Modal animationType="fade" transparent statusBarTranslucent={true} visible={!!visible} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.header}>
                <Text style={styles.title}>{modalTitle}</Text>
              </View>

              <View style={styles.content}>
                {/* Date Form */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}><Text style={styles.required}>*</Text> Date:</Text>
                  <TouchableOpacity
                    style={[styles.input, styles.dateInput]}
                    onPress={() => {
                      Keyboard.dismiss();
                      const start = date ? new Date(date) : new Date();
                      setPickerDate(start);
                      setShowDatePicker(true);
                    }}
                  >
                    <Text style={{ color: date ? '#111' : '#999' }}>{date ? new Date(date).toLocaleDateString() : 'Select date'}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <View style={styles.inlinePickerContainer}>
                      <FullDatePicker
                        initialDate={pickerDate}
                        onApply={(d) => {
                          setDate(d.toISOString());
                          setShowDatePicker(false);
                        }}
                        onClose={() => setShowDatePicker(false)}
                      />
                    </View>
                  )}
                </View>

                {/* Category Form */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Category:</Text>
                  <View style={styles.relativeWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter category"
                      placeholderTextColor="#999"
                      value={category}
                      onChangeText={(t) => { setCategory(t); setShowCategorySuggestions(true); }}
                      onFocus={() => { setShowCategorySuggestions(true); }}
                    />

                    {showCategorySuggestions && (
                      <View style={styles.suggestionsBox}>
                        <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 160 }}>
                          {EXPENSE_SUGGESTIONS.filter((s) => s.toLowerCase().includes((category || '').toLowerCase())).map((item) => (
                            <TouchableOpacity key={item} style={styles.suggestionItem} onPress={() => { setCategory(item); setShowCategorySuggestions(false); }}>
                              <Text>{item}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </View>

                {/* Amount Form */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}><Text style={styles.required}>*</Text> Amount:</Text>
                  <TextInput style={styles.input} placeholder="Enter Amount" placeholderTextColor="#999" keyboardType="numeric" value={amount} onChangeText={setAmount} />
                </View>

                {/* Note Form */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Note:</Text>
                  <TextInput style={styles.textArea} placeholder="Enter Note" placeholderTextColor="#999" multiline numberOfLines={4} value={note} onChangeText={setNote} />
                </View>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onClose} accessibilityLabel="Close">
                  <Text style={styles.actionText}>Cancel</Text>
                </TouchableOpacity>

                {(() => {
                  const parsedAmt = parseFloat(amount);
                  const isAmountValid = !Number.isNaN(parsedAmt) && parsedAmt > 0;
                  const isDateValid = date && !Number.isNaN(new Date(date).getTime());
                  const submitDisabled = !(isAmountValid && isDateValid);

                  return (
                    <TouchableOpacity style={[styles.actionButton, submitDisabled ? styles.disabledButton : styles.submitButton]} onPress={handleSubmit} accessibilityLabel="Submit" accessibilityState={{ disabled: submitDisabled }} disabled={submitDisabled}>
                      <Text style={[styles.actionText, submitDisabled ? styles.disabledText : { color: '#fff' }]}>{'Add Expense'}</Text>
                    </TouchableOpacity>
                  );
                })()}
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { width: '100%', maxWidth: 420, maxHeight: '90%', backgroundColor: '#fff', borderRadius: 12, padding: 16, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  scrollContent: { paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#222' },
  content: { minHeight: 120, justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  fieldContainer: { width: '100%', paddingBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, width: '100%' },
  dateInput: { justifyContent: 'center' },
  inlinePicker: { marginTop: 8, backgroundColor: '#fff', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: '#EEE' },
  inlinePickerContainer: { marginTop: 8 },
  suggestionsBox: { marginTop: 6, borderWidth: 1, borderColor: '#EEE', backgroundColor: '#FFF', borderRadius: 6, maxHeight: 120 },
  suggestionItem: { paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  relativeWrapper: { position: 'relative', width: '100%' },
  textArea: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, width: '100%', height: 100, textAlignVertical: 'top' },
  footer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  actionButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  cancelButton: { backgroundColor: '#f0f0f0' },
  submitButton: { backgroundColor: '#4CAF50' },
  disabledButton: { backgroundColor: '#C8C8C8' },
  actionText: { fontSize: 16, fontWeight: '600', color: '#333' },
  disabledText: { color: '#6B6B6B' },
  required: { color: '#E53E3E', marginRight: 6, fontWeight: '700' },
});
