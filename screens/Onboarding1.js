import { View, Text, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Onboarding1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/hello.png')}
        style={styles.image}/>

      {/* Title with two lines */}
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.titleMain}>E - Budget Mo!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Manage your finances in an enjoyable and straightforward manner! Monitor your earnings, expenditures, and savings targets.
      </Text>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]}></View>
        <View style={styles.dot}></View>
        <View style={styles.dot}></View>
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = globalStyles.Onboarding1;