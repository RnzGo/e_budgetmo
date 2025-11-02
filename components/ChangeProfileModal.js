import React, { useState } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../styles/globalStyles';

export default function ChangeProfileModal({ visible, onClose, onSubmit }) {
  const [imageUri, setImageUri] = useState(null);

  async function pickImage() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission denied', 'Permission to access media library is required.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      if (!result.cancelled) setImageUri(result.uri);
    } catch (e) {
      console.warn('Image pick failed', e);
    }
  }
  return (
    <Modal animationType="fade" transparent visible={!!visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}> 
          <Text style={styles.title}>Change Profile</Text>

          <View style={styles.profileContainer}>
            <Image
              source={imageUri ? { uri: imageUri } : require('../assets/kim.png')}
              style={styles.profileImage}
            />

            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { if (typeof onSubmit === 'function') onSubmit(imageUri); onClose && onClose(); }} style={styles.submitButton}>
              <Text style={[styles.buttonText, { color: '#fefffeff' }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = globalStyles.ChangeModal;