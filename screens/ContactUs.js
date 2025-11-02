import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StatusBar, Linking } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function ContactUs({ navigation }) {

  const openFacebook = async () => {
    const url = 'https://www.facebook.com/albertrenz.pineda';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (e) {
      console.warn('Could not open Facebook URL', e);
    }
  };

  const openLinkedIn = async () => {
    const url = 'https://www.linkedin.com/in/carl-gabriel-ong-17b1aa317/?originalSubdomain=ph';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (e) {
      console.warn('Could not open LinkedIn URL', e);
    }
  };

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

            <Text style={styles.headerTitle}>Contact Us</Text>
          </View>
          <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="setting" size={30} color="white" />
          </TouchableOpacity>
      </View>

        {/* Content */}
      <View style={styles.contentContainer}>
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email:</Text>
        <Text style={styles.team}>EBudgetMo@sample.com</Text>
      </View>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Landline:</Text>
        <Text style={styles.team}>02-1234-5678(Manila)</Text>
      </View>

       <View style={styles.section}>
        <Text style={styles.sectionTitle}>Socials:</Text>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={openFacebook}
        >
          <Text style={styles.team}>Facebook</Text>
          <Feather name="chevron-right" size={20} color="#3F7D20" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={openLinkedIn}
        >
          <Text style={styles.team}>LinkedIn</Text>
          <Feather name="chevron-right" size={20} color="#3F7D20" />
        </TouchableOpacity>
      </View>
      </View>
      </View>
);
  }
const styles = globalStyles.ContactUs;