import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useUniwind } from "uniwind";

export default function TabsLayout() {
  const { theme } = useUniwind();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f97316", // Tailwind orange-500
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? "#333333" : "#eeeeee",
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 24,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "shop" : "shop-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* Hide existing screens that are not used in tabs anymore */}
      <Tabs.Screen
        name="map"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="modal"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
