import React, { useEffect, useRef } from 'react';
import { Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Onboarding2({ navigation }) {
  const startX = Dimensions.get('window').width;
  const translateX = useRef(new Animated.Value(startX)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}> 
      <Image
        source={require('../assets/monitor.png')}
        style={styles.image}/>

      {/* Title */}
      <Text style={styles.title}>Easily Monitor Your Earnings!</Text>

      {/* Description */}
      <Text style={styles.description}>
        Track your earnings and expenditures using an easy-to-use dashboard. Organize your transactions to gain more insight.
      </Text>

      {/* Progress Dots */}
      <Animated.View style={styles.dotsContainer}>
        <Animated.View style={styles.dot}></Animated.View>
        <Animated.View style={[styles.dot, styles.activeDot]}></Animated.View>
        <Animated.View style={styles.dot}></Animated.View>
      </Animated.View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding3')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = globalStyles.Onboarding2;