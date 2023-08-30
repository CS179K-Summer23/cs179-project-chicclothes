import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { auth } from "../../configuration/firebase";
import { getOrderDetailsForUser } from "../../hook/databaseQueries";

const OrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Online Orders");
  const [orderDetails, setOrderDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        console.error("User is not authenticated.");
        return;
      }

      const fetchedOrderDetails = await getOrderDetailsForUser(uid);
      setOrderDetails(fetchedOrderDetails);
    };

    fetchData();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
    <View style={styles.Titlecontainer}>
      <Text style={styles.title}>Orders</Text>
      <View style={styles.centeredContainer}>
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setSelectedTab("Online Orders")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "Online Orders" && styles.selectedTabText,
                ]}
              >
                Online Orders
              </Text>
              {selectedTab === "Online Orders" && (
                <View style={styles.underline} />
              )}
            </TouchableOpacity>
          </View>

          <View>
            {orderDetails.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.orderButton}
                onPress={() => openModal(order)}
              >
                <Text>Order Number: {order.orderNumber}</Text>
                <Text>Total Price: {order.total}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                
                  <Text style={styles.modalText}>Receipt</Text>
                  <Text>Order Number: {selectedOrder?.orderNumber}</Text>
                  <Text>Total Price: {selectedOrder?.total}</Text>

                  <Text style={styles.sectionTitle}>Payment Method</Text>
                  <Text>
                    Card Number: {selectedOrder?.paymentDetails?.cardNumber}
                  </Text>
                  <Text>Expiry: {selectedOrder?.paymentDetails?.expiry}</Text>

                  <Text style={styles.sectionTitle}>Billing Address</Text>
                  <Text>Address: {selectedOrder?.billingDetails?.address}</Text>
                  <Text>City: {selectedOrder?.billingDetails?.city}</Text>
                  <Text>State: {selectedOrder?.billingDetails?.state}</Text>

                  <Text style={styles.sectionTitle}>Shipping Address</Text>
                  <Text>
                    Address: {selectedOrder?.shippingDetails?.address}
                  </Text>
                  <Text>City: {selectedOrder?.shippingDetails?.city}</Text>
                  <Text>State: {selectedOrder?.shippingDetails?.state}</Text>

                  <Text style={styles.sectionTitle}>Purchased Items</Text>
                  <ScrollView bounces={false}>
                  {selectedOrder?.purchasedItemIds?.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      <Image
                        style={styles.itemImage}
                        source={{ uri: `https://` + item.imageUrl }}
                      />
                      <View style={styles.itemDetails}>
                      <Text numberOfLines={2} style={{ width: 170 }}>
  {item.name}
</Text>
                        <Text>Price: {item.price}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color:"white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Titlecontainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  tabContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    marginHorizontal: 15,
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    color: "grey",
  },
  selectedTabText: {
    color: "red",
  },
  underline: {
    height: 2,
    width: 120,
    backgroundColor: "red",
    marginTop: 5,
  },
  orderButton: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    margin: 5,
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    padding: 10,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemDetails: {
    flexDirection: "column", // this is the default, but it's here for clarity
  },
});

export default OrderScreen;
