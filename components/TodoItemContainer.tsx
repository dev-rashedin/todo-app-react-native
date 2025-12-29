

import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity } from 'react-native'
import EditContainer from './EditContainer';
import TodoItemCard from './TodoItemCard';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { Doc, Id } from '@/convex/_generated/dataModel';

type Todo = Doc<'todos'>

type TodoItemContainerProps = {
  item: Todo;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: Id<"todos">) => void;
  handleToggleTodo: (id: Id<"todos">) => void;
  isEditing: boolean;
  editText: string;
  setEditText: (text: string) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
}

const TodoItemContainer = ({
  item,
  handleToggleTodo,
  handleDeleteTodo,
  handleEditTodo,
  isEditing,
  editText,
  setEditText,
  handleSaveEdit,
  handleCancelEdit,
} : TodoItemContainerProps) => {

    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

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

        {isEditing ? (
          <EditContainer
            editText={editText}
            setEditText={setEditText}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
          />
        ) : (
          //   text and action buttons
          <TodoItemCard
            item={item}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </LinearGradient>
    </View>
  );
}
export default TodoItemContainer