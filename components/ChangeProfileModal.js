import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function ChangeProfileModal({ visible, onClose }) {

  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={!!visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { width: '90%', marginTop: 180 }]}> 
          <Text style={styles.title}>Change Profile</Text>

          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/kim.png')}
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.buttonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.submitButton}>
              <Text style={[styles.buttonText, { color: '#fefffeff' }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = globalStyles.ChangeProfileModal;