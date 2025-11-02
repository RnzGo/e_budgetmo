import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  Dimensions,
  PixelRatio,
} from 'react-native';
import globalStyles from '../styles/globalStyles';       
import { Ionicons, AntDesign } from '@expo/vector-icons';
export default function AccountInformation({ navigation }) {
const styles = globalStyles.ContactUs;

return (
<View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity 
                  style={styles.backButton}
                   onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
         <View>

            

            <Text style={styles.headerTitle}>Account Information</Text>
          </View>
          <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
      </View>
      
       <View style={styles.container}>
         <TouchableOpacity 
                   onPress={() => console.log('Change Profile Picture')}>
          <Text style={styles.buttontext}>Change Profile Picture</Text>
        </TouchableOpacity>
         <View style={styles.contentContainer}>
               <View style={styles.section}>
                <Text style={styles.sectionTitle}>Display Name</Text>
                <Text style={styles.team}>Kim Gaeul</Text>
              </View>
         <TouchableOpacity 
                   onPress={() => console.log('Change Name')}>
          <Text style={styles.buttontext}>Change Name</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
               <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email Address</Text>
                <Text style={styles.team}>sample@email.com</Text>
              </View>
         <TouchableOpacity 
                   onPress={() => console.log('Change Email')}>
          <Text style={styles.buttontext}>Change Email</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
               <View style={styles.section}>
                <Text style={styles.sectionTitle}>Password</Text>
                <Text style={styles.team}>Pa****rd</Text>
              </View>
         <TouchableOpacity 
                  style={styles.backButton}
                   onPress={() => console.log('Change Password')}>
          <Text style={styles.buttontext}>Change Password</Text>
        </TouchableOpacity>
         <View>
        </View>
        </View>
        </View>
        </View>
        </View>
        </View>
      );
      }