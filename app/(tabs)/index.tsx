import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { useMutation, useQuery } from 'convex/react';
import { Alert, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);


  const resetAll = useMutation(api.todos.clearAllTodos);




  const handleReset = async () => {
    try {
      await resetAll();
    } catch (error) {
      console.error('Error resetting', error);
      Alert.alert('Error', 'Failed to reset');
    }
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput/>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle the mode</Text>
        </TouchableOpacity>



        {/* TODO: for later */}
        <TouchableOpacity onPress={handleReset}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}