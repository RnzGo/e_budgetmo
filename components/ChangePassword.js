import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useUser } from '../context/UserContext';

export default function ChangePassword({ visible, onClose, initialPassword = '' }) {
    const styles = globalStyles.ChangeModal;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const { user, updatePassword } = useUser();

    useEffect(() => {
        if (visible) setPassword(initialPassword || '');
    }, [visible, initialPassword]);

    function handleSave() {
        const stored = user?.password;
        if (!stored) {
            Alert.alert('No password set', 'No password is set for this account. Cannot verify identity.');
            return;
        }
        if ((currentPassword || '').trim() !== (stored || '').trim()) {
            Alert.alert('Incorrect password', 'Current password does not match our records.');
            return;
        }
        if (!newPassword) {
            Alert.alert('Invalid password', 'New password cannot be empty.');
            return;
        }
        if (newPassword !== retypePassword) {
            Alert.alert('Mismatch', 'New password and confirmation do not match.');
            return;
        }
        // update user in context directly to ensure parent cannot bypass password check
        updatePassword(newPassword);
        if (typeof onClose === 'function') onClose();
    }

    return (
        <Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Change Password</Text>

                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        style={styles.input}
                        placeholder="Current Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    <Text style={styles.label}>Retype New Password</Text>
                    <TextInput
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                        style={styles.input}
                        placeholder="Retype New Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                            <Text style={[styles.buttonText, { color: '#fff' }]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}