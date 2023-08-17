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
  const [currentIndex, setCurrentIndex] = useState(0);

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

  setCurrentIndex(currentIndex + 1);
};

const onSwipedLeft = (index) => {
  setCurrentIndex(currentIndex + 1);
};




  return (
    <View style={styles.container}>
      {products.length > 0 && (
        <View style={styles.swiperContainer}>
          <View style={styles.swiperWrapper}>
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
      </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    swiperContainer: {
      flex: 1, 
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#f9f9f9", // to change the whole background color you just change this but i think this color is good 
    },
    swiperWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 700,
      marginRight: 330,
    },
    card: {
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      height: '70%', 
      borderRadius: 20,
      backgroundColor: '#f0ebdf', // if u do not feel this color plz just change this one 
      alignItems: 'center',
      justifyContent: 'center', 
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