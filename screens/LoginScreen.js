import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const styles = globalStyles.LoginScreen;
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Missing fields', 'Please enter email and password.');
      return;
    }
    const ok = login(email.trim(), password);
    if (ok) navigation.navigate('Home');
    else Alert.alert('Invalid credentials', 'Email or password does not match our records.');
  }

  const disabled = !email.trim() || !password;

  return (
    <LinearGradient
      colors={['#6CA16B', '#8BB78A', '#A8CFA7']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Logo - Top Center */}
      <Text style={styles.logo}>E - Budget Mo!</Text>

      {/* White Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log In</Text>
        
        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="sample@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.underline} />
        </View>
        
        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.underline} />
        </View>

        {/* Log In Button */}
        <TouchableOpacity 
          style={[styles.button, disabled ? { opacity: 0.6 } : {}]}
          onPress={handleLogin}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* Divider with "or" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't Have an account?{' '}
            <Text 
              style={styles.footerLink} 
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = globalStyles.LoginScreen;