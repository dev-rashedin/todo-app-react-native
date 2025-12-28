import { api } from '@/convex/_generated/api';
import useTheme, { ColorScheme } from '@/hooks/useTheme';
import { useMutation, useQuery } from 'convex/react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const styles = createStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.createTodo);
  const resetAll = useMutation(api.todos.clearAllTodos);

  console.log('All todos from DB', todos);

  const handleAddTodo = async () => {
    try {
      await addTodo({
        title: 'Finish React Native Course',
        description:
          'Learn React Native by building 4 apps. They are Todo App, Notes App, Weather App, and Chat App. And become a React Native expert!',
      });
    } catch (error) {
      console.error('Error creating todo', error);
      Alert.alert('Error', 'Failed to create todo');
    }
  };

  const handleReset = async () => {
    try {
      await resetAll();
    } catch (error) {
      console.error('Error resetting', error);
      Alert.alert('Error', 'Failed to reset');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.content}>Todo App</Text>
      <Text> Hi There</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle the mode</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addTodoBtn} onPress={handleAddTodo}>
        <Text>Add A New Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      gap: 10,
      backgroundColor: colors.bg,
    },
    content: {
      fontSize: 48,
      fontWeight: '700',
    },
    addTodoBtn: {
      backgroundColor: '#f4995cff',
      padding: 10,
      borderRadius: 5,
      cursor: 'pointer',
    },
    resetBtn: {
      backgroundColor: '#f80404ff',
      width: 125,
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      color: 'white',
      cursor: 'pointer',
    },
  });

  return styles;
}