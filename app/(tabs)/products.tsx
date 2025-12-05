import {
  useGetProductsQuery,
  useSearchProductsQuery,
} from "@/services/api/productApi";
import { Product } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const products = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products with RTK Query
  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({ page, limit: 10, category });

  // Search functionality
  const { data: searchResults } = useSearchProductsQuery(searchQuery, {
    skip: !searchQuery,
  });

  const renderProduct = ({ item }: { item: Product }) => (
    <SafeAreaView
      key={item.id}
      className="flex-1 justify-center items-center backdrop-blur-3xl shadow-2xl p-2 m-1 border-amber-400 "
    >
      <Link href={`/products/${item.id}`} className="mb-2"></Link>
      {/* href=
      {{
        pathname: "/user/[id]",
        params: { id: "bacon" },
      }} */}
      <Image source={{ uri: item.imageUrl }} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      {/* <TouchableOpacity onPress={() => handleAddToCart(item.id)}> */}
      <TouchableOpacity onPress={() => console.log(item.id)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>

      <Link href={`/newproduct`} className="p-2 m-1">
        Product Form
      </Link>
    </SafeAreaView>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading products</Text>;
  }

  const clearStorage = async () => {
    await AsyncStorage.removeItem("token");
    console.log("Token was cleared!");
  };

  return (
    <SafeAreaView>
      <Text>products</Text>
      <FlatList
        data={searchQuery ? searchResults : productsData?.data?.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={() => {
          if (!productsData || page >= productsData.totalPages) return;
          setPage((prev) => prev + 1);
        }}
        ListEmptyComponent={<Text>No products found</Text>}
      />

      <TouchableOpacity onPress={clearStorage} className="bg-amber-300 p-2 m-1">
        <Text className="text-red-400">Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default products;
