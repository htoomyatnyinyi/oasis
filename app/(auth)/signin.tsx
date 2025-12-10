import { useLoginMutation } from "@/services/api/authApi";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const [email, setEmail] = useState("htoomyat3@mail.com");
  const [password, setPassword] = useState("htoomyat2");

  const [login, { isLoading }] = useLoginMutation();
  const [cookie, setCookie] = useState(null);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     if (token) {
  //       console.log("Found existing token, ready to navigate.");
  //       // Optionally, use the token to fetch user data (getCurrentUser)
  //       // and then navigate to the main screen.
  //       router.replace("/(tabs)/products");
  //     }
  //   };
  //   checkToken();
  // }, []);

  // You can use a hook like `useRouter` from 'expo-router' for navigation
  // const router = useRouter(); // <--- If you are using expo-router

  const handleSignIn = async () => {
    try {
      const result = await login({ email, password }).unwrap();

      console.log("Sign-in successful:", result);

      // --- 1. Check if the login was successful and a token exists ---
      const token = result?.data?.token;

      if (token) {
        // --- 2. Store the token using AsyncStorage.setItem() ---

        // replace with rtk testing persistance
        // await AsyncStorage.setItem("token", token);
        console.log("Token stored successfully.");

        // --- 3. Navigate to the home or dashboard screen ---
        // router.replace("/home"); // Example navigation for expo-router
        // OR
        // Link to a non-existent path will likely throw an error,
        // you should use a router's navigation method here.
      } else {
        console.warn("Login successful but no token received.");
        // Handle case where success is true but token is missing
      }
    } catch (error) {
      // RTK Query errors (like 401 or 500) will land here.
      console.error("Sign-in failed:", error);
      // You can set a state for user feedback here, e.g., setErrorMessage("Invalid credentials").
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="mt-10">
        <Text className="text-3xl font-bold mb-6">Sign In</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        />

        <TouchableOpacity
          onPress={handleSignIn}
          disabled={isLoading}
          className="bg-blue-500 rounded-xl p-4 flex-row justify-center">
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-semibold">Sign In</Text>
          )}
        </TouchableOpacity>

        <View className="mt-5">
          <Link href="/signup">
            <Text className="text-blue-600 text-base">
              Don't have an account? Sign Up
            </Text>
          </Link>

          <Link href="/" className="mt-2">
            <Text className="text-blue-600 text-base">Back to Home</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

// import { useSignInMutation } from "@/services/api/authSlice";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Link, useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Signin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [signIn, { isLoading }] = useSignInMutation();
//   const router = useRouter();

//   const handleSignIn = async () => {
//     try {
//       const result = await signIn({ email, password }).unwrap();
//       console.log("Sign-in successful:", result);

//       // Assuming the result contains a token (adjust key/name as needed based on your API response)
//       if (result.token) {
//         AsyncStorage.setItem("userToken", result.token);
//       }

//       // Navigate to home or dashboard
//       router.replace("/");
//       // router.push("/");
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white p-5">
//       {isLoading ? (
//         <View>Loading</View>
//       ) : (
//         <View className="mt-10">
//           <Text className="text-3xl font-bold mb-6">Sign In</Text>

//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
//             autoCapitalize="none"
//           />

//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
//           />

//           <TouchableOpacity
//             onPress={handleSignIn}
//             disabled={isLoading}
//             className="bg-blue-500 rounded-xl p-4 flex-row justify-center"
//           >
//             {isLoading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text className="text-white text-lg font-semibold">Sign In</Text>
//             )}
//           </TouchableOpacity>

//           <View className="mt-5">
//             <Link href="/signup">
//               <Text className="text-blue-600 text-base">
//                 Don't have an account? Sign Up
//               </Text>
//             </Link>

//             <Link href="/" className="mt-2">
//               <Text className="text-blue-600 text-base">Back to Home</Text>
//             </Link>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Signin;
