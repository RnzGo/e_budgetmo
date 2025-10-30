import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#6CA16B', '#8BB78A', '#A8CFA7']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Logo - Top Center */}
      <Text style={styles.logo}>E - Budget Mo!</Text>

      {/* White Form Container - Only takes needed space */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        
        {/* Full Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Kim Gaeul"
            placeholderTextColor="#999"
          />
          <View style={styles.underline} />
        </View>
        
        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="sample@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.underline} />
        </View>
        
        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
          />
          <View style={styles.underline} />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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
            Already have an account?{' '}
            <Text 
              style={styles.footerLink} 
              onPress={() => navigation.navigate('Login')}
            >
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = globalStyles.SignupScreen;