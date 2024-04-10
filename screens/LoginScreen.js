import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from "../context/UserAuth";

const LoginScreen = () => {
  const navigate = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <View className="bg-blue-500 h-full  items-center flex justify-center flex-row">
        <View className="absolute left-[30%] top-16">
          <Image
            className="object-contain"
            width={140}
            height={120}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3750/3750019.png",
            }}
          />
        </View>
      <View className="bg-slate-300 p-12  rounded-3xl">
        <View className="flex gap-3">
          <Text className="text-xl text-black font-semibold mb-10">
            Student Management
          </Text>

          <TextInput
            className="bg-white rounded-full p-3 "
            placeholder="Enter Email"
            keyboardType="email-address"
            autoComplete="email"
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            className="bg-white rounded-full p-3 "
            placeholder="Enter Password"
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity
            onPress={handleLogin}
            className="p-3 bg-blue-500 rounded-full flex flex-row items-center justify-evenly"
          >
            <Text className="font-semibold   text-white">Login +</Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={() => navigate.navigate("Register")}>
          <Text className="text-center text-blue-600 font-semibold mt-8">
            Don't have an account? Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
