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
import Carousel, { Pagination } from "react-native-snap-carousel";
import data from "../data.json";

const HomeScreen = (navigation) => {
  const [products, setProducts] = useState(data.products || []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [numColumns, setNumColumns] = useState(4);

  const getPic2LineStyles = (index) => {
    switch (index) {
      case 0: 
        return { fontSize: 35,bottom:50, alignSelf:'auto',textAlign: "right", }; // or any other styles for the first line
      case 1: 
        return {fontSize: 18, bottom: 30, alignSelf: 'auto', textAlign: "left", }; // styles for the second line
      case 2: 
        return { fontSize: 18,bottom: 10, alignSelf: 'auto',textAlign: "left", }; // styles for the third line
      default: 
        return {};
    }
  };

  const renderItem = ({ item }) => {
    let textStyles;
    let textOverlayStyles = styles.textOverlay;

    switch (item.textStyle) {
      case "pic1":
        textStyles = styles.pic1Text;
        textOverlayStyles = styles.textOverlayPic1;
        break;
      case "pic2":
        textStyles = styles.pic2Text;
        textOverlayStyles = styles.textOverlayPic2;
        break;
      case "pic3":
        textStyles = styles.pic3Text;
        textOverlayStyles = styles.textOverlayPic3;
        break;
      default:
        textStyles = styles.carouselText;
    } 
    if (item.textStyle === "pic2") {
      return (
        <View style={styles.slide}>
          <Image source={item.uri} style={styles.image} />
          <View style={styles.textOverlayPic2}>
            {item.text.map((line, index) => (
              <Text key={index} style={[styles.pic2Text, getPic2LineStyles(index)]}>{line}</Text>
            ))}
            <TouchableOpacity style={styles.carouselButton} onPress={handleButtonPress}>
                      <Text style={styles.carouselButtonText}>Join Now</Text>
                  </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (item.textStyle === "pic3") {
      return (
          <View style={styles.slide}>
              <Image source={item.uri} style={styles.image} />
              <View style={textOverlayStyles}>
                  <Text style={textStyles}>{item.text}</Text>
                  <TouchableOpacity style={styles.carouselSuggestionButton} onPress={handleButtonPress}>
                      <Text style={styles.carouselButtonText}>Try Now</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  }
    return (
      <View style={styles.slide}>
        <Image source={item.uri} style={styles.image} />
        <View style={textOverlayStyles}>
          <Text style={textStyles}>{item.text}</Text>
        </View>
      </View>
    );
  };
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)}>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryBox}>
          <Image source={item.uri} style={styles.categoryImage} />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleCategoryPress = (category) => {
    console.log(`Selected category: ${category.name}`);
  };
  const handleButtonPress = () => {
    console.log(`Suggestion Bot Pressed`);
  };
  const categoriesData = [
    { uri: require("./images/categoryImage/jacket.jpg"), name: "Jackets" },
    { uri: require("./images/categoryImage/shoes.jpg"), name: "Shoes" },
    { uri: require("./images/categoryImage/accessories.jpg"), name: "Accessories",},
    { uri: require("./images/categoryImage/jean2.jpg"), name: "Jeans" },
    { uri: require("./images/categoryImage/spanxs.jpg"), name: "Spanxs" },
    { uri: require("./images/categoryImage/shirt.jpg"), name: "Shirts" },
    { uri: require("./images/categoryImage/hoodie.jpg"), name: "Hoodies" },
    { uri: require("./images/categoryImage/dress2.jpg"), name: "Dresses" },
    { uri: require("./images/categoryImage/swimwear.jpg"), name: "Swimwear" },
    { uri: require("./images/categoryImage/graphic_shirt.jpg"), name: "T-shirts",},
    { uri: require("./images/categoryImage/shorts.jpg"), name: "Shorts" },
    { uri: require("./images/Clique_logo.png"), name: "Deals" },
  ];

  const carouselItems = [
    {
      uri: require("./images/homePhoto4.jpg"),
      text: "Welcome to the Clique",
      textStyle: "pic1",
    },
    {
      uri: require("./images/homePhoto6.jpg"),
      text: [
        "Join the Clique",
        "Get the latest news\n on new and returning items",
        "Earn points for rewards\n and special offers"
      ],
      textStyle: "pic2",
    },
    {
      uri: require("./images/homePhoto5.jpg"),
      text:["Need Help Choosing New Clothes\nTry our Suggestion Bot"],
      textStyle: "pic3",
    },
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
        itemHeight={height * 0.75} 
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
          key={numColumns} 
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
    height: height * 0.75, 
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: width,
    height: height * 0.75,
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
    left: 10, 
    top: "50%",
    transform: [{ translateY: -0.5 * height * 0.1 }],
    alignItems: "flex-start",
  },
  textOverlayPic1: {
    position: "absolute",
    top: 50,
    alignItems: "flex-start",
    zIndex: 10,
  },
  textOverlayPic2: {
    position: "absolute",
    left: 10, 
    top: "50%",
    transform: [{ translateY: -0.5 * height * 0.1 }],
    alignItems: "flex-start",
  },
  textOverlayPic3: {
    position: "absolute",
    top: 325,
    alignItems: "flex-start",
    zIndex: 10,
  },
  carouselText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: 50,
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
    width: Dimensions.get("window").width / 3 - 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
  },

  categoryImage: {
    width: 70, 
    height: 70, 
    borderRadius: 10,
  },

  categoryText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
  pic1Text: {
    fontSize: 35,
    color: "yellow",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pic2Text: {
    color: "white",
    fontWeight: "bold",
     
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pic3Text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 35,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  carouselButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black", 
    borderRadius: 5,
    alignItems: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
},
carouselSuggestionButton: {
  marginTop: 15,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: "black", 
  borderRadius: 5,
  marginLeft: 85,
  textShadowColor: "rgba(0, 0, 0, 0.75)",
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
},
carouselButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
},
});

export default HomeScreen;

