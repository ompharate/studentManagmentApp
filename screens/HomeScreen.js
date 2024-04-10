import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CheckAttendance from "../components/CheckAttendance";
import CheckMarks from "../components/CheckMarks";
import { UserAuth } from "../context/UserAuth";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = UserAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: "checkAttendance",
      content: <CheckAttendance />,
      icon: <MaterialIcons name="co-present" size={24} color="white" />,
    },
    {
      label: "checkMarks",
      content: <CheckMarks />,
      icon: <FontAwesome5 name="check-square" size={24} color="white" />,
    },
  ];

  return (
    <View className="h-full">
      <SafeAreaView>
        <StatusBar backgroundColor={"rgb(59 130 246)"} />
        <View className="bg-blue-500 p-3 flex flex-row justify-between items-center">
          <View>
            <Text className="text-xl text-white font-semibold ">
            
              Student Management
            </Text>
            <Text className="text-sm text-white">{user.email}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View className="h-full">{tabs[activeTab].content}</View>

      <View className="absolute bottom-0 flex flex-row justify-evenly items-center w-full bg-blue-500">
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            className="p-4 flex items-center"
          >
            {item.icon}
            <Text className="text-white ">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
