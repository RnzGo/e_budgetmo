import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/hello.png')} // placeholder image
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to E-Budget Mo!</Text>
      <Text style={styles.description}>
        Manage your finances in an enjoyable and straightforward manner! 
        Monitor your earnings, expenditures, and savings targets.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Onboarding2')}>
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