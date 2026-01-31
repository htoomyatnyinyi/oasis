import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@/services/api/cartApi";
import { CartItem } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const { data: cart, isLoading, refetch } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(itemId);
    } else {
      try {
        await updateCartItem({ itemId, quantity: newQuantity }).unwrap();
      } catch (error) {
        console.error("Failed to update quantity", error);
      }
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeCartItem(itemId).unwrap();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View
      style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
      className="flex-row p-4 rounded-3xl mb-4 border shadow-sm"
    >
      <Image
        source={{
          uri: item.product.imageUrl || "https://via.placeholder.com/150",
        }}
        style={{ width: 96, height: 96 }}
        className="rounded-2xl"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4 justify-between">
        <View>
          <View className="flex-row justify-between items-start">
            <Text
              style={{ color: "#1a1a1a" }}
              className="font-bold text-base flex-1 mr-2"
              numberOfLines={1}
            >
              {item.product.name}
            </Text>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
          <Text
            style={{ color: "rgba(26, 26, 26, 0.6)" }}
            className="text-xs mt-1"
            numberOfLines={1}
          >
            {item.product.category || "General"}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text style={{ color: "#f97316" }} className="font-black text-lg">
            ${item.product.price}
          </Text>
          <View
            style={{ backgroundColor: "#f8f9fa", borderColor: "#e5e7eb" }}
            className="flex-row items-center rounded-xl border px-1"
          >
            <TouchableOpacity
              onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1"
            >
              <Ionicons name="remove-circle-outline" size={24} color="gray" />
            </TouchableOpacity>
            <Text
              style={{ color: "#1a1a1a" }}
              className="mx-3 font-bold min-w-[20px] text-center"
            >
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1"
            >
              <Ionicons name="add-circle-outline" size={24} color="#f97316" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View className="px-4 py-4 flex-row items-center">
          <Text
            style={{ color: "#1a1a1a" }}
            className="text-2xl font-bold flex-1"
          >
            My Cart
          </Text>
          {cart?.items?.length ? (
            <Text
              style={{ color: "rgba(26, 26, 26, 0.6)" }}
              className="font-medium"
            >
              {cart.items.length} Items
            </Text>
          ) : null}
        </View>

        <FlatList
          data={cart?.items || []}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 160 }}
          refreshing={isLoading}
          onRefresh={refetch}
          ListEmptyComponent={
            <View className="items-center mt-32 px-10">
              <View
                style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
                className="p-8 rounded-full mb-6 border"
              >
                <Ionicons name="cart-outline" size={80} color="lightgray" />
              </View>
              <Text style={{ color: "#1a1a1a" }} className="text-xl font-bold">
                Your cart is empty
              </Text>
              <Text className="text-center mt-2 text-gray-400">
                Looks like you haven&apos;t added anything to your cart yet.
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: "#f97316", shadowColor: "#f97316" }}
                className="px-8 py-4 rounded-2xl mt-8 shadow-lg"
                onPress={() => router.push("/products")}
              >
                <Text className="text-white font-bold">Start Shopping</Text>
              </TouchableOpacity>
            </View>
          }
        />

        {cart && cart.items.length > 0 && (
          <View
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -10 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 20,
              bottom: 90,
            }}
            className="absolute left-6 right-6 p-6 rounded-[30px] border"
          >
            <View className="flex-row justify-between mb-2">
              <Text style={{ color: "rgba(26, 26, 26, 0.6)" }}>Subtotal</Text>
              <Text style={{ color: "#1a1a1a" }} className="font-semibold">
                ${cart.total}
              </Text>
            </View>
            <View className="flex-row justify-between mb-6">
              <Text style={{ color: "rgba(26, 26, 26, 0.6)" }}>
                Delivery Fee
              </Text>
              <Text className="text-green-500 font-semibold">Free</Text>
            </View>
            <View
              style={{ borderTopColor: "rgba(26, 26, 26, 0.1)" }}
              className="flex-row justify-between items-center mb-6 pt-4 border-t"
            >
              <Text style={{ color: "#1a1a1a" }} className="text-lg font-bold">
                Total
              </Text>
              <Text
                style={{ color: "#f97316" }}
                className="text-2xl font-black"
              >
                ${cart.total}
              </Text>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: "#f97316", shadowColor: "#f97316" }}
              className="p-4 rounded-2xl shadow-xl flex-row justify-center items-center"
              onPress={() => router.push("/checkout")}
            >
              <Text className="text-white font-bold text-lg mr-2">
                Checkout Now
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default CartScreen;
