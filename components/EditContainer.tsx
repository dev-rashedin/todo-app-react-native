import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';


type EditContainerProps = {
  editText: string;
  setEditText: (text: string) => void;
  editingId: Id<'todos'> | null;
  setEditingId: (id: Id<'todos'> | null) => void;
};

const EditContainer = ({
  editText,
  setEditText,
  editingId,
  setEditingId,
}: EditContainerProps) => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // db actions
  const updateTodo = useMutation(api.todos.updateTodo);


  // save edit
  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText('');
      } catch (error) {
        console.error('Error updating todo', error);
        Alert.alert('Error', 'Failed to update todo');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <View style={homeStyles.editContainer}>
      <TextInput
        style={homeStyles.editInput}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        multiline
        placeholder='Edit your todo...'
        placeholderTextColor={colors.textMuted}
      />
      {/* save and cancel buttons */}
      <View style={homeStyles.editButton}>
        {/* save button */}
        <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.success}
            style={homeStyles.editButton}
          >
            <Ionicons name='checkmark' size={16} color='#fff' />
            <Text style={homeStyles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* cancel button */}
        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.muted}
            style={homeStyles.editButton}
          >
            <Ionicons name='close' size={16} color='#fff' />
            <Text style={homeStyles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditContainer;
