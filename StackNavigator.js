import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/SigningUp/RegisterScreen";
//import GenderScreen from "./screens/SigningUp/GenderScreen";
import BottomTabNavigator from './BottomTabNavigator'; 
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        // <NavigationContainer>
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
            </Stack.Navigator>
        // </NavigationContainer>
    );
};

export default StackNavigator;
