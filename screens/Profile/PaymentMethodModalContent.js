import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getUserDataFromFirestore } from "../../hook/databaseQueries"; // Adjust the path accordingly
import { auth } from "../../configuration/firebase";

export default function PaymentDetails() {
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Get the UID of the currently authenticated user
    const uid = auth.currentUser?.uid;

    if (!uid) {
      console.error("User is not authenticated.");
      return;
    }

    const fetchPaymentDetails = async () => {
      const userData = await getUserDataFromFirestore(uid);
      if (userData && userData.paymentDetails) {
        setPaymentDetails(userData.paymentDetails);
      }
    };

    fetchPaymentDetails();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Latest Payment Method</Text>
      <View style={styles.container}>
        {paymentDetails ? (
          <>
            <Text style={styles.message}>Card Information:</Text>
            <Text style={styles.message}>
              **** **** **** {paymentDetails.cardNumber?.slice(-4) || "XXXX"}
            </Text>
            <Text style={styles.message}>{paymentDetails.nameOnCard}</Text>
            <Text style={styles.message}>{paymentDetails.expiry}</Text>
          </>
        ) : (
          <Text style={styles.message}>
            No card is currently saved. You can save your card during checkout
            next time you shop with us.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //justifyContent: "flex-start", 
    // alignItems: "center",
    backgroundColor: "#f9f9f9",
    //borderWidth: 1,
    // length: 10,

  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    padding: 10,
    textAlign: "center",
    marginTop: 30,
  },
});
