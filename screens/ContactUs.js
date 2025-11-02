import { View, Text, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

export default function ContactUs({ navigation }) {

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
        <Text style={styles.team}>Facebook</Text>
        <Text style={styles.team}>Linkedln</Text>
      </View>
      </View>
      </View>
);
  }
const styles = globalStyles.ContactUs;