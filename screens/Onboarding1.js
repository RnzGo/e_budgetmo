import React, { useEffect, useRef } from 'react';
import { Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Onboarding1({ navigation }) {
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
      <Animated.View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, styles.activeDot]}></Animated.View>
        <Animated.View style={styles.dot}></Animated.View>
        <Animated.View style={styles.dot}></Animated.View>
      </Animated.View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Onboarding2')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = globalStyles.Onboarding1;