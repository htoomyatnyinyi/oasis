import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ title: "signin" }}></Stack.Screen>
      <Stack.Screen name="signup" options={{ title: "signup" }}></Stack.Screen>
    </Stack>
  );
}
