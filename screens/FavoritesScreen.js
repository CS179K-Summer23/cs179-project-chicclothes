import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Favorites } from "../data";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getFavoritesForUser } from "../hook/databaseQueries";
import { auth } from "../configuration/firebase";
import { deleteFavoriteForUser } from "../hook/databaseQueries";
import { useIsFocused } from '@react-navigation/native';//to render screen and update it with what is in the database realtime babyyy!


const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused(); // Hook to check if the screen is in focus
  
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
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  const handleDelete = async (index) => {
    const itemToDelete = favorites[index];
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites); // Update the state here

    // Delete the item from the Firestore database
    const uid = auth.currentUser?.uid;
    if (uid) {
      await deleteFavoriteForUser(uid, itemToDelete);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={favorites} // Use the local state here
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
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
});

export default FavoritesScreen;
