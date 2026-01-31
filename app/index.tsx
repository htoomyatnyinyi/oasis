import { selectCurrentToken } from "@/services/slices/authSlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function SplashScreen() {
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        router.replace("/products");
      } else {
        router.replace("/signin");
      }
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f97316",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View className="bg-white/20 p-8 rounded-[50px]">
        <Ionicons name="cart" size={100} color="white" />
      </View>
      <Text className="text-white text-4xl font-black mt-6 tracking-widest">
        OASIS
      </Text>
      <Text className="text-white/70 text-base mt-2">
        Premium Ecommerce Experience
      </Text>

      <View className="absolute bottom-20">
        <ActivityIndicator color="white" size="large" />
      </View>
    </SafeAreaView>
  );
}
