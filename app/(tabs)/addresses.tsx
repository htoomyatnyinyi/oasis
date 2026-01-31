import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useSetDefaultAddressMutation,
} from "@/services/api/addressApi";
import { Address } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddressItem = ({
  item,
  onDelete,
  onSetDefault,
}: {
  item: Address;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) => (
  <View
    style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
    className={`p-4 rounded-3xl mb-4 border shadow-sm ${
      item.isDefault ? "border-orange-500" : ""
    }`}
  >
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-row items-center">
        <Ionicons
          name={item.isDefault ? "home" : "location-outline"}
          size={20}
          color={item.isDefault ? "#f97316" : "gray"}
        />
        <Text className="ml-2 font-bold text-lg">
          {item.isDefault ? "Default Address" : "Shipping Address"}
        </Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          className="p-1 ml-2"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>

    <Text style={{ color: "rgba(26, 26, 26, 0.7)" }} className="text-base">
      {item.street}
    </Text>
    <Text style={{ color: "rgba(26, 26, 26, 0.7)" }} className="text-base">
      {item.city}, {item.state} {item.postalCode}
    </Text>
    <Text style={{ color: "rgba(26, 26, 26, 0.7)" }} className="text-base mb-4">
      {item.country}
    </Text>

    {!item.isDefault && (
      <TouchableOpacity
        onPress={() => onSetDefault(item.id)}
        className="flex-row items-center"
      >
        <Ionicons name="checkmark-circle-outline" size={16} color="#f97316" />
        <Text style={{ color: "#f97316" }} className="ml-1 font-semibold">
          Set as Default
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

const AddressesScreen = () => {
  const { data: addresses, isLoading, refetch } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const [setDefaultAddress] = useSetDefaultAddressMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleAddAddress = async () => {
    try {
      await addAddress(newAddress).unwrap();
      setModalVisible(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      });
      refetch();
    } catch (error) {
      console.error("Failed to add address", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id).unwrap();
    } catch (error) {
      console.error("Failed to set default address", error);
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
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text
            style={{ color: "#1a1a1a" }}
            className="text-2xl font-bold flex-1"
          >
            My Addresses
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ backgroundColor: "#f97316" }}
            className="p-2 rounded-xl"
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={addresses || []}
          renderItem={({ item }) => (
            <AddressItem
              item={item}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center mt-32 px-10">
              <View className="p-8 rounded-full mb-6 border border-gray-100">
                <Ionicons name="location-outline" size={80} color="lightgray" />
              </View>
              <Text style={{ color: "#1a1a1a" }} className="text-xl font-bold">
                No addresses saved
              </Text>
              <Text className="text-center mt-2 text-gray-400">
                Add a new address for faster checkout.
              </Text>
            </View>
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-[40px] p-8 h-[80%]">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold">Add New Address</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={28} color="gray" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                  <Text className="text-gray-500 mb-2 font-medium">Street</Text>
                  <TextInput
                    className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                    placeholder="123 Main St"
                    value={newAddress.street}
                    onChangeText={(text) =>
                      setNewAddress({ ...newAddress, street: text })
                    }
                  />
                </View>

                <View className="flex-row mb-4">
                  <View className="flex-1 mr-2">
                    <Text className="text-gray-500 mb-2 font-medium">City</Text>
                    <TextInput
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                      placeholder="New York"
                      value={newAddress.city}
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, city: text })
                      }
                    />
                  </View>
                  <View className="flex-1 ml-2">
                    <Text className="text-gray-500 mb-2 font-medium">
                      State
                    </Text>
                    <TextInput
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                      placeholder="NY"
                      value={newAddress.state}
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, state: text })
                      }
                    />
                  </View>
                </View>

                <View className="flex-row mb-4">
                  <View className="flex-1 mr-2">
                    <Text className="text-gray-500 mb-2 font-medium">Zip</Text>
                    <TextInput
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                      placeholder="10001"
                      keyboardType="numeric"
                      value={newAddress.postalCode}
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, postalCode: text })
                      }
                    />
                  </View>
                  <View className="flex-1 ml-2">
                    <Text className="text-gray-500 mb-2 font-medium">
                      Country
                    </Text>
                    <TextInput
                      className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                      placeholder="USA"
                      value={newAddress.country}
                      onChangeText={(text) =>
                        setNewAddress({ ...newAddress, country: text })
                      }
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={{ backgroundColor: "#f97316" }}
                  className="p-4 rounded-2xl mt-4 shadow-lg shadow-orange-500"
                  onPress={handleAddAddress}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Save Address
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default AddressesScreen;
