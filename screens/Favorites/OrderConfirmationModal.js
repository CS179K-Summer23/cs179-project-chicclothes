import React, { useState, useEffect } from "react";
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
import UserBilling from "./UserBilling";
import UserShipping from "./UserShipping";
import UserPayment from "./UserPayment";
import useUser from "./UserInfoDataBase";

const OrderConfirmationModal = ({ isVisible, onClose }) => {
  //const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [isUserModalVisible2, setUserModalVisible2] = useState(false);
  const [isUserModalVisible3, setUserModalVisible3] = useState(false);
  const [isUserModalVisible4, setUserModalVisible4] = useState(false);
  //const { userName, userEmail, billingDetails } = useUser(); // i am calling them from userInfoDataBase.js just to not make this file longer
  const [refreshKey, setRefreshKey] = useState(0);// for re-rendering
  const { userName, userEmail, billingDetails } = useUser(refreshKey); // Pass refreshKey as dependency

  useEffect(() => {
    if (isVisible) {
      setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetch
    }
  }, [isVisible]);


  useEffect(() => {
    console.log("refreshKey changed:", refreshKey);
  }, [refreshKey]);
  

  // const handleEditInfo = () => {
  //   setUserModalVisible(true);
  // };

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
            <Text style={styles.infoText}>{userName}</Text>
            <Text style={styles.infoText2}>{userEmail}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleInfo}>Billing Address</Text>
            <Text style={styles.infoText}>{billingDetails.name || "Name"}</Text>
            <Text style={styles.infoText2}>
              {billingDetails.address || "Street Address"}
            </Text>
            <Text style={styles.infoText2}>
              {billingDetails.city || "City"}
            </Text>
            <Text style={styles.infoText2}>
              {billingDetails.zipcode || "Zipcode"}
            </Text>
            <Text style={styles.infoText2}>United States</Text>
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

          <View style={styles.infoContainer}>
            <View style={styles.packageContainer}>
              <Text style={styles.titleInfo}>Package</Text>
            </View>

            <View style={styles.picturesContainer}>
              <Text style={styles.titleInfo}>PICTURE HOLDER</Text>
            </View>

            <View style={styles.deliveryFreeContainer}>
              <Text style={styles.titleInfo}>FREE 3-5 day shipping</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.FeesText}>Discounts</Text>
              <Text style={styles.valueText}>Apply Discount</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.FeesText}>Order Value</Text>
              <Text style={styles.valueText}>$79.99</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.FeesText}>Delivery Fee</Text>
              <Text style={styles.valueText}>FREE</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.FeesText}>Est. taxes</Text>
              <Text style={styles.valueText}>$9.99</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.TotalText}>Total</Text>
              <Text style={styles.valueText}>$ 999.99</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.bottomText}>
            By continuing, you agree to Clique Closet's Term and General
            Conditions
          </Text>
          <Text style={styles.bottomText2}>
            We will process your personal data in accordance with Clique
            Closet's Privacy Notes
          </Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={onClose}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>

        <UserBilling
          isVisible={isUserModalVisible2}
          onClose={() => setUserModalVisible2(false)}
          onBillingUpdated={() => setRefreshKey(prevKey => prevKey + 1)} // Trigger re-fetch of user data
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
    backgroundColor: "#f9f9f9",
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
    //borderWidth: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  titleInfo: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 15,
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
  right2Arrow: {
    position: "absolute",
    right: 10,
    marginTop: 60,
  },
  right3Arrow: {
    position: "absolute",
    right: 10,
    marginTop: 30,
  },
  right4Arrow: {
    position: "absolute",
    right: 10,
    marginTop: 30,
  },

  packageContainer: {
    flexDirection: "row",
    padding: 20,
    width: "100%",
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  titlepackageContainer: {
    marginTop: 20,
  },

  packageContainer: {
    flex: 1,
  },
  picturesContainer: {
    flex: 1,
  },
  deliveryFreeContainer: {
    flex: 1,
  },
  separator: {
    height: 2,
    backgroundColor: "black",
    marginVertical: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  bottomText: {
    marginTop: -20,
    color: "grey",
    fontSize: 12,
  },
  bottomText2: {
    marginTop: 10,
    color: "grey",
    fontSize: 12,
  },
  checkoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },

  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderConfirmationModal;
