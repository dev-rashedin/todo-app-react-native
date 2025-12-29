import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text } from 'react-native'
const SettingsScreen = () => {

  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  
    // const handleReset = async () => {
    //   try {
    //     await resetAll();
    //   } catch (error) {
    //     console.error('Error resetting', error);
    //     Alert.alert('Error', 'Failed to reset');
    //   }
    // };

  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}
export default SettingsScreen