import { useGetCartQuery } from "@/services/api/cartApi";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useUniwind } from "uniwind";

export default function TabsLayout() {
  const { theme } = useUniwind();
  const { data: cart } = useGetCartQuery();
  const cartItemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

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
              name={focused ? "storefront" : "storefront-outline"}
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
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#f97316",
            color: "white",
            fontSize: 10,
          },
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
      {/* Hide screens that should not be tabs */}
      <Tabs.Screen
        name="addresses"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          href: null,
        }}
      />
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
