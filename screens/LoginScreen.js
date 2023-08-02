import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Login Screen</Text>
            <Button
                title="Login"
                onPress={() => {
                    //Add login logic here...
                    console.log("Login button pressed");
                }
                }
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    text: {
        fontSize: 18,
        color: '#333',
    }
});

export default LoginScreen;
