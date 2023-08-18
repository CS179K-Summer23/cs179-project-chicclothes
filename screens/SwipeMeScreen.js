import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, Image} from "react-native";
import data from '../data.json';
import {getLastSwipedIndexForUser,getFavoritesForUser, storeFavoriteForUser} from "../hook/databaseQueries";
import { auth } from "../configuration/firebase";

const SwipeScreen = () => {
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const allProducts = data.flatMap(category => category.products);

    const fetchAndSetProducts = async () => {
      if (uid) {
        const favorites = await getFavoritesForUser(uid);
        const filteredProducts = allProducts.filter(product => 
            !favorites.some(favorite => favorite.id === product.id)
        );
        setProducts(filteredProducts);
      } else {
        setProducts(allProducts);
      }
    };

    fetchAndSetProducts();

    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        setUid(user.uid);
        const index = await getLastSwipedIndexForUser(user.uid);
        setCurrentIndex(index);
      } else {
        setUid(null);
        setProducts(allProducts);
      }
    });

    return () => unsubscribe();

  }, [uid]);

  const handleSwipe = async (index, isRightSwipe) => {
    if (!uid) {
      console.warn("User is not logged in!");
      return;
    }

    const selectedItem = products[index];
    if (isRightSwipe) {
      await storeFavoriteForUser(uid, selectedItem, index + 1);
    } else {
      await storeFavoriteForUser(uid, null, index + 1);
    }

    setCurrentIndex(currentIndex + 1);
  };

  const onSwipedRight = (index) => handleSwipe(index, true);
  const onSwipedLeft = (index) => handleSwipe(index, false);

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
        currentIndex={currentIndex}
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