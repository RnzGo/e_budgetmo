import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Modal component for adding new financial goals
export default function AddGoalsModal({ visible, onClose, onSubmit }) {
  // --- State variables for goal details ---
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(''); // stores goal due date (expected format: YYYY-MM-DD)
  const [targetAmount, setTargetAmount] = useState(''); // stores the target savings amount
  const [category, setCategory] = useState(''); // stores optional goal category
  const [note, setNote] = useState(''); // stores optional notes about the goal

  // useEffect: Resets all input fields whenever the modal becomes hidden
  useEffect(() => {
    if (!visible) {
      setTitle('');
      setDueDate('');
      setTargetAmount('');
      setCategory('');
      setNote('');
    }
  }, [visible]);

  // handleSubmit: Validates input fields and constructs a new goal object
  // then passes it back via onSubmit() and closes the modal
  function handleSubmit() {
    const parsedTarget = parseFloat(targetAmount);
    const parsedCurrent = parseFloat(currentAmount) || 0;

    // --- Validate title ---
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please enter a title for the goal.');
      return;
    }

    // --- Validate target amount ---
    if (Number.isNaN(parsedTarget) || parsedTarget <= 0) {
      Alert.alert('Invalid target', 'Please enter a valid target amount greater than zero.');
      return;
    }

    // --- Validate due date ---
    const parsedDate = new Date(dueDate);
    if (!dueDate || Number.isNaN(parsedDate.getTime())) {
      Alert.alert('Invalid date', 'Please enter a valid due date in YYYY-MM-DD format.');
      return;
    }

    // --- Construct goal object ---
    const goal = {
      id: `${Date.now()}`, // unique goal ID based on timestamp
      title: title.trim(),
      due: parsedDate.toISOString(),
      target: parsedTarget,
      current: parsedCurrent,
      progress: parsedTarget > 0 ? Math.min(parsedCurrent / parsedTarget, 1) : 0,
      color: '#22C55E', // default color
      note: note || '',
    };

    // --- Send goal data back to parent component ---
    if (typeof onSubmit === 'function') onSubmit(goal);

    // --- Close modal after submission ---
    if (typeof onClose === 'function') onClose();
  }

// Main Format of the Modal
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
            <FontAwesome5 name="bullseye" size={34} color="#F56B6B" />
            <Text style={styles.title}>Set Goal</Text>
          </View>

          <View style={styles.content}>
            
            {/* Title */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Goal title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Category */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Category:</Text>
              <TextInput
                style={styles.input}
                placeholder="Add Category"
                placeholderTextColor="#999"
                value={category}
                onChangeText={setCategory}
              />
            </View>

            {/* Target Amount */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Target Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter target amount"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={targetAmount}
                onChangeText={setTargetAmount}
              />
            </View>

            {/* Due Date */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Due Date:</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                value={dueDate}
                onChangeText={setDueDate}
              />
            </View>

            {/* Note */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Note:</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Optional note"
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

            {(() => {
              const parsedTarget = parseFloat(targetAmount);
              const isTitleValid = title.trim().length > 0;
              const isTargetValid = !Number.isNaN(parsedTarget) && parsedTarget > 0;
              const isDateValid = dueDate && !Number.isNaN(new Date(dueDate).getTime());
              const submitDisabled = !(isTitleValid && isTargetValid && isDateValid);

              return (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    submitDisabled ? styles.disabledButton : styles.submitButton,
                  ]}
                  onPress={handleSubmit}
                  accessibilityLabel="Submit"
                  accessibilityState={{ disabled: submitDisabled }}
                  disabled={submitDisabled}
                >
                  <Text style={[
                    styles.actionText,
                    submitDisabled ? styles.disabledText : { color: '#fff' },
                  ]}>
                    Add Goal
                  </Text>
                </TouchableOpacity>
              );
            })()}
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
    borderRadius: 24,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontSize: 30,
    fontWeight: '900',
    color: '#EA580C',
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
    borderRadius: 14,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#E67E22',
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
