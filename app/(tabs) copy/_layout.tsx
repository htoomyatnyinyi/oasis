import "@/global.css";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "green",
        tabBarActiveTintColor: "coral",
        headerShown: true,
      }}
    >
      {/* <Tabs.Screen name="index" options={{ title: "index" }}></Tabs.Screen> */}
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="posts"
        options={{
          title: "posts",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="align-center" size={size} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="theme"
        options={{
          title: "theme",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={size}
              color={color}
            />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
