import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  // FlatList removed to avoid nested VirtualizedList inside ScrollView
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import globalStyles from '../styles/globalStyles';
import FullDatePicker from './FullDatePicker';

export const GOAL_CATEGORIES = [
  'Savings',
  'Emergency',
  'Vacation',
  'Education',
  'Investment',
  'Bills',
  'Entertainment',
  'Property',
  'Others',
];

export default function AddGoalModal({ visible, onClose, onSubmit }) {
  const title = 'Add New Goal';

  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [goalNote, setGoalNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [isCategoryCustom, setIsCategoryCustom] = useState(false);
  const categoryInputRef = useRef(null);

  

  useEffect(() => {
    if (!visible) {
      setGoalTitle('');
      setGoalCategory('');
      setTargetAmount('');
      setDueDate('');
      setShowDatePicker(false);
      setPickerDate(new Date());
      setShowCategorySuggestions(false);
      setIsCategoryCustom(false);
    }
  }, [visible]);

  function handleSubmit() {
    const parsedAmt = parseFloat(targetAmount);
    if (Number.isNaN(parsedAmt) || parsedAmt <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount greater than zero.');
      return;
    }

    // validate date
    const parsedDate = new Date(dueDate);
    if (!dueDate || Number.isNaN(parsedDate.getTime())) {
      Alert.alert('Invalid date', 'Please select a valid date.');
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
      note: goalNote || '',
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay} enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" scrollEnabled={!showCategorySuggestions}>
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
                  <View style={styles.relativeWrapper}>
                    {/* Category input: if custom mode allow typing, otherwise show a touchable that opens suggestions */}
                    {isCategoryCustom ? (
                      <TextInput
                        ref={categoryInputRef}
                        style={[styles.input]}
                        placeholder="Enter custom category"
                        placeholderTextColor="#999"
                        value={goalCategory}
                        editable={true}
                        onChangeText={(t) => setGoalCategory(t)}
                      />
                    ) : (
                      <TouchableOpacity
                        style={[styles.input, styles.pseudoInput]}
                        onPress={() => setShowCategorySuggestions(true)}
                        activeOpacity={0.8}
                      >
                        <Text style={{ color: goalCategory ? '#111' : '#999' }}>{goalCategory || 'Select category'}</Text>
                      </TouchableOpacity>
                    )}

                    {/* Clear button */}
                    <TouchableOpacity
                      onPress={() => { setGoalCategory(''); setShowCategorySuggestions(false); setIsCategoryCustom(false); }}
                      style={{ position: 'absolute', right: 8, top: 10, padding: 6 }}
                      accessibilityLabel="Clear category"
                    >
                      <Text style={{ color: '#999' }}>Clear</Text>
                    </TouchableOpacity>

                    {showCategorySuggestions && (
                      <View style={styles.suggestionsBox}>
                        {/* Non-virtualized list to avoid nesting VirtualizedLists inside a ScrollView */}
                        <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} style={{ maxHeight: 160 }}>
                          {GOAL_CATEGORIES
                            .filter((s) => s.toLowerCase().includes((goalCategory || '').toLowerCase()))
                            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
                            .map((item) => (
                            <TouchableOpacity
                              key={item}
                              style={styles.suggestionItem}
                              onPress={() => {
                                if (item === 'Custom') {
                                  setIsCategoryCustom(true);
                                  setGoalCategory('');
                                  // focus the input so user can type
                                  setTimeout(() => categoryInputRef.current?.focus?.(), 50);
                                } else {
                                  setGoalCategory(item);
                                  setIsCategoryCustom(false);
                                }
                                setShowCategorySuggestions(false);
                              }}
                            >
                              <Text>{item}</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}

                  </View>
                </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                <Text style={styles.required}>*</Text> Target Amount:
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
                  <Text style={styles.required}>*</Text> Due Date:
                </Text>
                <TouchableOpacity
                  style={[styles.input, styles.dateInput]}
                  onPress={() => {
                      // open simple date picker and dismiss keyboard
                      Keyboard.dismiss();
                      const start = dueDate ? new Date(dueDate) : new Date();
                      setPickerDate(start);
                      setShowDatePicker(true);
                  }}
                >
                  <Text style={{ color: dueDate ? '#111' : '#999' }}>
                    {dueDate ? new Date(dueDate).toLocaleDateString() : 'Select date'}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <View style={styles.inlinePickerContainer}>
                    <FullDatePicker
                      initialDate={pickerDate}
                      onApply={(d) => {
                        setDueDate(d.toISOString());
                        setShowDatePicker(false);
                      }}
                      onClose={() => setShowDatePicker(false)}
                    />
                  </View>
                )}

                {/* Note */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Note:</Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Optional note"
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    value={goalNote}
                    onChangeText={setGoalNote}
                  />
                </View>
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
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = globalStyles.AddGoalModal;