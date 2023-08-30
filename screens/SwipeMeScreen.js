import React, { useState, useEffect, useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import data from "../data.json";
import {
  getLastSwipedIndexForUser,
  storeFavoriteForUser,
} from "../hook/databaseQueries";
import { auth } from "../configuration/firebase";

const SwipeScreen = () => {
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [uid, setUid] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const swiperRef = useRef(null);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setProducts(shuffleArray(data.flatMap((category) => category.products)));

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
    setSelectedCategory(majorCategoryName);
    console.log(`Handling category selection for: ${majorCategoryName}`);

    const selectedMajorCategory = data.find(
      (major) =>
        major.majorCategory &&
        major.majorCategory.toLowerCase() === majorCategoryName.toLowerCase()
    );

    if (selectedMajorCategory) {
      console.log("Found major category:", selectedMajorCategory.majorCategory);

      if (majorCategoryName === "Accessories") {
        setProducts(shuffleArray(selectedMajorCategory.products || []));
      } else if (selectedMajorCategory.subCategories) {
        const matchedProducts = selectedMajorCategory.subCategories.flatMap(
          (sub) => sub.products || []
        );
        setProducts(shuffleArray(matchedProducts));
      } else {
        console.log(
          "No subCategories or direct products found for:",
          majorCategoryName
        );
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

  const handleLeftButtonPress = () => {
    if (swiperRef.current) {
        swiperRef.current.swipeLeft();
    }
  };

  const handleRightButtonPress = () => {
    if (swiperRef.current) {
        swiperRef.current.swipeRight();
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        {products.some((product) => product && product.imageUrl) && (
          <View style={styles.swiperContainer}>
            <View style={styles.swiperWrapper}>
              <Swiper
                ref={swiperRef}
                key={products.length}
                cards={products}
                renderCard={(card) => {
                  if (card && card.imageUrl) {
                    const imageUrl = `${BASE_URL}${card.imageUrl}`;
                    return (
                      <View style={styles.card}>
                        <Image
                          source={{ uri: imageUrl }}
                          style={styles.cardImage}
                        />
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

      <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLeftButtonPress}>
              <Text style={styles.actionButtonText}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleRightButtonPress}>
              <Text style={styles.actionButtonText}>❤️</Text>
          </TouchableOpacity>
        </View>


      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === "Men" ? styles.selectedButton : null,
          ]}
          onPress={() => handleCategorySelection("Men")}
        >
          <Text style={styles.buttonText}>Men</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === "Women" ? styles.selectedButton : null,
          ]}
          onPress={() => handleCategorySelection("Women")}
        >
          <Text style={styles.buttonText}>Women</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === "Accessories" ? styles.selectedButton : null,
          ]}
          onPress={() => handleCategorySelection("Accessories")}
        >
          <Text style={styles.buttonText}>Accessories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  swiperContainer: {
    flex: 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginTop: 30,
  },
  swiperWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 650,
    marginRight: 340,
  },
  card: {
    marginTop: 20,
    marginBottom: 20,
    width: "90%",
    height: "65%",
    borderRadius: 20,
    backgroundColor: "#f0ebdf",
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardPrice: {
    fontSize: 20,
    marginBottom: 10,
    color: "#2E8B57",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 12,
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "#f0ebdf",
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginVertical: 10,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333'
  },
  actionButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  }

});

export default SwipeScreen;
