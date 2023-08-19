import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useUser from "./UserInfoDataBase";
import { auth } from "../../configuration/firebase";
import { storeUserBillingDetailsInFirestore } from "../../hook/databaseQueries";


const UserBilling = ({ isVisible, onClose }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState("");
  const [company, setCompany] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  // databaseinfos
  const { userName } = useUser();

  //to make sure user can press button if some field is not filled
  const isDisabled = !address || !city || !zipcode || !state;

  const saveUserData = async () => {
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;
    if (uid) {
        const billingData = {
            address,
            company,
            addressLine2,
            city,
            zipcode,
            state,
        };
        await storeUserBillingDetailsInFirestore(uid, billingData);
        onClose(); // after it saves, close the modal
    } else {
        console.error("No user is logged in.");
    }
};


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

        <Text style={styles.title}>Edit Billing Address</Text>
        <KeyboardAvoidingView behavior="padding" style={styles.container2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Name</Text>
              <Text style={styles.name}>{userName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                Address<Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  address ? styles.filled : styles.notFilled,
                ]} //if filled green else red :P
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
                onChangeText={(text) => setCompany(text)}
                value={company}
              />
              <Text style={styles.instructions}>Name or Company</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Address Line 2 </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddressLine2(text)}
                value={addressLine2}
              />
              <Text style={styles.instructions}>
                Building, floor, apt, Suite, Unit, etc.
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                City/Town <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, city ? styles.filled : styles.notFilled]}
                placeholder="Enter your City/Town"
                onChangeText={(text) => setCity(text)}
                value={city}
              />
              {/* <Text style={styles.instructions}>City/Town</Text> */}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                Zipcode <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholder="Enter your Zipcode"
                style={[
                  styles.input,
                  zipcode ? styles.filled : styles.notFilled,
                ]}
                onChangeText={(text) => setZipcode(text)}
                value={zipcode}
              />
              {/*<Text style={styles.instructions}>Zipcode</Text>*/}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>
                State <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter your State"
                style={[styles.input, state ? styles.filled : styles.notFilled]}
                onChangeText={(text) => setState(text)}
                value={state}
              />
              {/*<Text style={styles.instructions}>State</Text>*/}
            </View>
            <TouchableOpacity
              style={[
                styles.checkoutButton,
                isDisabled ? styles.disabledButton : styles.enabledButton,
              ]}
              onPress={isDisabled ? null : saveUserData}
            >
              <Text style={styles.checkoutButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
  checkoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  enabledButton: {
    backgroundColor: "#000",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserBilling;
