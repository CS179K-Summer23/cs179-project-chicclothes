import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
// import { AntDesign } from "@expo/vector-icons";

const SwipeScreen = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // const filterProductsByCategory = (category) => {
  //   switch (category) {
  //     case 'shirts':
  //       return products.filter(product => product.title.toLowerCase().includes('shirt') || product.title.toLowerCase().includes('short sleeve'));
  //     case 'pants':
  //       return products.filter(product => product.title.toLowerCase().includes('pant') || product.title.toLowerCase().includes('jean'));
  //     default:
  //       return products.filter(product => 
  //         !product.title.toLowerCase().includes('shirt') &&
  //         !product.title.toLowerCase().includes('short sleeve') &&
  //         !product.title.toLowerCase().includes('pant') &&
  //         !product.title.toLowerCase().includes('jean')
  //       );
  //   }
  // };

  const onSwipedRight = (index) => {
    setFavorites(prevFavorites => [...prevFavorites, products[index]]);
  };

  const onSwipedLeft = (index) => {
    let updatedProducts = [...products];
    const removedItem = updatedProducts.splice(index, 1);
    updatedProducts.push(removedItem[0]);
    setProducts(updatedProducts);
  };

  // const productsToDisplay = filterProductsByCategory(selectedCategory);

  // const CategoryButton = ({ title, onPress }) => (
  //   <TouchableOpacity style={styles.optionButton} onPress={onPress}>
  //     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
  //       <Text style={styles.optionButtonText}>{title}</Text>
  //       <AntDesign name="right" size={20} color="grey" />
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      {products.length > 0 && (
      <Swiper
        cards={products}
        renderCard={(card) => {
          console.log(card);
          return (
            <View style={styles.card}>
              <Image source={{ uri: card.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardPrice}>${card.price}</Text>
            </View>
          );
        }}
        onSwipedRight={onSwipedRight}
        onSwipedLeft={onSwipedLeft}
        infinite={true}  // for an infinite loop
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