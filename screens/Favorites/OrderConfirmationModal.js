import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import UserInformation from "./UserInformation";
import UserBilling from "./UserBilling";
import UserShipping from "./UserShipping";
import UserPayment from "./UserPayment";

const OrderConfirmationModal = ({ isVisible, onClose }) => {
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isUserModalVisible2, setUserModalVisible2] = useState(false);
  const [isUserModalVisible3, setUserModalVisible3] = useState(false);
  const [isUserModalVisible4, setUserModalVisible4] = useState(false);

  const handleEditInfo = () => {
    setUserModalVisible(true);
  };

  const handleBillingInfo = () => {
    setUserModalVisible2(true);
  };
  const handleShippingInfo = () => {
    setUserModalVisible(true);
  };

  const handlePaymentInfo = () => {
    setUserModalVisible2(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.leftArrow}>
          <AntDesign name="arrowleft" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.CheckoutText}>Checkout</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.titleInfo}>My Information</Text>
          <Text style={styles.infoText}>Name</Text>
          <Text style={styles.infoText2}>Email</Text>
          <TouchableOpacity onPress={handleEditInfo} style={styles.rightArrow}>
            <AntDesign name="right" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.titleInfo}>Billing Address</Text>
          <Text style={styles.infoText}>Name </Text>
          <Text style={styles.infoText2}>Street Address </Text>
          <Text style={styles.infoText2}>City</Text>
          <Text style={styles.infoText2}>Zipcode</Text>
          <Text style={styles.infoText2}>Country</Text>
          <TouchableOpacity
            onPress={handleBillingInfo}
            style={styles.right2Arrow}
          >
            <AntDesign name="right" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.titleInfo}>Shipping</Text>
          <Text style={styles.infoText}>Name </Text>
          <Text style={styles.infoText2}>Phone number ### </Text>
          <TouchableOpacity
            onPress={handleShippingInfo}
            style={styles.right3Arrow}
          >
            <AntDesign name="right" size={35} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.titleInfo}>Payment</Text>
          <Text style={styles.infoText}>PamentcardOption </Text>
          <Text style={styles.infoText2}>PamentcardOption </Text>

          <TouchableOpacity
            onPress={handlePaymentInfo}
            style={styles.right4Arrow}
          >
            <AntDesign name="right" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <UserInformation
        isVisible={isUserModalVisible}
        onClose={() => setUserModalVisible(false)}
      />

      <UserBilling
        isVisible={isUserModalVisible2}
        onClose={() => setUserModalVisible2(false)}
      />
      <UserShipping
        isVisible={isUserModalVisible3}
        onClose={() => setUserModalVisible3(false)}
      />

      <UserPayment
        isVisible={isUserModalVisible4}
        onClose={() => setUserModalVisible4(false)}
      />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    length: "100%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 10,
  },
  CheckoutText: {
    marginTop: 50,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
  },
  infoContainer: {
    padding: 20,
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
  },
  titleInfo: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: -30,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 40,
  },
  infoText2: {
    fontSize: 14,
    fontWeight: "500",
  },
  leftArrow: {
    position: "absolute",
    top: 55,
    left: 10,
    zIndex: 10,
  },
  rightArrow: {
    position: "absolute",
    right: 15,
    marginTop: 30,
  },
  right2Arrow: {
    position: "absolute",
    right: 15,
    marginTop: 60,
  },
  right3Arrow: {
    position: "absolute",
    right: 15,
    marginTop: 30,
  },
  right4Arrow: {
    position: "absolute",
    right: 15,
    marginTop: 30,
  },
});

export default OrderConfirmationModal;
