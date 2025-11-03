import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../context/UserContext';
import { useFinance } from '../context/FinanceContext';
export default function SettingsScreen({ navigation }){
  const { resetUser } = useUser();
  const { resetFinance } = useFinance();

  async function handleReset() {
    Alert.alert(
      'Reset app data',
      'This will remove all local app data (user, finance, goals) and sign you out. This cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['@e_budgetmo_user', '@e_budgetmo_finance', '@e_budgetmo_goals']);
            } catch (e) {
              console.warn('Failed to clear storage', e);
            }

            try {
              resetUser();
            } catch (e) {
              console.warn('Failed to reset user context', e);
            }

            try {
              resetFinance();
            } catch (e) {
              console.warn('Failed to reset finance context', e);
            }

            // reset navigation to Login screen
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ],
    );
  }
  const menuItems = [
    {
      title: 'Account Information',
      icon: <MaterialIcons name="person-outline" size={24} color="#3F7D20" />,
      onPress: () => navigation.navigate('AccountInformation')
    },
    {
      title: 'About',
      icon: <Feather name="info" size={24} color="#3F7D20" />,
      onPress: () => navigation.navigate('About')
    },
    {
      title: 'ContactUs',
      icon: <Ionicons name="mail-outline" size={24} color="#3F7D20" />,
      onPress: () => navigation.navigate('ContactUs')
    },
    {
      title: 'Reset App Data',
      icon: <MaterialIcons name="refresh" size={24} color="#3F7D20" />,
      onPress: () => handleReset(),
    },
    {
      title: 'Log Out',
      icon: <AntDesign name="logout" size={24} color="#EB4D4B" />,
      onPress: () => navigation.navigate('Login'),
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