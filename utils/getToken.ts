import AsyncStorage from "@react-native-async-storage/async-storage";

// Example: Getting the token in an arbitrary async function
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      console.log("Retrieved token:", token);
      return token;
    }
  } catch (e) {
    // error reading value
    console.error("Error retrieving token:", e);
  }
  return null;
};
