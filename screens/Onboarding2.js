import { View, Text, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

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

const styles = globalStyles.Onboarding2;