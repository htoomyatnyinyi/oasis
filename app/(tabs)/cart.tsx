import React from "react";
import { Text, View } from "react-native";

const cart = () => {
  return (
    <View>
      <Text>cart</Text>
    </View>
  );
};

export default cart;
// import {
//   useClearCartMutation,
//   useGetCartQuery,
//   useRemoveCartItemMutation,
//   useUpdateCartItemMutation,
// } from "@/services/api/cartApi";
// import { CartItem } from "@/types";
// import React from "react";
// import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// // import Icon from "react-native-vector-icons/MaterialIcons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { SafeAreaView } from "react-native-safe-area-context";

// const CartScreen = () => {
//   const { data: cart, isLoading } = useGetCartQuery();
//   const [updateCartItem] = useUpdateCartItemMutation();
//   const [removeCartItem] = useRemoveCartItemMutation();
//   const [clearCart] = useClearCartMutation();

//   const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeCartItem(itemId);
//     } else {
//       updateCartItem({ itemId, quantity: newQuantity });
//     }
//   };

//   const renderCartItem = ({ item }: { item: CartItem }) => (
//     <View>
//       <Image source={{ uri: item.product.imageUrl }} />
//       <View>
//         <Text>{item.product.name}</Text>
//         <Text>${item.product.price}</Text>

//         <View>
//           <TouchableOpacity
//             onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//           >
//             <FontAwesome name="remove" size={24} color="black" />
//           </TouchableOpacity>

//           <Text>{item.quantity}</Text>

//           <TouchableOpacity
//             onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//           >
//             <AntDesign name="appstore-add" size={24} color="black" />{" "}
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => removeCartItem(item.id)}>
//             <AntDesign name="delete" size={24} color="black" />{" "}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   if (isLoading) {
//     return <Text>Loading cart...</Text>;
//   }

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={cart?.items || []}
//         renderItem={renderCartItem}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={<Text>Your cart is empty</Text>}
//       />

//       {cart && cart.items.length > 0 && (
//         <View>
//           <View>
//             <Text>Total:</Text>
//             <Text>${cart.total}</Text>
//           </View>

//           <TouchableOpacity>
//             <Text>Checkout</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => clearCart()}>
//             <Text>Clear Cart</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };
// export default CartScreen;
