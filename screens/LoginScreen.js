import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  
} from "react-native";
import { auth } from "../configuration/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check if username and password are filled
    if (username.trim() && password.trim()) {
        // Use Firebase Authentication to sign in the user
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in successfully, navigate to the HomeScreen
                navigation.navigate("MainTabs", { screen: "Home" });
            })
            .catch((error) => {
                // Error occurred during sign in, show an alert with the error message
                Alert.alert("Error", error.message);
            });
    } else {
        // Alert the user to fill both fields
        Alert.alert("Error", "Please fill both username and password");
    }
};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to the HomeScreen
        navigation.navigate("MainTabs", { screen: "Home" });
      }
      // If there's no user, stay on the LoginScreen
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);


  

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    keyboardVerticalOffset={20}
    enabled
  >
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("./images/Clique_logo.png")}
        resizeMode={"contain"}
      />
      <View style={styles.inputContainer}>
        <Image
          source={require("./images/profilepic.jpeg")}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Enter Username"
          placeholderTextColor="#003f5c"
          secureTextEntry={false}
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require("./images/passwordpic.png")}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input]}
          placeholder="Enter Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ color: "black", fontWeight: "bold" }}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerButtonText}>
          Don't have an account?{" "}
          <Text style={{ color: "black", fontWeight: "bold" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 80,
    width: 335,
    height: 135,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 15,
    marginBottom: 14,
  },
  input: {
    justifyContent: "center",
    width: "65%",
    height: 50,

    paddingHorizontal: 1,
    marginBottom: 23,

    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginRight: 44,
  },
  inputView: {
    backgroundColor: "#F5F5DC",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginButton: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F5F5DC",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default LoginScreen;