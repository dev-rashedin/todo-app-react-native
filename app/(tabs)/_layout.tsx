import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'green',
      tabBarStyle: {
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "gray",
        height: 90,
        paddingBottom: 30,
        paddingTop: 15
      },
      tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: "600"
      },
      headerShown: false
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='flash-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
export default TabsLayout