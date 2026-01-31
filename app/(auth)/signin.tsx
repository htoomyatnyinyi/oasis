import { useLoginMutation } from "@/services/api/authApi";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [signIn, { isLoading }] = useLoginMutation();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    try {
      const result = await signIn({ email, password }).unwrap();
      // Based on our transformResponse in authApi, data should be the actual response object
      if (result?.data?.token || result?.token) {
        router.replace("/products");
      }
    } catch (err: any) {
      setError(err?.data?.message || "Invalid credentials. Please try again.");
    }
  };



  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
            <View className="mt-12 items-center">
              <View
                style={{ backgroundColor: "rgba(249, 115, 22, 0.1)" }}
                className="p-6 rounded-[40px] mb-6"
              >
                <Ionicons name="cart" size={60} color="#f97316" />
              </View>
              <Text
                style={{ color: "#1a1a1a" }}
                className="text-3xl font-black mb-2"
              >
                Welcome Back
              </Text>
              <Text
                style={{ color: "rgba(26, 26, 26, 0.4)" }}
                className="text-center mb-10"
              >
                Sign in to continue your shopping journey
              </Text>
            </View>

            <View style={{ gap: 16 }}>
              <View>
                <Text
                  style={{ color: "#1a1a1a" }}
                  className="font-semibold mb-2 ml-1"
                >
                  Email Address
                </Text>
                <View
                  style={{ backgroundColor: "#f8f9fa", borderColor: "#e5e7eb" }}
                  className="flex-row items-center border rounded-2xl px-4 py-3"
                >
                  <Ionicons name="mail-outline" size={20} color="gray" />
                  <TextInput
                    placeholder="name@example.com"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{ color: "#1a1a1a" }}
                    className="flex-1 ml-3"
                  />
                </View>
              </View>

              <View>
                <Text
                  style={{ color: "#1a1a1a" }}
                  className="font-semibold mb-2 ml-1"
                >
                  Password
                </Text>
                <View
                  style={{ backgroundColor: "#f8f9fa", borderColor: "#e5e7eb" }}
                  className="flex-row items-center border rounded-2xl px-4 py-3"
                >
                  <Ionicons name="lock-closed-outline" size={20} color="gray" />
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="gray"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={{ color: "#1a1a1a" }}
                    className="flex-1 ml-3"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="items-end mt-2">
                <Text style={{ color: "#f97316" }} className="font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {error ? (
                <View
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderColor: "rgba(239, 68, 68, 0.2)",
                  }}
                  className="border p-4 rounded-2xl mt-4"
                >
                  <Text
                    style={{ color: "#ef4444" }}
                    className="text-center font-medium"
                  >
                    {error}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                onPress={handleSignIn}
                disabled={isLoading}
                style={{ backgroundColor: "#f97316", shadowColor: "#f97316" }}
                className="rounded-2xl p-5 mt-8 shadow-xl flex-row justify-center items-center"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">
                      Sign In
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-auto mb-10 pt-10">
              <Text style={{ color: "rgba(26, 26, 26, 0.4)" }}>
                Don't have an account?{" "}
              </Text>
              <Link href="/signup">
                <Text style={{ color: "#f97316" }} className="font-bold">
                  Sign Up
                </Text>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Signin;
