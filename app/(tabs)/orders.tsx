import { useGetOrdersQuery } from "@/services/api/orderApi";
import { Order } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderItem = ({ item }: { item: Order }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "#f59e0b";
      case "PAID":
        return "#10b981";
      case "SHIPPED":
        return "#3b82f6";
      case "DELIVERED":
        return "#059669";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "gray";
    }
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
      className="p-4 rounded-3xl mb-4 border shadow-sm"
      onPress={() => {
        /* router.push(`/orders/${item.id}`) */
      }}
    >
      <View className="flex-row justify-between items-center mb-4">
        <View>
          <Text style={{ color: "rgba(26, 26, 26, 0.4)" }} className="text-xs">
            Order ID
          </Text>
          <Text style={{ color: "#1a1a1a" }} className="font-bold">
            #{item.id.slice(-8).toUpperCase()}
          </Text>
        </View>
        <View
          style={{ backgroundColor: `${getStatusColor(item.status)}15` }}
          className="px-3 py-1 rounded-full"
        >
          <Text
            style={{ color: getStatusColor(item.status) }}
            className="text-xs font-bold"
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-end">
        <View>
          <Text style={{ color: "rgba(26, 26, 26, 0.4)" }} className="text-xs">
            Placed on
          </Text>
          <Text style={{ color: "#1a1a1a" }} className="font-medium">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View>
          <Text
            style={{ color: "rgba(26, 26, 26, 0.4)" }}
            className="text-xs text-right"
          >
            Total Amount
          </Text>
          <Text style={{ color: "#f97316" }} className="text-xl font-black">
            ${item.totalAmount}
          </Text>
        </View>
      </View>

      <View className="mt-4 pt-4 border-t border-gray-50 flex-row items-center justify-between">
        <Text style={{ color: "rgba(26, 26, 26, 0.6)" }} className="text-xs">
          View Details
        </Text>
        <Ionicons name="chevron-forward" size={16} color="lightgray" />
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = () => {
  const { data, isLoading, refetch } = useGetOrdersQuery();
  const orders = (data as any)?.orders || [];

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="px-4 py-4 flex-row items-center bg-white shadow-sm">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text
            style={{ color: "#1a1a1a" }}
            className="text-2xl font-bold flex-1"
          >
            My Orders
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Ionicons name="refresh" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          refreshing={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={
            <View className="items-center mt-32 px-10">
              <View className="p-8 rounded-full mb-6 border border-gray-100 bg-white">
                <Ionicons name="receipt-outline" size={80} color="lightgray" />
              </View>
              <Text style={{ color: "#1a1a1a" }} className="text-xl font-bold">
                No orders yet
              </Text>
              <Text className="text-center mt-2 text-gray-400">
                You haven&apos;t placed any orders yet. Start shopping and find
                great deals!
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: "#f97316" }}
                className="px-8 py-4 rounded-2xl mt-8 shadow-lg shadow-orange-500"
                onPress={() => router.push("/products")}
              >
                <Text className="text-white font-bold">Start Shopping</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default OrdersScreen;
