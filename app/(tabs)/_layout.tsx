import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos"
        }}
      />
    </Tabs>
  )
}
export default TabsLayout