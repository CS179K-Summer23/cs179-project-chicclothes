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
import { auth } from "../../configuration/firebase";
import { storeUserPaymentDetailsInFirestore } from "../../hook/databaseQueries";

const UserPayment = ({ isVisible, onClose, onPaymentUpdated }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [ccvError, setCcvError] = useState("");

  const isDisabled = !cardNumber || !nameOnCard || !expiry || !ccv;

  const formatCardNumber = (text) => {
    return text
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const savePaymentDetails = async () => {
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;
    if (uid) {
      const paymentData = {
        cardNumber,
        nameOnCard,
        expiry,
        ccv
      };
      await storeUserPaymentDetailsInFirestore(uid, paymentData);
      onClose(); // after it saves, close the modal

      //refresh
      if (onPaymentUpdated) {
        /// Notify the parent component that payment details were updated
        onPaymentUpdated();
      }
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
      <SafeAreaView style={styles.titlecontainer}>
        <TouchableOpacity style={styles.arrow} onPress={onClose}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Payment Method</Text>

        <View style={styles.container}>
          {/* Display Card */}
          <View style={styles.card}>
            <Text style={styles.cardNumber}>{cardNumber || "Card Number"}</Text>
            <View style={styles.cardDetailsRow}>
              <Text style={styles.cardName}>
                {nameOnCard || "Name on Card"}
              </Text>
              <Text style={styles.cardExp}>{expiry || "Expiry"}</Text>
            </View>
          </View>

          {/* Input Fields */}
          <Text style={styles.cardTitle}>Card Number</Text>
          <TextInput
            style={[
              styles.input,
              cardNumber.replace(/\s/g, "").length !== 16 && styles.errorInput,
            ]}
            value={cardNumber}
            onChangeText={(text) => {
              const formattedText = formatCardNumber(text);
              if (formattedText.length <= 19) {
                setCardNumber(formattedText);
                if (formattedText.replace(/\s/g, "").length !== 16) {
                  setCardError("Number input is invalid, 16 digits required");
                } else {
                  setCardError(""); // Clear the error message
                }
              }
            }}
            maxLength={19}
            keyboardType="number-pad"
          />
          {cardError ? <Text style={styles.errorText}>{cardError}</Text> : null}

          <Text style={styles.cardTitle}>Card Holder Name</Text>
          <TextInput
            style={[styles.input, !nameOnCard && styles.errorInput]}
            value={nameOnCard}
            onChangeText={setNameOnCard}
          />

          <Text style={styles.cardTitle}>Expiration Date</Text>
          <TextInput
            style={[
              styles.input,
              (!expiry || !/^(\d{2}\/\d{2})$/.test(expiry)) &&
                styles.errorInput,
            ]}
            value={expiry}
            onChangeText={(text) => {
              if (/^\d{0,2}\/?\d{0,2}$/.test(text)) {
                setExpiry(text);
                if (!/^(\d{2}\/\d{2})$/.test(text)) {
                  setExpiryError("Invalid format. Use MM/YY");
                } else {
                  setExpiryError("");
                }
              }
            }}
            maxLength={5}
          />

          {expiryError ? (
            <Text style={styles.errorText}>{expiryError}</Text>
          ) : null}

          <Text style={styles.cardTitle}>CVC/CVC</Text>
          <TextInput
            style={[styles.input, ccv.length !== 3 && styles.errorInput]}
            value={ccv}
            onChangeText={(text) => {
              // Ensure that only numbers are entered
              if (/^\d*$/.test(text)) {
                setCcv(text);
                if (text.length < 3) {
                  setCcvError("Number input is invalid. 3 digits required.");
                } else {
                  setCcvError("");
                }
              }
            }}
            secureTextEntry={true}
            keyboardType="numeric"
            maxLength={3}
          />
          {ccvError ? <Text style={styles.errorText}>{ccvError}</Text> : null}

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              isDisabled ? styles.disabledButton : styles.enabledButton,
            ]}
            onPress={savePaymentDetails}
          >
            <Text style={styles.checkoutButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titlecontainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#f0ebdf",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 180,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    fontSize: 18,
    marginBottom: 20,
  },
  cardName: {
    color: "#000",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  cardNumber: {
    color: "#000",
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 70,
    fontWeight: "700",
  },
  cardExp: {
    color: "#000",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  checkoutButton: {
    marginTop: 50,
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
  errorText: {
    color: "red",
    marginTop: -20,
    marginBottom: 10,
    fontSize: 12,
  },
  cardDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  errorInput: {
    borderBottomColor: "red",
  },
});

export default UserPayment;
