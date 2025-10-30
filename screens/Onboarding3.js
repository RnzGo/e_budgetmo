import { View, Text, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Onboarding3({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/goals.png')}
        style={styles.image}/>

      {/* Title */}
      <Text style={styles.titleMain}>Set GOALS & Save Smartly</Text>

      {/* Description */}
      <Text style={styles.description}>
        With a few simple taps, you can set up personal goals to save, track, and motivate you in spending your hard-earned money wisely!
      </Text>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
        <View style={[styles.dot, styles.activeDot]}></View>
      </View>

      {/* Go to App Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Go to App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = globalStyles.Onboarding3;