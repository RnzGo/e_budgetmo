import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useUser } from '../context/UserContext';

export default function ChangeNameModal({ visible, onClose, initialName = '' }) {
    const styles = globalStyles.ChangeModal;
    const [name, setName] = useState(initialName);
    const [password, setPassword] = useState('');
    const { user, updateName } = useUser();

    useEffect(() => {
        if (visible) setName(initialName || '');
    }, [visible, initialName]);

    const stored = (user?.password || '').trim();
    const passwordTrim = (password || '').trim();
    const passwordMatches = stored.length > 0 && passwordTrim === stored;
    const canSubmit = name.trim().length > 0 && passwordMatches;
    const passwordError = !stored
        ? 'No password set for this account.'
        : passwordTrim.length === 0
            ? 'Password is required.'
            : passwordTrim !== stored
                ? 'Password does not match.'
                : '';

    function handleSave() {
        const storedPwd = user?.password;
        if (!storedPwd) {
            Alert.alert('No password set', 'No password is set for this account. Cannot verify identity.');
            return;
        }
        if ((password || '').trim() !== (storedPwd || '').trim()) {
            Alert.alert('Incorrect password', 'The password you entered does not match our records.');
            return;
        }
        updateName(name.trim());
        if (typeof onClose === 'function') onClose();
    }

    return (
        <Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={80}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.overlay}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }} keyboardShouldPersistTaps="handled">
                            <View style={styles.container}>
                                <Text style={styles.title}>Change Name</Text>

                                <Text style={styles.label}>New Name</Text>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.input}
                                    placeholder="New Name"
                                    placeholderTextColor="#999"
                                />

                                <Text style={styles.label}>Enter Current Password</Text>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    placeholder="Current Password"
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                />
                                {passwordError ? <Text style={{ color: '#E53E3E', marginTop: 6 }}>{passwordError}</Text> : null}

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
