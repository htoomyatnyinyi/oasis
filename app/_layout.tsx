import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  // return <Stack />;
  return (
    <Stack>
      <Stack.Screen name="(tabs)"></Stack.Screen>
      {/* <Stack.Screen name="signin" options={{ title: "signin" }}></Stack.Screen> */}
    </Stack>
  );
}
