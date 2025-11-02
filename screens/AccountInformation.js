import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useUser } from '../context/UserContext';
import { AntDesign } from '@expo/vector-icons';
import ChangeProfileModal from '../components/ChangeProfileModal';
import ChangeNameModal from '../components/ChangeNameModal';
import ChangeEmailAddressModal from '../components/ChangeEmailAddress';
import ChangePassword from '../components/ChangePassword';

export default function AccountInformation({ navigation }) {
  const baseStyles = globalStyles.AccountInformation;

  // local additions for account-specific buttons/text that AboutScreen doesn't define
  const localStyles = StyleSheet.create({
    changeButton: {
      backgroundColor: '#E6F4EA',
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 8,
      marginBottom: 12,
    },
    buttontext: {
      color: '#2F6B2E',
      fontWeight: '600',
      textAlign: 'center',
    },
  });

  const styles = { ...baseStyles, ...localStyles };
  const { user, updateName, updateEmail, updatePassword, updateProfilePicture } = useUser();
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Information</Text>
        <View style={styles.placeholder} />
      </View>

  {/* Content */}
  <ScrollView style={styles.contentContainer} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Picture</Text>
          <View style={styles.profileContainer}>
            <Image
              source={user?.profilePicture ? { uri: user.profilePicture } : require('../assets/kim.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowChangeProfile(true)}>
          <Text style={styles.buttontext}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Name</Text>
          <Text style={styles.team}>{user?.name ?? 'Your Name'}</Text>
        </View>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowChangeName(true)}>
          <Text style={styles.buttontext}>Change Name</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Address</Text>
          <Text style={styles.team}>{user?.email ?? 'sample@email.com'}</Text>
        </View>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowChangeEmail(true)}>
          <Text style={styles.buttontext}>Change Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Password</Text>
          <Text style={styles.team}>Pa****rd</Text>
        </View>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => setShowChangePassword(true)}>
          <Text style={styles.buttontext}>Change Password</Text>
        </TouchableOpacity>
      </View>
  </ScrollView>
      {/* Modals */}
      <ChangeProfileModal visible={showChangeProfile} onClose={() => setShowChangeProfile(false)} onSubmit={(uri) => { if (uri) updateProfilePicture(uri); }} />
      <ChangeNameModal
        visible={showChangeName}
        initialName={user?.name ?? ''}
        onClose={() => setShowChangeName(false)}
      />
      <ChangeEmailAddressModal
        visible={showChangeEmail}
        initialEmailAddress={user?.email ?? ''}
        onClose={() => setShowChangeEmail(false)}
      />
      <ChangePassword
        visible={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </View>
  );
}