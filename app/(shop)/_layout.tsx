import { Stack } from "expo-router";

export default function ShopLayout() {
  return (
    <Stack>
      <Stack.Screen name="other" options={{ title: "other" }}></Stack.Screen>
    </Stack>
  );
}
