import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Link href="/">Index</Link>
    </View>
  );
};

export default signin;
