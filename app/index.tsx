import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const index = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // const a = fetch("http://localhost:8080/health");
    // console.log(a);
    // // a.then((res) => res.json()).then((data) => console.log(data, "data"));

    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        console.log("Found existing token, ready to navigate.");
        // Optionally, use the token to fetch user data (getCurrentUser)
        // and then navigate to the main screen.
        router.replace("/(tabs)/products");
      }
    };
    checkToken();
  }, []);

  const inputNameHandler = (val: string) => {
    setName(val);
  };
  const AddToContentHandler = () => {
    setContent((prev) => [
      ...prev,
      { id: Math.random().toString(), name, price, quantity },
    ]);

    setName("");
    setPrice(0);
    setQuantity(0);
  };

  return (
    <SafeAreaView>
      <Text>AuthMe</Text>
      <Link href={"/(auth)/signin"}>Signin</Link>
      <Link href={"/(tabs)/products"}>Tabs</Link>
      <View>
        <TextInput
          placeholder="name"
          className="p-2 m-1 border-amber-500 border-b-2"
          onChangeText={inputNameHandler}
        />
        <TextInput
          placeholder="price"
          className="p-2 m-1 border-amber-500 border-b-2"
          onChangeText={(e) => setPrice(Number(e))}
        />
        <TextInput
          placeholder="quantity"
          className="p-2 m-1 border-amber-500 border-b-2"
          onChangeText={(e) => setQuantity(Number(e))}
        />
        <Button title="submit" onPress={AddToContentHandler} />
      </View>
      <FlatList
        data={content}
        renderItem={(item) => (
          <View>
            <Text>Name: {item.item.name} </Text>
            <Text>Price: {item.item.price} </Text>
            <Text>Quantity: {item.item.quantity} </Text>
          </View>
        )}
        keyExtractor={(content) => content.id}
        className="p-2 m-1 bg-amber-500"
      />
    </SafeAreaView>
  );
};

export default index;
