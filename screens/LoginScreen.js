import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>E - Budget Mo!</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up with email</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
          Log in
        </Text>
      </Text>
    </View>
  );
}
  const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#6CA16B', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: { 
    color: 'white', 
    fontSize: 30, 
    marginBottom: 50, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: { 
    backgroundColor: 'white', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30, 
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { 
    color: '#6CA16B', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: { 
    color: 'white', 
    fontSize: 16,
  },
  link: { 
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});