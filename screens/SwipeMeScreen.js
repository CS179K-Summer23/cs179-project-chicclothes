import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, Image} from "react-native";
import {Favorites} from '../data';
import axios from 'axios';
import productsData from './product.json';

const SwipeScreen = () => {
  const [products, setProducts] = useState(productsData);


  const onSwipedRight = (index) => {
    Favorites.push(products[index]);
    let updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const onSwipedLeft = (index) => {
    let updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      {products?.length > 0 ? (
        <Swiper
          cards={products}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: card.Image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{card.Name}</Text>
                <Text style={styles.cardPrice}>{card["Current Price"]}</Text>
              </View>
            );
          }}
          onSwipedRight={onSwipedRight}
          onSwipedLeft={onSwipedLeft}
          infinite={true}
        />
      ) : (
        <Text>No products available.</Text>
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