import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SwipeScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filterProductsByCategory = (category) => {
    switch (category) {
      case 'shirts':
        return products.filter(product => product.title.toLowerCase().includes('shirt') || product.title.toLowerCase().includes('short sleeve'));
      case 'pants':
        return products.filter(product => product.title.toLowerCase().includes('pant') || product.title.toLowerCase().includes('jean'));
      default:
        return products.filter(product => 
          !product.title.toLowerCase().includes('shirt') &&
          !product.title.toLowerCase().includes('short sleeve') &&
          !product.title.toLowerCase().includes('pant') &&
          !product.title.toLowerCase().includes('jean')
        );
    }
  };

  const productsToDisplay = filterProductsByCategory(selectedCategory);

  const CategoryButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.optionButton} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Text style={styles.optionButtonText}>{title}</Text>
        <AntDesign name="right" size={20} color="grey" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.categories}>
        <CategoryButton title="Shirts" onPress={() => setSelectedCategory('shirts')} />
        <CategoryButton title="Pants" onPress={() => setSelectedCategory('pants')} />
        <CategoryButton title="Other" onPress={() => setSelectedCategory('other')} />
      </View>

      {selectedCategory && productsToDisplay.map(product => (
        <View key={product.id} style={styles.productContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
      )
      )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  categories: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  optionButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  productContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 8,
  }
}
);

export default SwipeScreen;
