import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useUser } from '../context/UserContext';

export default function ChangePassword({ visible, onClose, initialPassword = '' }) {
    const styles = globalStyles.ChangeModal;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const { user, updatePassword } = useUser();

    useEffect(() => {
        if (visible) {
            setCurrentPassword('');
            setNewPassword('');
            setRetypePassword('');
        }
    }, [visible, initialPassword]);

    const [showPassword, setShowPassword] = useState(false);

    const stored = (user?.password || '').trim();
    const currentTrim = (currentPassword || '').trim();
    const currentMatches = stored.length > 0 && currentTrim === stored;
    const newPasswordsMatch = newPassword.length > 0 && newPassword === retypePassword;
    const canSubmit = currentMatches && newPasswordsMatch;
    const currentError = !stored
        ? 'No password set for this account.'
        : currentTrim.length === 0
            ? 'Current password is required.'
            : currentTrim !== stored
                ? 'Current password does not match.'
                : '';
    const newPasswordError = newPassword.length === 0 ? 'New password is required.' : (newPasswordsMatch ? '' : 'New passwords do not match.');

    function handleSave() {
        if (!stored) {
            Alert.alert('No password set', 'No password is set for this account. Cannot verify identity.');
            return;
        }
        if (!currentMatches) {
            Alert.alert('Incorrect password', 'Current password does not match our records.');
            return;
        }
        if (!newPassword) {
            Alert.alert('Invalid password', 'New password cannot be empty.');
            return;
        }
        if (!newPasswordsMatch) {
            Alert.alert('Mismatch', 'New password and confirmation do not match.');
            return;
        }
        // update user in context directly to ensure parent cannot bypass password check
        updatePassword(newPassword);
        if (typeof onClose === 'function') onClose();
    }

    return (
        <Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={80}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.overlay}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }} keyboardShouldPersistTaps="handled">
                            <View style={styles.container}>
                                <Text style={styles.title}>Change Password</Text>

                                <Text style={styles.label}>Current Password</Text>
                                <TextInput
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    style={styles.input}
                                    placeholder="Current Password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword((s) => !s)} style={{ marginTop: 6 }}>
                                    <Text style={{ color: '#3F7D20' }}>{showPassword ? 'Hide password' : 'Show password'}</Text>
                                </TouchableOpacity>
                                {currentError ? <Text style={{ color: '#E53E3E', marginTop: 6 }}>{currentError}</Text> : null}

                                <Text style={styles.label}>New Password</Text>
                                <TextInput
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    style={styles.input}
                                    placeholder="New Password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPassword}
                                />
                                {newPasswordError ? <Text style={{ color: '#E53E3E', marginTop: 6 }}>{newPasswordError}</Text> : null}

                                <Text style={styles.label}>Retype New Password</Text>
                                <TextInput
                                    value={retypePassword}
                                    onChangeText={setRetypePassword}
                                    style={styles.input}
                                    placeholder="Retype New Password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPassword}
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.submitButton, !canSubmit ? { opacity: 0.6 } : null]}
                                        onPress={handleSave}
                                        disabled={!canSubmit}
                                    >
                                        <Text style={[styles.buttonText, { color: '#fff' }]}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}