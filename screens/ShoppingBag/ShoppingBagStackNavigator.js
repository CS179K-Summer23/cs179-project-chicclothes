import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingBagScreen from "../ShoppingBagScreen";
import ShoppingBagScreenMen from "../ShoppingBag/ShoppingBagScreenMen";
import ShoppingBagScreenKid from "../ShoppingBag/ShoppingBagScreenKid";

// Import screens

const Stack = createNativeStackNavigator();

const ShoppingBagStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "grey",
      }}
    >
      <Stack.Screen
        name="ShoppingBagWomen"
        component={ShoppingBagScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShoppingBagMen"
        component={ShoppingBagScreenMen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShoppingBagKid"
        component={ShoppingBagScreenKid}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ShoppingBagStackNavigator;
