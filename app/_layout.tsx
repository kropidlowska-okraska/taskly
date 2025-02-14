import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colorCerulean,
        tabBarInactiveTintColor: theme.colorGrey,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Lista zakupów",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Licznik",
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Pomysł",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hand-sparkles" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
