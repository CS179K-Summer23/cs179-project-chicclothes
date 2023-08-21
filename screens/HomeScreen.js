import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Favorites } from "../data";
import Carousel, { Pagination } from "react-native-snap-carousel";

const HomeScreen = (navigation) => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    item: null,
    index: null,
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [numColumns, setNumColumns] = useState(3);

  //   const handleHome = () => {
  //       navigation.navigate("Profile");
  //   };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const clothesProducts = data.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );
        setProducts(clothesProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const favoritePress = (index) => {
    Favorites.push(products[index]);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.uri} style={styles.image} />
      <View style={styles.textOverlay}>
        <Text style={styles.carouselText}>{item.text}</Text>
      </View>
    </View>
  );
  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryContainer}>
    <View style={styles.categoryBox}>
      <Image source={item.uri} style={styles.categoryImage} />
    </View>
    <Text style={styles.categoryText}>{item.name}</Text>
  </View>
  );
  const categoriesData = [
    { uri: require("./images/Clique_logo.png"), name: "Jackets" },
    { uri: require("./images/Clique_logo.png"), name: "Shoes" },
    { uri: require("./images/Clique_logo.png"), name: "Accessories" },
    { uri: require("./images/Clique_logo.png"), name: "Jeans" },
    { uri: require("./images/Clique_logo.png"), name: "Spanxs" },
    { uri: require("./images/Clique_logo.png"), name: "Shirts" },
    { uri: require("./images/Clique_logo.png"), name: "Hoodies" },
    { uri: require("./images/Clique_logo.png"), name: "Dresses" },
    { uri: require("./images/Clique_logo.png"), name: "Swimwear" },
    { uri: require("./images/Clique_logo.png"), name: "T-shirts" },
    { uri: require("./images/Clique_logo.png"), name: "Shorts" },
    { uri: require("./images/Clique_logo.png"), name: "Bhorts" },
  ];

  const carouselItems = [
    { uri: require("./images/Clique_logo.png"), text: "Text for Image 1" },
    { uri: require("./images/group_picture.jpg"), text: "Text for Image 2" },
    { uri: require("./images/group_picture2.jpg"), text: "Text for Image 3" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        itemHeight={height * 0.75} // for example, half the screen height
        sliderHeight={height * 0.75}
        loop={true}
        autoplay={true}
        autoplayDelay={10000}
        autoplayInterval={10000}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        dotColor="black"
        inactiveDotColor="grey"
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Search By Category</Text>
        <FlatList
          key={numColumns} // This line forces a re-render when numColumns changes
          data={categoriesData}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          numColumns={numColumns}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slide: {
    height: height * 0.75, // Adjust as needed, keeping consistent with the Carousel height
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: width,
    height: height,
    resizeMode: "cover",
  },
  paginationContainer: {
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },
  categoriesContainer: {
    marginTop: 20,
    padding: 15,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  textOverlay: {
    position: "absolute",
    bottom: 10, // for example, position text at the bottom of the image
    left: 10,
    right: 10, // ensure text doesn't overflow the image boundaries
    alignItems: "center",
  },

  carouselText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // optional, adds a semi-transparent background to make text more readable
    padding: 5, // padding for the background
    borderRadius: 5, // optional, round the corners of the background
  },
  categoriesContainer: {
    marginTop: 20,
    padding: 15,
    alignItems: "center",
  },

  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  categoryBox: {
    width: Dimensions.get("window").width / 3-50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 5,
  },

  categoryImage: {
    width: 70, // adjust size as needed
    height: 70, // adjust size as needed
    borderRadius: 10,
  },

  categoryText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
});

export default HomeScreen;
