import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/monitor.png')} style={styles.image} />
      <Text style={styles.title}>Easily monitor your earnings!</Text>
      <Text style={styles.description}>
        Track your earnings and expenditures using an easy-to-use dashboard. 
        Organize your transactions to gain more insight.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding3')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 25, 
    backgroundColor: 'white' },

  image: { 
    width: 150, 
    height: 150, 
    marginBottom: 25 },

  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#3F7D20', 
    textAlign: 'center' },

  description: { 
    textAlign: 'center', 
    fontSize: 15, 
    color: '#444', 
    marginVertical: 20 },

  button: { 
    backgroundColor: '#6CA16B', 
    paddingVertical: 12, 
    paddingHorizontal: 35, 
    borderRadius: 25 },

  buttonText: { 
    color: 'white', 
    fontWeight: 'bold' },
});