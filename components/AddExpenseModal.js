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
  Keyboard,
  Platform,
} from 'react-native';
import globalStyles from '../styles/globalStyles';

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
  const [titleText, setTitleText] = useState('');

  const handleSubmit = () => {
    const parsedAmt = parseFloat(amount);
    const payload = {
      date,
      category,
      amount: Number.isNaN(parsedAmt) ? 0 : parsedAmt,
      title: titleText,
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
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" scrollEnabled={!showCategorySuggestions}>
              <View style={styles.header}>
                <Text style={styles.title}>{modalTitle}</Text>
              </View>

              <View style={styles.content}>
                {/* Title Form */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Title:</Text>
                  <TextInput style={styles.input} placeholder="Enter Title" placeholderTextColor="#999" value={titleText} onChangeText={setTitleText} />
                </View>

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
                        <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} style={{ maxHeight: 160 }}>
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

const styles = globalStyles.AddExpenseModal;
