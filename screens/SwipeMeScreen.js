import React, { useState, useEffect } from "react";
import Swiper from 'react-native-deck-swiper';
import {View, Text, StyleSheet, Image, Button} from "react-native";
import data from '../data.json';
import {getLastSwipedIndexForUser,getFavoritesForUser, storeFavoriteForUser} from "../hook/databaseQueries";
import { auth } from "../configuration/firebase";

const SwipeScreen = () => {
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uid, setUid] = useState(null);
  const [categories, setCategories] = useState(data.map(cat => cat.categoryName));

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

useEffect(() => {
    setProducts(shuffleArray(data.flatMap(category => category.products)));

    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        setUid(user.uid);
        const index = await getLastSwipedIndexForUser(user.uid);
        setCurrentIndex(index);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();

  }, [uid]);

  const handleCategorySelection = (majorCategoryName) => {
    console.log(`Handling category selection for: ${majorCategoryName}`);

    const selectedMajorCategory = data.find(major => 
        major.majorCategory && major.majorCategory.toLowerCase() === majorCategoryName.toLowerCase()
    );

    if (selectedMajorCategory) {
        console.log('Found major category:', selectedMajorCategory.majorCategory);
        
        if (majorCategoryName === 'Accessories') {
            setProducts(shuffleArray(selectedMajorCategory.products || []));
        } else if (selectedMajorCategory.subCategories) {
            const matchedProducts = selectedMajorCategory.subCategories.flatMap(sub => sub.products || []);
            setProducts(shuffleArray(matchedProducts));
        } else {
            console.log('No subCategories or direct products found for:', majorCategoryName);
        }
    } else {
        console.log(`No major category found for: ${majorCategoryName}`);
    }
};

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
      <View style={styles.swiperContainer}>
          {products.some(product => product && product.imageUrl) && (
              <View style={styles.swiperContainer}>
                  <View style={styles.swiperWrapper}>
                      <Swiper
                          key={products.length} 
                          cards={products}
                          renderCard={(card) => {
                            if(card && card.imageUrl) {
                                const imageUrl = `${BASE_URL}${card.imageUrl}`;
                                return (
                                    <View style={styles.card}>
                                        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                                        <Text style={styles.cardTitle}>{card.name}</Text>
                                        <Text style={styles.cardPrice}>{card.price}</Text>
                                    </View>
                                );
                            }
                            return null; 
                          }}
                          onSwipedRight={onSwipedRight}
                          onSwipedLeft={onSwipedLeft}
                          infinite={false}
                          currentIndex={currentIndex}
                      />
                  </View>
              </View>
          )}
      </View>
      <View style={styles.categoryContainer}>
          <Button title="Men" onPress={() => handleCategorySelection('Men')} />
          <Button title="Women" onPress={() => handleCategorySelection('Women')} />
          <Button title="Accessories" onPress={() => handleCategorySelection('Accessories')} />
      </View>
  </View>
);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
    },
    swiperContainer: {
      flex: 1, 
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#f9f9f9",
    },
    swiperWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 530,
      marginRight: 330,
    },
    card: {
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      height: '70%', 
      borderRadius: 20,
      backgroundColor: '#f0ebdf', 
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
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 12,
      padding: 10,
    }
  });
  

export default SwipeScreen;