import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useUser } from '../context/UserContext';

export default function ChangeEmailAddressModal({ visible, onClose, initialEmailAddress = '' }) {
	const styles = globalStyles.ChangeModal;
	const [emailAddress, setEmailAddress] = useState(initialEmailAddress);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { user, updateEmail } = useUser();

	useEffect(() => {
		if (visible) setEmailAddress(initialEmailAddress || '');
	}, [visible, initialEmailAddress]);

	const stored = (user?.password || '').trim();
	const passwordTrim = (password || '').trim();
	const passwordMatches = stored.length > 0 && passwordTrim === stored;
	const canSubmit = emailAddress.trim().length > 0 && passwordMatches;
	const passwordError = !stored
		? 'No password set for this account.'
		: passwordTrim.length === 0
			? 'Password is required.'
			: passwordTrim !== stored
				? 'Password does not match.'
				: '';

	function handleSave() {
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
		updateEmail(emailAddress);
		if (typeof onClose === 'function') onClose();
	}

	return (
		<Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={80}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<View style={styles.overlay}>
						<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 16 }} keyboardShouldPersistTaps="handled">
							<View style={styles.container}>
								<Text style={styles.title}>Change Email Address</Text>

								<Text style={styles.label}>New Email Address</Text>
								<TextInput
									value={emailAddress}
									onChangeText={setEmailAddress}
									placeholder="New Email Address"
									style={styles.input}
								/>

								<Text style={styles.label}>Password</Text>
								<TextInput
									value={password}
									onChangeText={setPassword}
									style={styles.input}
									placeholder="Password"
									placeholderTextColor="#999"
									secureTextEntry={!showPassword}
								/>
								<TouchableOpacity onPress={() => setShowPassword((s) => !s)} style={{ marginTop: 6 }}>
									<Text style={{ color: '#3F7D20' }}>{showPassword ? 'Hide password' : 'Show password'}</Text>
								</TouchableOpacity>
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