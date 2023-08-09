import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PaymentDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        No card is currently saved. You can save your card during checkout next
        time you some with us.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
    marginTop: 20,
    // marginBottom: 20,
  },
});
