import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#6CA16B', '#8BB78A', '#A8CFA7']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>E – Budget Mo!</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}>
      <Text style={styles.buttonText}>
        Sign up with Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text 
            style={styles.link} 
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = globalStyles.WelcomeScreen;