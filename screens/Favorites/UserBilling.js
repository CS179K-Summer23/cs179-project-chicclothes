import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const UserBilling = ({ isVisible, onClose }) => {
  const [address, setAddress] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={onClose}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Billing Address</Text>
        <View style={styles.container2}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Name</Text>
            <Text style={styles.name}>NAME</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
              Address<Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, address ? styles.filled : styles.notFilled]} //if filled green else red :P
              placeholder="Enter your billing address"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
            <Text style={styles.instructions}>
              Street address, P.O box or military address
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>C/O or Company</Text>
            <TextInput
              style={styles.input}
              //placeholder="Enter Your C/O or Company if you have"
            />
            <Text style={styles.instructions}>Name or Company</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Address Line 2 </Text>
            <TextInput style={styles.input} />
            <Text style={styles.instructions}>
              Building, floor, apt, Suite, Unit, etc.
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
              City/Town <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, address ? styles.filled : styles.notFilled]}
              placeholder="Enter your City/Town"
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
            <Text style={styles.instructions}>City/Town</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>
              Zipcode <Text style={styles.asterisk}>*</Text>
            </Text>
            <TextInput
              placeholder="Enter your Zipcode"
              style={[styles.input, address ? styles.filled : styles.notFilled]}
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
            <Text style={styles.instructions}>Zipcode</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container2: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: 20,
  },
  arrow: {
    top: 20,
    left: 10,
    zIndex: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    padding: 10,
    textAlign: "center",
    marginTop: -20,
  },
  infoContainer: {
    //borderWidth: 1,
    padding: 10,
    marginBottom: -5,
    backgroundColor: "#f9f9f9",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    borderColor: "grey",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  asterisk: {
    color: "#8B0000",
  },

  filled: {
    borderColor: "green",
  },

  notFilled: {
    borderColor: "red",
  },
  instructions: {
    color: "grey",
    fontSize: 12,
  },
});

export default UserBilling;
