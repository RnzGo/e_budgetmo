import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
  },
  logo: { 
    color: 'white', 
    fontSize: 60, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute', 
    top: 120,
    left: 0,
    right: 0,
  },
  formContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20, 
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    right: 90,
  },
  fieldContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  underline: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
  },
  button: { 
    backgroundColor: '#6CA16B', 
    paddingVertical: 10,
    width: '30%',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: { 
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  footerLink: { 
    color: '#6CA16B',
    fontWeight: 'bold',
  },
});