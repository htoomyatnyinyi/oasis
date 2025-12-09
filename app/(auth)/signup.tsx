import { useRegisterMutation } from "@/services/api/authApi";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [content, setContenet] = useState<any>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  //   "email": "hevid47677@docsfy.com",
  // "password": "htoomyat",
  // "username": "hevi",
  // "firstName": "he",
  // "lastName": "vi"

  console.log(form, "form");

  const handleSignUp = async () => {
    const da = await register(form);
    console.log(da, "return data");
  };

  return (
    <SafeAreaView>
      <Text>signup</Text>
      <TextInput
        placeholder="name"
        className="p-2 m-1 text-sky-500"
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
      />
      <TextInput
        placeholder="price"
        className="p-2 m-1 text-sky-500"
        value={form.price}
        onChangeText={(value) => setForm({ ...form, price: value })}
      />
      <TextInput
        placeholder="quantity"
        className="p-2 m-1 text-sky-500"
        value={form.quantity}
        onChangeText={(value) => setForm({ ...form, quantity: value })}
      />
      <Button
        disabled={isRegistering}
        title={isRegistering ? "registering" : "submit"}
        onPress={handleSignUp}
      />
    </SafeAreaView>
  );
};

export default signup;
