import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { useMutation, useQuery } from 'convex/react';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Doc } from '@/convex/_generated/dataModel';

type Todo = Doc<"todos">

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // db actions
  const todos = useQuery(api.todos.getTodos);
  // const resetAll = useMutation(api.todos.clearAllTodos);


  const isLoading = todos === undefined

  // const handleReset = async () => {
  //   try {
  //     await resetAll();
  //   } catch (error) {
  //     console.error('Error resetting', error);
  //     Alert.alert('Error', 'Failed to reset');
  //   }
  // };

  const renderTodoItem = ({ item } : { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => {}}
          >


          </TouchableOpacity>
          
          </LinearGradient>
     </View>
    );
  }

  if(isLoading) return <LoadingSpinner/>

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
       
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}