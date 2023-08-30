import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Favorites } from "../../data";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getFavoritesForUser } from "../../hook/databaseQueries";
import { auth } from "../../configuration/firebase";
import { deleteFavoriteForUser } from "../../hook/databaseQueries";
import { useIsFocused } from "@react-navigation/native";
import OrderConfirmationModal from "./OrderConfirmationModal";
import ImageModal from "./ImageModal";
import SelectableCircle from "./SelectableCircle";
import CheckoutContainer from "./CheckoutContainer";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems((prevItems) => [...prevItems, itemId]);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const fetchedFavorites = await getFavoritesForUser(uid);
        setFavorites(fetchedFavorites);
      }
    };

    fetchFavorites();
  }, [isFocused]);

  const renderFavoriteItem = ({ item, index }) => {
    const BASE_URL = "https://";
    const imageUrl = `${BASE_URL}${item.imageUrl}`;
    const isSelected = selectedItems.includes(item.id);

    const renderRightAction = () => {
      return (
        <TouchableOpacity
          style={styles.deleteBox}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightAction}>
        <View style={styles.favoriteItem}>
          <SelectableCircle
            isSelected={isSelected}
            toggleSelection={() => toggleSelection(item.id)}
          />
          <TouchableOpacity onPress={() => handleImageClick(imageUrl)}>
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  const removePurchasedItemsFromFavorites = (purchasedItemsIds) => {
    const updatedFavorites = favorites.filter(
      (item) => !purchasedItemsIds.includes(item.id)
    );
    setFavorites(updatedFavorites);
  };

  const handleDelete = async (index) => {
    const itemToDelete = favorites[index];
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);

    console.log("Trying to delete item with ID:", itemToDelete.id);
    console.log("Current favorites:", favorites);
    const uid = auth.currentUser?.uid;
    if (uid) {
      await deleteFavoriteForUser(uid, itemToDelete);
    }
  };

  const toggleAllSelection = () => {
    if (selectedItems.length === favorites.length) {
      // If all items are already selected, deselect all
      setSelectedItems([]);
    } else {
      // Otherwise, select all items
      setSelectedItems(favorites.map((item) => item.id));
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.shippingContainer}>
        <Text style={styles.centeredText}>Free Shopping and Free Returns</Text>
      </View>

      <View style={styles.Cart}>
        <Text style={styles.CartText}>Cart({favorites.length})</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <CheckoutContainer
        favorites={favorites}
        selectedItems={selectedItems}
        toggleAllSelection={toggleAllSelection}
        removePurchasedItemsFromFavorites={removePurchasedItemsFromFavorites}
      />
      <ImageModal
        isVisible={isModalVisible}
        imageUrl={selectedImage}
        onClose={() => setModalVisible(false)}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  shippingContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#f0ebdf",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  centeredText: {
    textAlign: "center",
    fontFamily: "Helvetica",
    fontWeight: "300",
  },
  Cart: {
    height: 30,
    width: "100%",
    backgroundColor: "#f0ebdf",
  },
  CartText: {
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#f0ebdf",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  checkoutContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
  },
  checkoutText: {},
});

export default FavoritesScreen;
