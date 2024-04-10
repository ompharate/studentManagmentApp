import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { UserAuth } from "./context/UserAuth";
import About from "./screens/About";

const InsiderStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsiderStack.Navigator initialRouteName="Home">
      <InsiderStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <InsiderStack.Screen
        options={{
          headerShown: false,
        }}
        name="About"
        component={About}
      />
    </InsiderStack.Navigator>
  );
}

export const StackNavigator = () => {
  const { isLoggedIn } = UserAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Inside"
            component={InsideLayout}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
