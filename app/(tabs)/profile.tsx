import { logout, selectCurrentUser } from "@/services/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signin");
  };

  const menuItems = [
    { icon: "person-outline", label: "Edit Profile", color: "#3b82f6" },
    {
      icon: "location-outline",
      label: "Shipping Address",
      color: "#10b981",
      onPress: () => router.push("/addresses"),
    },
    {
      icon: "receipt-outline",
      label: "Order History",
      color: "#f59e0b",
      onPress: () => router.push("/orders"),
    },
    { icon: "card-outline", label: "Payment Methods", color: "#6366f1" },
    { icon: "notifications-outline", label: "Notifications", color: "#ec4899" },
    {
      icon: "shield-checkmark-outline",
      label: "Privacy & Security",
      color: "#8b5cf6",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView className="flex-1 px-4">
          {/* Header */}
          <View className="py-6 flex-row justify-between items-center">
            <Text style={{ color: "#a1a1a1" }} className="text-2xl font-bold">
              Profile
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
              className="p-2 rounded-full border"
            >
              <Ionicons name="settings-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5,
            }}
            className="items-center p-8 rounded-[40px] border mb-8"
          >
            <View className="relative">
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                }}
                style={{ width: 100, height: 100, backgroundColor: "#f3f4f6" }}
                className="rounded-full"
              />
              <TouchableOpacity
                style={{ backgroundColor: "#f97316" }}
                className="absolute bottom-0 right-0 p-2 rounded-full border-4 border-white"
              >
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: "#1a1a1a" }}
              className="text-xl font-bold mt-4"
            >
              {user?.firstName
                ? `${user.firstName} ${user.lastName}`
                : "John Doe"}
            </Text>
            <Text
              style={{ color: "rgba(26, 26, 26, 0.4)" }}
              className="text-sm font-medium"
            >
              {user?.email || "john.doe@example.com"}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row mb-8" style={{ gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#f8f9fa",
                borderColor: "#e5e7eb",
              }}
              className="p-4 rounded-3xl items-center border"
            >
              <Text style={{ color: "#f97316" }} className="text-lg font-bold">
                12
              </Text>
              <Text
                style={{ color: "rgba(26, 26, 26, 0.4)" }}
                className="text-[10px] font-bold uppercase"
              >
                Orders
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#f8f9fa",
                borderColor: "#e5e7eb",
              }}
              className="p-4 rounded-3xl items-center border"
            >
              <Text style={{ color: "#f97316" }} className="text-lg font-bold">
                4
              </Text>
              <Text
                style={{ color: "rgba(26, 26, 26, 0.4)" }}
                className="text-[10px] font-bold uppercase"
              >
                Coupons
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#f8f9fa",
                borderColor: "#e5e7eb",
              }}
              className="p-4 rounded-3xl items-center border"
            >
              <Text style={{ color: "#f97316" }} className="text-lg font-bold">
                850
              </Text>
              <Text
                style={{ color: "rgba(26, 26, 26, 0.4)" }}
                className="text-[10px] font-bold uppercase"
              >
                Points
              </Text>
            </View>
          </View>

          {/* Menu */}
          <View
            style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
            className="rounded-[40px] border overflow-hidden mb-8"
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderBottomWidth: index === menuItems.length - 1 ? 0 : 1,
                  borderBottomColor: "rgba(26, 26, 26, 0.05)",
                }}
                className="flex-row items-center p-5"
                onPress={item.onPress}
              >
                <View
                  style={{ backgroundColor: `${item.color}15` }}
                  className="p-2.5 rounded-2xl mr-4"
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>
                <Text
                  style={{ color: "#1a1a1a" }}
                  className="flex-1 font-semibold"
                >
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="lightgray" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.2)",
            }}
            className="flex-row items-center justify-center p-5 rounded-3xl border mb-10"
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#ef4444"
              className="mr-2"
            />
            <Text
              style={{ color: "#ef4444" }}
              className="font-bold text-base ml-2"
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
