import { createHomeStyles } from '@/assets/styles/home.styles'
import { api } from '@/convex/_generated/api'
import useTheme from '@/hooks/useTheme'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from 'convex/react'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { View, Alert, TextInput, TouchableOpacity, Text } from 'react-native'

const TodoInput = () => {
  const { colors } = useTheme()
  const homeStyles = createHomeStyles(colors)

  const [newTodo, setNewTodo] = useState("");
  
  const addTodo = useMutation(api.todos.createTodo);
  
  // add todo handler
  const handleAddTodo = async () => {
      
    if(!newTodo.trim()) return

        try {
          await addTodo({ title: newTodo, description: '' });
          setNewTodo('');
       } catch (error) {
        console.error('Error adding todo', error);
        Alert.alert('Error', 'Failed to add a todo');
      }
       
      
      
    };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder='What needs to be done?'
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8} disabled={!newTodo.trim()} >
          <LinearGradient
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
          >
            <Ionicons name='add' size={24} colors="#fff" />
         </LinearGradient>
        </TouchableOpacity>
        </View>
    </View>
  )
}
export default TodoInput