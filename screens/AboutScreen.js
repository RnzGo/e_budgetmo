import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign } from '@expo/vector-icons';

export default function AboutScreen({ navigation }){
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.appTitle}>E-Budget Mo!</Text>
          <Text style={styles.description}>
            E-Budget Mo! is a personal e-budgeting app that helps you track your income, expenses, and savings goals effortlessly.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.version}>Version: 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developed by:</Text>
          <Text style={styles.team}>StarPlayers from CS21S3 of</Text>
          <Text style={styles.team}>Technological Institute of the Philippines</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Members:</Text>
          <Text style={styles.member}>Gaw, Albert Renz P.</Text>
          <Text style={styles.member}>Ong, Carl Gabriel</Text>
          <Text style={styles.member}>Payaval, Kevin Charles</Text>
          <Text style={styles.member}>Slaron, Giahn M.</Text>
          <Text style={styles.member}>Syilo, Carlos Miques R.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.copyright}>© 2025 StarPlayers Team. All rights reserved.</Text>
          <Text style={styles.disclaimer}>
            This app is a student project and not intended for commercial use.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = globalStyles.AboutScreen;