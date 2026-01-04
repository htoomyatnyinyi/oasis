import "@/global.css";
import { setToken } from "@/services/slices/authSlice";
import { store } from "@/services/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthInitializer: Checking storage for token...");
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          console.log("AuthInitializer: Found token, hydrating state.");
          dispatch(setToken(token));
        } else {
          console.log("AuthInitializer: No token found.");
        }
      } catch (e) {
        console.error("AuthInitializer: Error during hydration:", e);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthInitializer>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthInitializer>
      </SafeAreaProvider>
    </Provider>
  );
}
