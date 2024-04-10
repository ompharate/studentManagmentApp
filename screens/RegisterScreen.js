import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db, provider } from "../firebase/config";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
const RegisterScreen = () => {
  const navigate = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [roll, setRoll] = useState();

  const handleLogin = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "students", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        roll: roll,
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <View className="bg-blue-500 h-full  items-center flex justify-center flex-row">
      <View className="absolute left-[30%] top-10">
          <Image
            className="object-contain"
            width={140}
            height={120}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3750/3750019.png",
            }}
          />
        </View>
      <View className="bg-slate-300 p-10 rounded-3xl">
        <View className="flex gap-3">
          <Text className="text-xl text-black font-semibold mb-10">
            Student Management
          </Text>
          <TextInput
            className="bg-white rounded-full p-3 "
            placeholder="Enter your Roll"
            keyboardType="numeric"
            onChangeText={(value) => setRoll(value)}
          />
          <TextInput
            className="bg-white rounded-full p-3 "
            placeholder="Enter Email"
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
            <Text className="font-semibold   text-white">Register +</Text>
          </TouchableOpacity>
        </View>
        <Pressable onPress={() => navigate.navigate("Login")}>
          <Text className="text-center text-blue-600 font-semibold mt-8">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;
