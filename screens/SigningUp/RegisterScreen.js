import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { auth, db } from '../../configuration/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
    
                const usersRef = doc(db, "users", user.uid);
                setDoc(usersRef, {
                    name: name,
                    email: email,
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
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
