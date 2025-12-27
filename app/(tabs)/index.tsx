
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "@/hooks/useTheme";

export default function Index() {

  const {toggleDarkMode} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        Edit app/index.tsx to edit this screen{' '}
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
    fontSize: 40
  }
});