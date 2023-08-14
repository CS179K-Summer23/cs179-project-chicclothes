import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Favorites } from '../data';

const FavoritesScreen = () => {
  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={styles.favoriteItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={Favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id.toString()}  // assuming each product has an id
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  }
});

export default FavoritesScreen;

