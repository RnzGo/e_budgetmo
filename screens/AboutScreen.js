import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6CA16B',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 60,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 28,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3F7D20',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    textAlign: 'center',
  },
  version: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F7D20',
    marginBottom: 10,
  },
  team: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  member: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 5,
  },
  copyright: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});