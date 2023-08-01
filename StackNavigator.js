import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens when you have them  ~~Declare it here guys...
import LoginScreen from "./screens/LoginScreen";


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
					options={{
						headerTintColor: "grey",
					}}
				/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
