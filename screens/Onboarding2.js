import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Onboarding2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/monitor.png')}
        style={styles.image}/>

      {/* Title */}
      <Text style={styles.titleMain}>Easily Monitor Your Earnings!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Track your earnings and expenditures using an easy-to-use dashboard. Organize your transactions to gain more insight.
      </Text>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot}></View>
        <View style={[styles.dot, styles.activeDot]}></View>
        <View style={styles.dot}></View>
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding3')}>
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
    padding: 40, 
    backgroundColor: 'white' 
  },
  image: { 
    width: 100, 
    height: 100, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 60, 
    fontWeight: 'bold', 
    color: '#3F7D20', 
    textAlign: 'center',
  },
  titleMain: { 
    fontSize: 60, 
    fontWeight: 'bold', 
    color: '#3F7D20', 
    textAlign: 'center',
    marginBottom: 30
  },
  description: { 
    textAlign: 'center', 
    fontSize: 18, 
    color: '#666', 
    lineHeight: 24,
    marginBottom: 30
  },
  button: { 
    backgroundColor: '#6CA16B', 
    paddingVertical: 15, 
    paddingHorizontal: 50, 
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 20
  },
  
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDD',
  },
  activeDot: {
    backgroundColor: '#6CA16B',
  },
});