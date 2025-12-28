import { createHomeStyles } from '@/assets/styles/home.styles';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import TodoInput from '@/components/TodoInput';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Todo = Doc<'todos'>;

export default function Index() {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // db actions
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  // const resetAll = useMutation(api.todos.clearAllTodos);

  const isLoading = todos === undefined;

  // const handleReset = async () => {
  //   try {
  //     await resetAll();
  //   } catch (error) {
  //     console.error('Error resetting', error);
  //     Alert.alert('Error', 'Failed to reset');
  //   }
  // };

  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error('Error toggling todo', error);
      Alert.alert('Error', 'Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async(id: Id<'todos'>) => {
   Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
     { text: "Cancel", style: "cancel" },
     {text: "Delete", style: "destructive", onPress: () => deleteTodo({id})}
   ])
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* checkbox */}
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => {
              handleToggleTodo(item._id);
            }}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={homeStyles.checkboxInner}
            >
              {item.isCompleted && (
                <Ionicons name='checkmark' size={18} color='#fff' />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homeStyles.todoTextContainer}>
            {/* todo text */}
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: 'line-through',
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>
            {/* Edit & Delete Button */}
            <View style={homeStyles.todoActions}>
              <TouchableOpacity>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name='pencil' size={15} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name='trash' size={15} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  if (isLoading) return <LoadingSpinner />;

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
          ListEmptyComponent={<EmptyState />}
          // showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
