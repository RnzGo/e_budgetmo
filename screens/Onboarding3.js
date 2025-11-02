import React, { useEffect, useRef } from 'react';
import { Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Onboarding3({ navigation }) {
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
        source={require('../assets/goals.png')}
        style={styles.image}/>

      {/* Title */}
      <Text style={styles.title}>Set GOALS & Save Smartly</Text>

      {/* Description */}
      <Text style={styles.description}>
        With a few simple taps, you can set up personal goals to save, track, and motivate you in spending your hard-earned money wisely!
      </Text>

      {/* Progress Dots */}
      <Animated.View style={styles.dotsContainer}>
        <Animated.View style={styles.dot}></Animated.View>
        <Animated.View style={styles.dot}></Animated.View>
        <Animated.View style={[styles.dot, styles.activeDot]}></Animated.View>
      </Animated.View>

      {/* Go to App Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Go to App</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = globalStyles.Onboarding3;