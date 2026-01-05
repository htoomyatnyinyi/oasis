import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

interface ProductDetailsPreviewProps {
  isVisible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const { width, height } = Dimensions.get("window");

const ProductDetailsPreview: React.FC<ProductDetailsPreviewProps> = ({
  isVisible,
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onAddToCart(product);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      style={{ margin: 0, justifyContent: "flex-end" }}
      propagateSwipe
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View className="h-[85%] bg-white rounded-t-[3rem] overflow-hidden">
        {/* Handle Bar */}
        <View className="items-center pt-4 pb-2 bg-white z-10">
          <View className="w-16 h-1.5 bg-gray-300 rounded-full" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          className="flex-1"
        >
          {/* Product Image */}
          <View className="relative w-full h-80 bg-gray-50">
            <Image
              source={{ uri: product.imageUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
            <TouchableOpacity
              onPress={onClose}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-md"
            >
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="px-6 py-6">
            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1 mr-4">
                <Text className="text-sm font-medium text-orange-500 uppercase tracking-wider mb-1">
                  {product.category || "General"}
                </Text>
                <Text className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-black text-orange-500">
                  ${product.price}
                </Text>
                {product.stock > 0 ? (
                  <Text className="text-xs font-medium text-green-600 mt-1">
                    In Stock ({product.stock})
                  </Text>
                ) : (
                  <Text className="text-xs font-medium text-red-500 mt-1">
                    Out of Stock
                  </Text>
                )}
              </View>
            </View>

            <View className="flex-row items-center mb-6 space-x-4">
              <View className="flex-row items-center bg-yellow-100 px-3 py-1 rounded-lg">
                <Ionicons name="star" size={16} color="#eab308" />
                <Text className="ml-1 font-bold text-yellow-700">4.8</Text>
                <Text className="ml-1 text-xs text-yellow-600">
                  (120 reviews)
                </Text>
              </View>
              <View className="flex-row items-center bg-gray-100 px-3 py-1 rounded-lg">
                <Ionicons name="time-outline" size={16} color="#6b7280" />
                <Text className="ml-1 text-xs text-gray-600">
                  Fast Delivery
                </Text>
              </View>
            </View>

            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </Text>
            <Text className="text-gray-500 leading-6 text-base mb-6">
              {product.description}
            </Text>

            {/* Additional Details (Mock) */}
            <View className="border-t border-gray-100 pt-6">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Product Specs
              </Text>
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Material</Text>
                  <Text className="font-medium text-gray-900">
                    Premium Cotton
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Weight</Text>
                  <Text className="font-medium text-gray-900">0.5 kg</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Origin</Text>
                  <Text className="font-medium text-gray-900">Italy</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 34 : 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 20,
          }}
          className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 border-t border-gray-100"
        >
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="w-14 h-14 border border-gray-200 rounded-2xl items-center justify-center">
              <Ionicons name="heart-outline" size={28} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddToCart}
              className="flex-1 bg-gray-900 h-14 rounded-2xl flex-row items-center justify-center space-x-2"
            >
              <Ionicons name="cart" size={24} color="white" />
              <Text className="text-white font-bold text-lg">Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDetailsPreview;
