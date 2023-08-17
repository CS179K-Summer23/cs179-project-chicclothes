import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectableCircle from "./SelectableCircle";

const CheckoutContainer = ({ favorites, selectedItems, toggleAllSelection }) => {
    const calculateTotal = () => {
        return selectedItems.reduce((acc, itemId) => {
          const item = favorites.find(fav => fav.id === itemId);
          if (!item) {
            console.warn(`Item with ID ${itemId} not found in favorites.`);
            return acc;
          }
          // Remove the dollar sign and then parse the string to a float, tricky but goods now 
          const price = parseFloat(item.price.replace('$', ''));
          if (isNaN(price)) {
            console.warn(`Price for item with ID ${itemId} is not a valid number after removing the dollar sign: ${item.price}`);
            return acc;
          }
          return acc + price;
        }, 0).toFixed(2);
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
      <Text style={styles.checkoutText}>Total: ${calculateTotal()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  selectAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    marginLeft: 5,
    fontSize: 16,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutContainer;
