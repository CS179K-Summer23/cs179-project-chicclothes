import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, Image} from "react-native";
import {Favorites} from '../data';
import data from '../data.json';

import { auth } from "../configuration/firebase";
import { storeFavoriteForUser } from "../hook/databaseQueries";

const SwipeScreen = () => {
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [uid, setUid] = useState(null); // Added state for uid

  useEffect(() => {
    // Flatten the products from all categories into a single array
    const allProducts = data.flatMap(category => category.products);
    setProducts(allProducts);

    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
            setUid(user.uid);
        } else {
            setUid(null);
        }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

;


  const onSwipedRight = async (index) => {
    if (!uid) {
      console.warn("User is not logged in!");
      return;
    }
  
    const selectedItem = products[index];
    const user = auth.currentUser;
    Favorites.push(products[index]);
  
    // Store the favorite item along with the user's email and name
    await storeFavoriteForUser(uid, selectedItem, user.email, user.displayName);
  
    let updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };




  const onSwipedLeft = (index) => {
    let updatedProducts = [...products];
    const removedItem = updatedProducts.splice(index, 1);
    updatedProducts.push(removedItem[0]);
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      {products.length > 0 && (
      <Swiper
        cards={products}
        renderCard={(card) => {
            const imageUrl = `${BASE_URL}${card.imageUrl}`;
          
            return (
              <View style={styles.card}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.name}</Text>
                <Text style={styles.cardPrice}>{card.price}</Text>
              </View>
            );
          }}
          
        onSwipedRight={onSwipedRight}
        onSwipedLeft={onSwipedLeft}
        infinite={true}
      />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A52A2A', // Brown background color
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      height: '70%', 
      borderRadius: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // Centered content within the card
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 10, 
    },
    cardImage: {
      width: '100%',
      height: '70%', 
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      resizeMode: 'cover',
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10, 
    },
    cardPrice: {
      fontSize: 20,
      marginBottom: 10,
      color: '#2E8B57', 
    }
  });
  

export default SwipeScreen;