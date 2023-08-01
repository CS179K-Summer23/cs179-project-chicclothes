import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens when you have them  ~~Declare it here guys...
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/SigningUp/RegisterScreen";
import GenderScreen from "./screens/SigningUp/GenderScreen";


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
            <Stack.Screen
					name="Register"
					component={RegisterScreen}
					options={{
						headerTintColor: "grey",
					}}
				/>
				<Stack.Screen
					name="Gender"
					component={GenderScreen}
					options={{
						headerTintColor: "#grey",
					}}
				/>
				{/* just make the same format for the other screens if we are going to make one. */}
        </Stack.Navigator>
    );
};

export default StackNavigator;
