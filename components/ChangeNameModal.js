import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
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

	function handleSave() {
		// require current password to match stored password
		const stored = user?.password;
		if (!stored) {
			Alert.alert('No password set', 'No password is set for this account. Cannot verify identity.');
			return;
		}
		if ((password || '').trim() !== (stored || '').trim()) {
			Alert.alert('Incorrect password', 'The password you entered does not match our records.');
			return;
		}
		// update user in context directly to ensure parent cannot bypass password check
		updateName(name);
		if (typeof onClose === 'function') onClose();
	}

	return (
		<Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<Text style={styles.title}>Change Name</Text>

					<Text style={styles.label}>New Name</Text>
					<TextInput
						value={name}
						onChangeText={setName}
						placeholder="New Name"
						style={styles.input}
					/>

					<Text style={styles.label}>Password</Text>
					<TextInput
						value={password}
						onChangeText={setPassword}
						style={styles.input}
						placeholder="Password"
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
