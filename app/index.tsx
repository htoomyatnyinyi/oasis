import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const index = () => {
  useEffect(() => {
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

  return (
    <View>
      <Text>AuthMe</Text>
      <Link href={"/(auth)/signin"}>Signin</Link>
      <Link href={"/(tabs)/products"}>Tabs</Link>
    </View>
  );
};

export default index;
