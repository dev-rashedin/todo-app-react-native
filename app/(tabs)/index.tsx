
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {

  const { toggleDarkMode } = useTheme();
  
  const todos = useQuery(api.todos.getTodos);
  
  console.log('Todos', todos);
  

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
      Todo App
      </Text>
      <Text> Hi There</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle the mode</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  content: {
    fontSize: 48,
    fontWeight: '700'
  }
});