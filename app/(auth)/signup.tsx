import { useRegisterMutation } from "@/services/api/authApi";
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

const Signup = () => {
  const [form, setForm] = useState({
    username: "ts",
    email: "ts@mail.com",
    password: "tstststs",
    firstName: "ts",
    lastName: "ts",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleSignUp = async () => {
    if (!form.email || !form.password || !form.username) {
      setError("Please fill in all required fields");
      return;
    }
    console.log(form, 'result');
    setError("");
    try {
      const result = await register(form).unwrap();
      if (result?.data?.token || result?.token) {
        router.replace("/products");
      } else {
        router.replace("/signin");
      }
    } catch (err: any) {
      setError(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
            <View className="mt-8 items-center">
              <Text
                style={{ color: "#1a1a1a" }}
                className="text-3xl font-black mb-2"
              >
                Create Account
              </Text>
              <Text
                style={{ color: "rgba(26, 26, 26, 0.4)" }}
                className="text-center mb-8"
              >
                Join Oasis and start your shopping experience
              </Text>
            </View>

            <View style={{ gap: 16 }}>
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Text
                    style={{ color: "#1a1a1a" }}
                    className="font-semibold mb-2 ml-1"
                  >
                    First Name
                  </Text>
                  <TextInput
                    placeholder="John"
                    placeholderTextColor="gray"
                    value={form.firstName}
                    onChangeText={(val) => updateForm("firstName", val)}
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderColor: "#e5e7eb",
                      color: "#1a1a1a",
                    }}
                    className="border rounded-2xl px-4 py-3"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text
                    style={{ color: "#1a1a1a" }}
                    className="font-semibold mb-2 ml-1"
                  >
                    Last Name
                  </Text>
                  <TextInput
                    placeholder="Doe"
                    placeholderTextColor="gray"
                    value={form.lastName}
                    onChangeText={(val) => updateForm("lastName", val)}
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderColor: "#e5e7eb",
                      color: "#1a1a1a",
                    }}
                    className="border rounded-2xl px-4 py-3"
                  />
                </View>
              </View>

              <View>
                <Text
                  style={{ color: "#1a1a1a" }}
                  className="font-semibold mb-2 ml-1"
                >
                  Username
                </Text>
                <View
                  style={{ backgroundColor: "#f8f9fa", borderColor: "#e5e7eb" }}
                  className="flex-row items-center border rounded-2xl px-4 py-3"
                >
                  <Ionicons name="person-outline" size={20} color="gray" />
                  <TextInput
                    placeholder="johndoe"
                    placeholderTextColor="gray"
                    value={form.username}
                    onChangeText={(val) => updateForm("username", val)}
                    autoCapitalize="none"
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
                  Email Address
                </Text>
                <View
                  style={{ backgroundColor: "#f8f9fa", borderColor: "#e5e7eb" }}
                  className="flex-row items-center border rounded-2xl px-4 py-3"
                >
                  <Ionicons name="mail-outline" size={20} color="gray" />
                  <TextInput
                    placeholder="john@example.com"
                    placeholderTextColor="gray"
                    value={form.email}
                    onChangeText={(val) => updateForm("email", val)}
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
                    value={form.password}
                    onChangeText={(val) => updateForm("password", val)}
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
                onPress={handleSignUp}
                disabled={isLoading}
                style={{ backgroundColor: "#f97316", shadowColor: "#f97316" }}
                className="rounded-2xl p-5 mt-8 shadow-xl flex-row justify-center items-center"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white text-lg font-bold mr-2">
                      Create Account
                    </Text>
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color="white"
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-10 mb-10">
              <Text style={{ color: "rgba(26, 26, 26, 0.4)" }}>
                Already have an account?{" "}
              </Text>
              <Link href="/signin">
                <Text style={{ color: "#f97316" }} className="font-bold">
                  Sign In
                </Text>
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
