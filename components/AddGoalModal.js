import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  // FlatList removed to avoid nested VirtualizedList inside ScrollView
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FullDatePicker from './FullDatePicker';

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

  const CATEGORY_SUGGESTIONS = [
    'Savings',
    'Emergency',
    'Vacation',
    'Education',
    'Investment',
    'Bills',
    'Custom',
  ];

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
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
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
                {!isCategoryCustom ? (
                  <TouchableOpacity
                    style={[styles.input, styles.pseudoInput]}
                    onPress={() => {
                      // dismiss keyboard when opening suggestions
                      Keyboard.dismiss();
                      setShowCategorySuggestions(true);
                    }}
                  >
                    <Text style={{ color: goalCategory ? '#111' : '#999' }}>{goalCategory || 'Select category'}</Text>
                  </TouchableOpacity>
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter custom category"
                    placeholderTextColor="#999"
                    value={goalCategory}
                    onChangeText={(t) => setGoalCategory(t)}
                    onFocus={() => { setShowCategorySuggestions(true); Keyboard.dismiss(); }}
                    showSoftInputOnFocus={false}
                  />
                )}

                {showCategorySuggestions && (
                  <View style={styles.suggestionsBox}>
                    {/* Non-virtualized list to avoid nesting VirtualizedLists inside a ScrollView */}
                    <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 160 }}>
                      {(isCategoryCustom
                        ? CATEGORY_SUGGESTIONS.filter((s) => s.toLowerCase().includes((goalCategory || '').toLowerCase()))
                        : CATEGORY_SUGGESTIONS
                      ).map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.suggestionItem}
                          onPress={() => {
                            if (item === 'Custom') {
                              setIsCategoryCustom(true);
                              setGoalCategory('');
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
  scrollContent: {
    paddingBottom: 20,
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
  pseudoInput: {
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  dateInput: {
    justifyContent: 'center',
  },
  inlinePicker: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  inlinePickerContainer: {
    marginTop: 8,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  pickerBtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
  },
  pickerBtnText: {
    fontSize: 16,
  },
  pickerLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#111',
  },
  pickerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  relativeWrapper: {
    position: 'relative',
  },
  suggestionsBox: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
    borderRadius: 6,
    maxHeight: 180,
    zIndex: 9999,
    elevation: 10,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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