import { useGetProductsQuery } from "@/redux/api/productApi";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { data: products, isLoading: isProductsLoading } =
    useGetProductsQuery();

  if (isProductsLoading) return <Text>Loading...</Text>;

  console.log(products, "query products");

  return (
    <SafeAreaView>
      <Text>home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
