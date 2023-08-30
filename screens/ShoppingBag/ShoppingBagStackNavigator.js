import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingBagScreenMen from "../ShoppingBag/ShoppingBagScreenMen";
import ShoppingBagScreenKid from "../ShoppingBag/ShoppingBagScreenKid";
import ShoppingBagTest from "../ShoppingBag/ShoppingBagTest";

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
        component={ShoppingBagTest}
        options={{ headerShown: false }}
        initialParams={{ passIndex: 5, homeUsed: false, stat: 100 }}
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
