import { createHomeStyles } from '@/assets/styles/home.styles';
import { Doc, Id } from '@/convex/_generated/dataModel';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TouchableOpacity, View } from 'react-native';

type Todo = Doc<'todos'>

type TodoItemProps = {
  item: Todo;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: Id<"todos">) => void;
}

const TodoItemCard = ({ item, handleEditTodo, handleDeleteTodo } : TodoItemProps) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  return (
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
        <TouchableOpacity
          onPress={() => handleEditTodo(item)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={colors.gradients.warning}
            style={homeStyles.actionButton}
          >
            <Ionicons name='pencil' size={15} color='#fff' />
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
            <Ionicons name='trash' size={15} color='#fff' />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TodoItemCard;
