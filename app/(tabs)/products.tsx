import {
  useGetProductsQuery,
  useSearchProductsQuery,
} from "@/services/api/productApi";
import { Product } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    <SafeAreaView key={item.id}>
      <Image source={{ uri: item.imageUrl }} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      {/* <TouchableOpacity onPress={() => handleAddToCart(item.id)}> */}
      <TouchableOpacity onPress={() => console.log(item.id)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
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

      <TouchableOpacity onPress={clearStorage}>
        <Text className="text-red-400">Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default products;

// import { useAddToCartMutation, useGetCartQuery } from "@/services/api/cartApi";
// import {
//   useGetCategoriesQuery,
//   useGetProductsQuery,
//   useSearchProductsQuery,
// } from "@/services/api/productApi";
// import { Product } from "@/types";
// import React, { useState } from "react";
// import {
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const ProductScreen = () => {
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch products with RTK Query
//   const {
//     data: productsData,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetProductsQuery({ page, limit: 10, category });

//   // Fetch categories
//   const { data: categories = [] } = useGetCategoriesQuery();

//   // Search functionality
//   const { data: searchResults } = useSearchProductsQuery(searchQuery, {
//     skip: !searchQuery,
//   });

//   // Cart functionality
//   const [addToCart] = useAddToCartMutation();
//   const { data: cart } = useGetCartQuery();

//   const handleAddToCart = async (productId: string) => {
//     try {
//       await addToCart({ productId, quantity: 1 }).unwrap();
//       // Success toast/notification
//     } catch (error) {
//       // Error handling
//     }
//   };

//   const renderProduct = ({ item }: { item: Product }) => (
//     <View style={styles.productCard}>
//       <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productPrice}>${item.price}</Text>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => handleAddToCart(item.id)}
//       >
//         <Text style={styles.addButtonText}>Add to Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (isError) {
//     return <Text>Error loading products</Text>;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search products..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* Categories */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {categories.map((cat: any) => (
//           <TouchableOpacity
//             key={cat}
//             style={[
//               styles.categoryChip,
//               category === cat && styles.categoryChipActive,
//             ]}
//             onPress={() => setCategory(category === cat ? "" : cat)}
//           >
//             <Text style={styles.categoryText}>{cat}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Products */}
//       <FlatList
//         data={searchQuery ? searchResults : productsData?.products}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         refreshing={isLoading}
//         onRefresh={refetch}
//         onEndReached={() => {
//           if (!productsData || page >= productsData.totalPages) return;
//           setPage((prev) => prev + 1);
//         }}
//         ListEmptyComponent={
//           <Text style={styles.emptyText}>No products found</Text>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   searchInput: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   productCard: {
//     flex: 1,
//     margin: 5,
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: "#f9f9f9",
//     elevation: 2,
//   },
//   productImage: {
//     width: "100%",
//     height: 150,
//     borderRadius: 6,
//     marginBottom: 8,
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 4,
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#2ecc71",
//     marginBottom: 8,
//   },
//   addButton: {
//     backgroundColor: "#3498db",
//     padding: 8,
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   addButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   categoryChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 20,
//   },
//   categoryChipActive: {
//     backgroundColor: "#3498db",
//   },
//   categoryText: {
//     color: "#333",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 50,
//     fontSize: 16,
//     color: "#666",
//   },
// });

// export default ProductScreen;
