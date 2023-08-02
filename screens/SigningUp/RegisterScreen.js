import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { auth, db } from '../../configuration/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [interests, setInterests] = useState('');
    const [password2, setPassword2] = useState('');

    const handleRegister = () => {
        if (!name.trim() || !email.trim() || !password.trim() || !interests.trim()) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        
        if (password.trim() !== password2.trim()) {
            Alert.alert('Error', 'Passwords Don\'t match');
            return;
        }

        if (password.length < 5) {
            Alert.alert('Error', 'Password should be longer than 5 letters');
            return;
        }

        if (!containsUpper(password)) {
            Alert.alert('Error', 'Password should contain an uppercase letter');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                const usersRef = doc(db, "users", user.uid);
                setDoc(usersRef, {
                    name: name,
                    email: email,
                    interests: interests
                });
    
                navigation.navigate('MainTabs', { screen: 'Home' });
            })
            .catch((error) => {
                console.error("Error registering user:", error.message);
                Alert.alert('Error', error.message);
            });
    };

    function containsUpper(str) {
        return /[A-Z]/.test(str);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register Now!</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TextInput 
                style={styles.input}
                placeholder="Repeat Password"
                secureTextEntry
                value={password2}
                onChangeText={setPassword2}
            />

            <TextInput 
                style={styles.input}
                placeholder="Clothes you are interested in"
                value={interests}
                onChangeText={setInterests}
            />

            <Button title="Register" onPress={handleRegister} />
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
