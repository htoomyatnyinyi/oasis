import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { Uniwind } from "uniwind";

export default function Index() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const switchTheme = () => {
    // 1. Determine the NEW theme state
    const newTheme = theme === "light" ? "dark" : "light";

    // 2. Update the local state
    setTheme(newTheme);

    // 3. Inform Uniwind about the new theme
    // We pass the newTheme variable here.
    Uniwind.setTheme(newTheme);
  };
  // const setSystemTheme = () => {
  //   Uniwind.setTheme("system");
  // };
  const setOcean = () => {
    Uniwind.setTheme("ocean");
  };
  const setSunset = () => {
    Uniwind.setTheme("sunset");
  };
  const setForest = () => {
    Uniwind.setTheme("forest");
  };
  const setHigh = () => {
    Uniwind.setTheme("high-contrast");
  };

  console.log(theme, "theme");

  return (
    <View className="flex-1 item-center justify-center bg-background">
      <Text className="text-green dark:text-yellow-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, fugit.
        Dolores autem, nulla porro corrupti expedita sit odio placeat aliquam
        repellat temporibus, sapiente tempore accusamus, totam esse minus
        officiis vel.
      </Text>
      <Link href="/signin">Signin</Link>
      <Link href="/theme">Theme</Link>
      <Text>
        here-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
        laboriosam iure ipsam incidunt ut. Expedita dolores corporis debitis
        assumenda et incidunt quam. Perferendis rerum libero pariatur, vel ametr
        quo id.
      </Text>
      <Text className="p-2 m-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
        reprehenderit! Odit optio accusantium cum dolorum soluta laborum
        perspiciatis aut, iusto molestias facilis blanditiis consequatur, ad
        nobis ratione ex fugit exercitationem!
      </Text>
      <Button
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Theme`}
        onPress={switchTheme}
      />
      {/* <Button title={`Switch to system Theme`} onPress={setSystemTheme} /> */}
      <Button title={`Switch to ocean Theme`} onPress={setOcean} />
      <Button title={`Switch to forest Theme`} onPress={setForest} />
      <Button title={`Switch to hign Theme`} onPress={setHigh} />
      <Button title={`Switch to sunset Theme`} onPress={setSunset} />
    </View>
  );
}
