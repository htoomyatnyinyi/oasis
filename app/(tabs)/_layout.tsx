import "@/global.css";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "green",
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "index" }}></Tabs.Screen>
      <Tabs.Screen name="signin" options={{ title: "signin" }}></Tabs.Screen>
      <Tabs.Screen name="theme" options={{ title: "theme" }}></Tabs.Screen>
    </Tabs>
  );
}
