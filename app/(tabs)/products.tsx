import ProductDetailsPreview from "@/components/products/ProductDetailsPreview";
import { useAddToCartMutation } from "@/services/api/cartApi";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/services/api/productApi";
import { Product } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2;

const ProductsScreen = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductsQuery({ page, limit: 10, category });

  const { data: categories } = useGetCategoriesQuery();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart({ productId: product.id, quantity: 1 }).unwrap();
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setSelectedProduct(item)}
      style={{
        width: COLUMN_WIDTH,
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      className="rounded-3xl p-3 mb-4 mx-2 border"
    >
      <View className="relative">
        <Image
          source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
          style={{ width: "100%", height: 160 }}
          className="rounded-2xl"
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          className="absolute top-2 right-2 p-1.5 rounded-full"
          onPress={() => handleAddToCart(item)}
        >
          <Ionicons name="cart-outline" size={20} color="#f97316" />
        </TouchableOpacity>
      </View>

      <View className="mt-2">
        <Text
          style={{ color: "#1a1a1a" }}
          className="font-semibold text-sm"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={{ color: "rgba(26, 26, 26, 0.6)" }}
          className="text-xs mt-1"
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text style={{ color: "#f97316" }} className="font-bold text-base">
            ${item.price}
          </Text>
          <View
            style={{ backgroundColor: "rgba(249, 115, 22, 0.1)" }}
            className="px-2 py-0.5 rounded-md"
          >
            <Text
              style={{ color: "#f97316" }}
              className="text-[10px] font-medium uppercase"
            >
              {item.category || "General"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View className="px-4 pb-4">
      <View className="flex-row justify-between items-center py-4">
        <View>
          <Text
            style={{ color: "rgba(26, 26, 26, 0.6)" }}
            className="text-sm font-medium"
          >
            Welcome to
          </Text>
          <Text style={{ color: "#1a1a1a" }} className="text-2xl font-bold">
            Oasis Shop
          </Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
          className="p-2 rounded-full border"
        >
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View
        style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
        className="flex-row items-center px-4 py-2 rounded-2xl border mb-4"
      >
        <Ionicons name="search-outline" size={20} color="gray" />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="gray"
          style={{ color: "#1a1a1a", height: 40 }}
          className="flex-1 ml-2"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={["All", ...(categories || [])]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCategory(item === "All" ? "" : item)}
            style={{
              backgroundColor:
                category === item || (item === "All" && !category)
                  ? "#f97316"
                  : "#ffffff",
              borderColor:
                category === item || (item === "All" && !category)
                  ? "#f97316"
                  : "#e5e7eb",
            }}
            className="px-6 py-2.5 rounded-2xl mr-2 border"
          >
            <Text
              style={{
                color:
                  category === item || (item === "All" && !category)
                    ? "#ffffff"
                    : "rgba(26, 26, 26, 0.7)",
              }}
              className="font-semibold text-sm"
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        className="mb-2"
      />
    </View>
  );

  if (isLoading && page === 1) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={productsResponse?.products || []}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          onRefresh={refetch}
          refreshing={isFetching}
          onEndReached={() => {
            if (productsResponse && page < productsResponse.totalPages) {
              setPage((prev) => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching && page > 1 ? (
              <ActivityIndicator className="my-4" color="#f97316" />
            ) : null
          }
          ListEmptyComponent={
            !isLoading && (
              <View className="items-center mt-20">
                <Ionicons name="basket-outline" size={80} color="lightgray" />
                <Text
                  style={{ color: "rgba(26, 26, 26, 0.4)" }}
                  className="mt-4 text-lg"
                >
                  No products found
                </Text>
              </View>
            )
          }
        />
        <ProductDetailsPreview
          isVisible={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      </SafeAreaView>
    </View>
  );
};

export default ProductsScreen;
