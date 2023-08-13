import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/SigningUp/RegisterScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SearchScreen from "./screens/ShoppingBag/SearchScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "grey",
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTintColor: "grey" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTintColor: "grey" }}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
