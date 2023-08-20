import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import SelectableCircle from "./SelectableCircle";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrderConfirmationModal from "./OrderConfirmationModal";

const CheckoutContainer = ({favorites,selectedItems,toggleAllSelection,}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const calculateTotal = () => {
    return selectedItems
      .reduce((acc, itemId) => {
        const item = favorites.find((fav) => fav.id === itemId);
        if (!item) {
          console.warn(`Item with ID ${itemId} not found in favorites.`);
          return acc;
        }
        // Remove the dollar sign and then parse the string to a float, tricky but goods now
        const price = parseFloat(item.price.replace("$", ""));
        if (isNaN(price)) {
          console.warn(
            `Price for item with ID ${itemId} is not a valid number after removing the dollar sign: ${item.price}`
          );
          return acc;
        }
        return acc + price;
      }, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectAllContainer}>
        <SelectableCircle
          isSelected={selectedItems.length === favorites.length}
          toggleSelection={toggleAllSelection}
        />
        <Text style={styles.selectAllText}>All</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      {/* Only render the Checkout button and modal if at least one item is selected */}
      {selectedItems.length > 0 && (
        <View style={styles.CheckoutContainer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
          <OrderConfirmationModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            totalValue={calculateTotal()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    marginLeft: 5,
    fontSize: 16,
  },
  totalContainer: {
    marginLeft: 90,
  },
  CheckoutContainer: {
    marginRight: 10,
    backgroundColor: "brown",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  checkoutText: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  totalText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default CheckoutContainer;