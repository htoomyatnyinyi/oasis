import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Uniwind, useUniwind } from "uniwind";

const Theme = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();

  type ThemeName =
    | "light"
    | "dark"
    | "ocean"
    | "sunset"
    | "forest"
    | "high-contrast";

  const themes: { name: ThemeName; label: string; icon: string }[] = [
    { name: "light", label: "Light", icon: "☀️" },
    { name: "dark", label: "Dark", icon: "🌙" },
    { name: "ocean", label: "Ocean", icon: "🌊" },
    { name: "sunset", label: "Sunset", icon: "🌅" },
    { name: "forest", label: "Forest", icon: "🌲" },
    { name: "high-contrast", label: "High Contrast", icon: "♿" },
  ];

  const activeTheme = hasAdaptiveThemes ? "system" : theme;

  return (
    <SafeAreaView className="p-4 gap-4">
      <Text className="text-sm text-foreground">Current: {activeTheme}</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {themes.map((t) => (
            <Pressable
              key={t.name}
              onPress={() => Uniwind.setTheme(t.name)}
              className={`
                px-4 py-3 rounded-lg items-center
                ${
                  activeTheme === t.name
                    ? "bg-primary"
                    : "bg-card border border-border"
                }
              `}
            >
              <Text
                className={`text-2xl ${
                  activeTheme === t.name ? "text-white" : "text-foreground"
                }`}
              >
                {t.icon}
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  activeTheme === t.name ? "text-white" : "text-foreground"
                }`}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Theme;
