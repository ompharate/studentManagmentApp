import { StatusBar } from "expo-status-bar";
import React from "react";

import { Text, View } from "react-native";
import { StackNavigator } from "./StackNavigator";
import AuthContextProvider from "./context/UserAuth";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <StackNavigator />
    </AuthContextProvider>
  );
}
