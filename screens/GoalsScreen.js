import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Image } from 'react-native';
import AddGoalsModal from '../components/AddGoalsModal';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Mock data: can be changed during backend
const goalsData = [
  { id: 4, title: 'Goal 4', due: '23/07/25', progress: 1, current: 5000, target: 5000, color: '#3B82F6' },
  { id: 3, title: 'Goal 3', due: '12/12/25', progress: 0, current: 0, target: 10000, color: '#22C55E' },
  { id: 2, title: 'Goal 2', due: '02/01/25', progress: 0.7, current: 7000, target: 10000, color: '#22C55E' },
  { id: 1, title: 'Goal 1 (Failed)', due: '01/01/25', progress: 0.3, current: 6000, target: 20000, color: '#EF4444' },
];

export default function GoalsScreen() {
  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={require('../assets/kim.png')} style={styles.avatar} />
          <Text style={styles.profileName}>Kim Gaeul</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <View style={styles.goalsHeader}>
          <FontAwesome5 name="bullseye" size={34} color="#F56B6B" />
          <Text style={styles.goalsTitle}>Goals</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {goalsData.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalRow}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDue}>Due: {goal.due}</Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${goal.progress * 100}%`, backgroundColor: goal.color },
                  ]}
                />
              </View>

              <Text style={styles.goalAmount}>
                {goal.current.toLocaleString()}/{goal.target.toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Add Goals Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)} // open modal
        >
          <Ionicons name="add-circle" size={18} color="#fff" />
          <Text style={styles.addText}>Add Goals</Text>
        </TouchableOpacity>
      </View>

      {/* Render the modal */}
      <AddGoalsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // close modal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  header: {
    backgroundColor: '#7CB342',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45, // works across devices
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


  content: {
    backgroundColor: '#FAF9F6',
    borderRadius: 23,
    padding: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '90%',
    height: '70%',
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 6 },
          },
          android: {
            elevation: 3,
          },
        }),
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalsTitle: {
    marginLeft: 8,
    fontSize: 34,
    fontWeight: '900',
    color: '#EA580C',
  },
  goalCard: {
    backgroundColor: '#FAF9F6',
    borderRadius: 23,
    padding: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '98%',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 3 },
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#374151',
  },
  goalDue: {
    fontSize: 16,
    color: '#6B7280',
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 4,
  },
  goalAmount: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#E67E22',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 12,
    alignSelf: 'center',
    width: '40%',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 16,
  },
});

