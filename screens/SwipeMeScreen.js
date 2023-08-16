import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, Image} from "react-native";
import {Favorites} from '../data';
import data from '../data.json';

const SwipeScreen = () => {
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Flatten the products from all categories into a single array
    const allProducts = data.flatMap(category => category.products);
    setProducts(allProducts);
  }, []);

  const onSwipedRight = (index) => {
    Favorites.push(products[index]);
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
    backgroundColor: '#F5F5DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    height: '60%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  cardPrice: {
    fontSize: 20,
    marginBottom: 10,
  }
}
);

export default SwipeScreen;