import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }){
  const menuItems = [
    {
      title: 'Account Information',
      icon: <MaterialIcons name="person-outline" size={24} color="#3F7D20" />,
      onPress: () => console.log('Account Information pressed')
    },
    {
      title: 'About',
      icon: <Feather name="info" size={24} color="#3F7D20" />,
      onPress: () => navigation.navigate('About')
    },
    {
      title: 'Contact Us',
      icon: <Ionicons name="mail-outline" size={24} color="#3F7D20" />,
      onPress: () => console.log('Contact Us pressed')
    },
    {
      title: 'Log Out',
      icon: <AntDesign name="logout" size={24} color="#EB4D4B" />,
      onPress: () => navigation.navigate('Welcome'),
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={[
                styles.menuItemText,
                item.isDestructive && styles.destructiveText
              ]}>
                {item.title}
              </Text>
            </View>
            <AntDesign name="right" size={20} color="#CCCCCC" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = globalStyles.SettingsScreen;