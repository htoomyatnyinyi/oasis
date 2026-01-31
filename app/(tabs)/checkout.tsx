import {
  useCalculateTotalsMutation,
  useCheckoutCreateOrderMutation,
  useGetCheckoutSummaryQuery,
} from "@/services/api/checkoutApi";
import { Address } from "@/types";
import { useStripe } from "@stripe/stripe-react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutScreen = () => {
  const { data: summary, isLoading } = useGetCheckoutSummaryQuery();
  const [calculateTotals] = useCalculateTotalsMutation();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCheckoutCreateOrderMutation();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("cod");
  const [totals, setTotals] = useState<any>(null);

  useEffect(() => {
    if (summary) {
      const defaultAddr = summary.addresses.find((a: Address) => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr.id);

      if (summary.defaultShippingMethod) {
        setSelectedShipping(summary.defaultShippingMethod.id);
      }
    }
  }, [summary]);

  const handleCalculateTotals = useCallback(async () => {
    try {
      const result = await calculateTotals({
        shippingAddressId: selectedAddress,
        shippingMethodId: selectedShipping,
      }).unwrap();
      setTotals(result.totals);
    } catch (error) {
      console.error("Failed to calculate totals", error);
    }
  }, [selectedAddress, selectedShipping, calculateTotals]);

  useEffect(() => {
    if (selectedAddress && selectedShipping) {
      handleCalculateTotals();
    }
  }, [selectedAddress, selectedShipping, handleCalculateTotals]);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedShipping) {
      Alert.alert("Error", "Please select an address and shipping method");
      return;
    }

    try {
      const response = await createOrder({
        shippingAddressId: selectedAddress,
        shippingMethodId: selectedShipping,
        paymentMethod,
      }).unwrap();

      if (paymentMethod === "card" && response.clientSecret) {
        const { error: initError } = await initPaymentSheet({
          paymentIntentClientSecret: response.clientSecret,
          merchantDisplayName: "Oasis App",
          defaultBillingDetails: {
            name:
              (summary as any)?.user?.firstName +
              " " +
              (summary as any)?.user?.lastName,
          },
        });

        if (initError) {
          Alert.alert("Error", initError.message);
          return;
        }

        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          Alert.alert("Error", presentError.message);
          return;
        }
      }

      Alert.alert("Success", "Order placed successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/orders"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.data?.message || "Failed to place order");
    }
  };

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
        <View className="px-4 py-4 flex-row items-center bg-white">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text
            style={{ color: "#1a1a1a" }}
            className="text-2xl font-bold flex-1"
          >
            Checkout
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Shipping Address */}
          <View className="p-4 bg-white mt-2">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Shipping Address</Text>
              <TouchableOpacity onPress={() => router.push("/addresses")}>
                <Text className="text-orange-500 font-semibold">Change</Text>
              </TouchableOpacity>
            </View>

            {summary?.addresses?.length > 0 ? (
              <View className="p-4 rounded-2xl border border-gray-100 bg-gray-50">
                {summary.addresses
                  .filter((a: Address) =>
                    selectedAddress ? a.id === selectedAddress : a.isDefault,
                  )
                  .map((addr: Address) => (
                    <View key={addr.id}>
                      <Text className="font-bold mb-1">{addr.street}</Text>
                      <Text className="text-gray-500">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </Text>
                      <Text className="text-gray-500">{addr.country}</Text>
                    </View>
                  ))}
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => router.push("/addresses")}
                className="p-4 rounded-2xl border border-dashed border-gray-300 items-center"
              >
                <Ionicons name="add-circle-outline" size={24} color="gray" />
                <Text className="text-gray-500 mt-1">Add New Address</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Shipping Method */}
          <View className="p-4 bg-white mt-2">
            <Text className="text-lg font-bold mb-4">Shipping Method</Text>
            {summary?.availableShippingMethods?.map((method: any) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedShipping(method.id)}
                className={`p-4 rounded-2xl border mb-3 flex-row justify-between items-center ${
                  selectedShipping === method.id
                    ? "border-orange-500 bg-orange-50/50"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <View>
                  <Text className="font-bold text-base">{method.name}</Text>
                  <Text className="text-gray-500 text-sm">
                    {method.deliveryDays} days delivery
                  </Text>
                </View>
                <Text className="font-black text-orange-500">
                  ${method.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment Method */}
          <View className="p-4 bg-white mt-2">
            <Text className="text-lg font-bold mb-4">Payment Method</Text>
            <TouchableOpacity
              onPress={() => setPaymentMethod("cod")}
              className={`p-4 rounded-2xl border mb-3 flex-row items-center ${
                paymentMethod === "cod"
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <Ionicons
                name={
                  paymentMethod === "cod"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={paymentMethod === "cod" ? "#f97316" : "gray"}
              />
              <Text className="ml-3 font-bold">Cash on Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPaymentMethod("card")}
              className={`p-4 rounded-2xl border mb-3 flex-row items-center ${
                paymentMethod === "card"
                  ? "border-orange-500 bg-orange-50/50"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <Ionicons
                name={
                  paymentMethod === "card"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={paymentMethod === "card" ? "#f97316" : "gray"}
              />
              <Text className="ml-3 font-bold">Credit / Debit Card</Text>
              <View className="flex-1" />
              <Ionicons name="card-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Order Summary */}
          <View className="p-4 bg-white mt-2 mb-32">
            <Text className="text-lg font-bold mb-4">Order Summary</Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="font-semibold">${totals?.subtotal || 0}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Shipping</Text>
              <Text className="font-semibold">
                ${totals?.shippingAmount || 0}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Tax</Text>
              <Text className="font-semibold">${totals?.taxAmount || 0}</Text>
            </View>
            {totals?.discountAmount > 0 && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-green-500">Discount</Text>
                <Text className="font-semibold text-green-500">
                  -${totals.discountAmount}
                </Text>
              </View>
            )}
            <View className="border-t border-gray-100 my-4 pt-4 flex-row justify-between items-center">
              <Text className="text-xl font-bold">Total</Text>
              <Text className="text-2xl font-black text-orange-500">
                ${totals?.totalAmount || 0}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <TouchableOpacity
            style={{ backgroundColor: "#f97316" }}
            className={`p-4 rounded-2xl shadow-xl flex-row justify-center items-center ${
              isCreatingOrder ? "opacity-70" : ""
            }`}
            onPress={handlePlaceOrder}
            disabled={isCreatingOrder}
          >
            {isCreatingOrder ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-bold text-lg mr-2">
                  Place Order
                </Text>
                <Ionicons name="checkmark-circle" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CheckoutScreen;
