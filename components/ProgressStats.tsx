import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { useQuery } from 'convex/react';
import { View, Text } from 'react-native'

const ProgressStats = () => {

  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const todalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;

  return (
    <View>
      <Text>ProgressStats</Text>
    </View>
  )
}
export default ProgressStats