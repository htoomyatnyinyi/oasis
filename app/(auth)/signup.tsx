import { useRegisterMutation } from "@/services/api/authApi";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [content, setContenet] = useState<any>([]);

  const [form, setForm] = useState({
    email: "htoomyat12@mail.com",
    password: "htoomyat",
    username: "hm",
    firstName: "h",
    lastName: "m",
  });

  //   "email": "hevid47677@docsfy.com",
  // "password": "htoomyat",
  // "username": "hevi",
  // "firstName": "he",
  // "lastName": "vi"

  // console.log(form, "form");

  const handleSignUp = async () => {
    const da = await register(form);
    console.log(da, "return data");
  };

  return (
    <SafeAreaView>
      <Text>signup</Text>
      <TextInput
        placeholder="email"
        className="p-2 m-1 text-sky-500"
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <TextInput
        placeholder="username"
        className="p-2 m-1 text-sky-500"
        value={form.username}
        onChangeText={(value) => setForm({ ...form, username: value })}
      />{" "}
      <TextInput
        placeholder="firstName"
        className="p-2 m-1 text-sky-500"
        value={form.firstName}
        onChangeText={(value) => setForm({ ...form, firstName: value })}
      />
      <TextInput
        placeholder="lastName"
        className="p-2 m-1 text-sky-500"
        value={form.lastName}
        onChangeText={(value) => setForm({ ...form, lastName: value })}
      />
      <TextInput
        placeholder="password"
        className="p-2 m-1 text-sky-500"
        value={form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
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
