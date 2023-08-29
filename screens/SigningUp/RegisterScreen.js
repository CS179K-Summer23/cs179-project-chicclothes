import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback, ScrollView} from 'react-native';
import { auth, db } from '../../configuration/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { storeUserDataInFirestore } from '../../hook/databaseQueries';


const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const handleRegister = () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
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

            return storeUserDataInFirestore(user.uid, {
                name: name,
                email: email,
                // interests: interests (Uncomment this line if you decide to use the interests field later)
            });
        })
        .then(() => {
            navigation.navigate('MainTabs', { screen: 'Home' });
        })
        .catch((error) => {
            console.error("Error:", error.message);
            Alert.alert('Error', error.message);
        });
    };

    function containsUpper(str) {
        return /[A-Z]/.test(str);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={20}
            enabled
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{flex: 1}} contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
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

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.showPasswordButton} onPress={() => setPasswordVisibility(!isPasswordVisible)}>
                            <Text>{isPasswordVisible ? 'HIDE' : 'SHOW'}</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput 
                        style={styles.input}
                        placeholder="Repeat Password"
                        secureTextEntry
                        value={password2}
                        onChangeText={setPassword2}
                    />

                <TouchableOpacity 
                    style={[ styles.registerButton,
                    (name && email && password && password2) ? { backgroundColor: "#E4E4CD" } : { backgroundColor: "red" }
                ]}
                onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        color: '#333',
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 50,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    passwordInput: {
        width: '80%',
        height: '100%',
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    registerButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#F5F5DC",
    },
    mismatchText: {
        color: 'red',
        paddingTop: -20,
        fontSize: 0,
        opacity: 0
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    showPasswordButton: {
        padding: 5,
        position:'absolute',
        right: 10,
        top: 15,
    }
}
);


export default RegisterScreen;