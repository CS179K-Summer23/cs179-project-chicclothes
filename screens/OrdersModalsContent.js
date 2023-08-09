import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const OrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Online Orders");

  return (
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

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("Store Receipts")}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === "Store Receipts" && styles.selectedTabText,
              ]}
            >
              Store Receipts
            </Text>
            {selectedTab === "Store Receipts" && (
              <View style={styles.underline} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.errorBox}>
          <AntDesign
            name="check"
            size={25}
            color="#333333"
            style={{ padding: 10 }}
          />
          <Text style={styles.errorMessage}>
            We can't display your receipts right now. Please check back later.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: "blue", // Setting the background color to blue
    width: "100%",
  },
  container: {
    flex: 1, // makes sure container takes up the entire space
    backgroundColor: "#f5f5f5",
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
  selectedTab: {
    color: "red",
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
  errorBox: {
    marginTop: 20,
    padding: 15,
    width: "85%",
    backgroundColor: "#F75D59",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  errorMessage: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginRight: 10,
  },
});

export default OrderScreen;
