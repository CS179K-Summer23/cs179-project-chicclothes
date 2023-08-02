import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Check if username and password are filled
        if (username.trim() && password.trim()) {
            // Navigate to the HomeScreen inside the BottomTabNavigator
            navigation.navigate('MainTabs', { screen: 'Home' });
        } else {
            // Alert the user to fill both fields
            Alert.alert('Error', 'Please fill both username and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to Login Screen</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: 300,
        height: 40,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    signupContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    signupText: {
        marginBottom: 10
    }
});

export default LoginScreen;
