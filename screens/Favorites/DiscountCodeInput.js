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
import { applyDiscount } from './DiscountLogic';

const DiscountCodeInput = ({ isVisible, onClose, totalValue, onDiscountApplied }) => {
  const [code, setCode] = useState(""); // Initialize the state for 'code'
  const [errorMessage, setErrorMessage] = useState(null); // Initialize the state for 'errorMessage'
  const isDisabled = !code;

  const applyAndSaveDiscount = () => {
    const newDiscountedValue = applyDiscount(code, totalValue);
    if (newDiscountedValue.discountRate === 0) {
      setErrorMessage("Invalid code. Try again.");
    } else {
      if (onDiscountApplied) {
        onDiscountApplied(newDiscountedValue);
      }
      console.log("Discount applied. New total:", newDiscountedValue);
      setErrorMessage(null); // Clear the error message if the discount is valid
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
        <Text style={styles.title}>Apply Discount</Text>
        <View style={styles.container2}>
          <Text style={styles.words}>Apply Discount Code </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <TextInput
              style={styles.discountInput}
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                isDisabled ? styles.disabledButton : styles.enabledButton,
              ]}
              onPress={isDisabled ? null : applyAndSaveDiscount}
            >
              <Text style={styles.checkoutButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              isDisabled ? styles.disabledButton : styles.enabledButton,
            ]}
            onPress={onClose}
          >
            <Text style={styles.checkoutButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -20,
    padding: 10,
  },
  arrow: {
    left: 10,
    top: 20,
    zIndex: 10,
  },
  container2: {
    padding: 20,
  },
  checkoutButton: {
    marginTop: 30,
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
  words: {
    color: "grey",
    fontSize: 12,
  },
  addButton: {
    height: 40,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 5,
  },
  discountInput: {
    borderWidth: 1,
    height: 40,
    borderColor: "grey",
    paddingHorizontal: 10,
    width: 250,
    backgroundColor: "#fff",
  },
 
  
});

export default DiscountCodeInput;
