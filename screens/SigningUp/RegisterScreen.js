import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');

    const [username, setUsername] = useState('');

    const [password, setPassword] = useState('');

    
    const [interests, setInterests] = useState('');


    const [password2, setPassword2] = useState('');


    const handleRegister = () => {
        if (!name.trim() || !username.trim() || !password.trim() || !interests.trim()) 
        {

            Alert.alert('Error', 'Please fill all fields');
            return;

            //can add more to this later (such as making a password length requirement, etc.)

        }
        
        //check if passwords are the same
        if (password.trim() != password2.trim()) {
            Alert.alert('Error', 'Passwords Dont match');
            return;
        }

        //password length check
        if (password.toString().length < 5) {
            Alert.alert('Error', 'Passwords Should be longer than 5 letter');
            return; 
        }
        else if (!containsUpper(password)) {
            console.log(password.toString.toString);
            Alert.alert('Error', 'Passwords should contain a uppercase letter');
            return;
        }
        else {
            navigation.navigate('MainTabs', { screen: 'Home' });
        }
        // else if (!containsNum(password.toString)) {
        //     console.log(password.toString);
        //     Alert.alert('Error', 'Passwords should contain a  number');
        //     return;
        // }
    };

    function containsUpper(str) {
        return Boolean(str.match(/[A-Z]/));
    }

    // function containsNum(str2) {
    //     return Boolean(str2.match(/[0-9]/));
    // }





    // const checkPassword = () => {
    //     if (password.trim() != password2.trim()) {
    //         setErrorMessage('Passwords do not match');
    //     }
    // }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register Now!</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={text => setName(text)}
                />

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                />

            <TextInput 
                style={styles.input}
                placeholder="Repeat Password"
                value={password2}
                secureTextEntry // This will hide the password text
                onChangeText={text => setPassword2(text)}
            />

            {/* <Text style={styles.mismatchText}>Passwords dont match!</Text> */}

            <TextInput 
                style={styles.input}
                placeholder="Clothes you are interested in"
                value={interests}
                onChangeText={text => setInterests(text)}
                />

            <Button title="Register" onPress={handleRegister} 
            />

        </View>
    );
}

const styles = StyleSheet.create(
    {
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
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
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    registerButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    mismatchText: {
        color: 'red',
        paddingTop: -20,
        fontSize: 0,
        opacity: 0
    }

}
);


export default RegisterScreen;
