import "@/global.css";

import { store } from "@/services/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { useUniwind } from "uniwind";

export default function RootLayout() {
  const { theme: uniWindTheme } = useUniwind();
  return (
    <ThemeProvider value={uniWindTheme === "light" ? DefaultTheme : DarkTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)"></Stack.Screen>
          <Stack.Screen
            name="index"
            options={{ title: "index" }}
          ></Stack.Screen>
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
