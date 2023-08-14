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

const HomeScreen = (navigation) => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ item: null, index: null });

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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
					<View style={[styles.smallContentTitle]}>
						<Text style={styles.title}>Welcome</Text>
					</View>
				</View>
      <View style={styles.welcomeContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}
        >
          <View style={styles.carouselSlide}>
            <Image
              source={require("./images/Clique_logo.png")}
              style={styles.carouselImage}
            />
          </View>

          <View style={styles.carouselSlide}>
        {/* <TouchableOpacity onPress={handleHome}> */}
              <Image
                source={require("./images/group_picture.jpg")}
                style={styles.carouselImage}
              />
            {/* </TouchableOpacity> */}
            <Text style={styles.overlayText}>Join the Clique</Text>
          </View>

          <View style={styles.carouselSlide}>
            <Image
              source={require("./images/group_picture2.jpg")}
              style={styles.carouselImage}
            />
            <Text style={styles.overlayText}>Checkout our Deals</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.title2Container}>
					<View style={[styles.smallContentTitle]}>
						<Text style={styles.title}>Latest Exculsives</Text>
					</View>
				</View>
      <View style={styles.productContainer}>
        <View style={{ padding: 10 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.productBox}>
              <View style={{ marginBottom: 20, marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct({ item: item, index: index });
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 115, height: 95 }}
                  />
                    <Text style={{ fontWeight: "bold", textAlign: "center" , marginTop: 5}}>
                    {item.price} USD
                  </Text>
                </TouchableOpacity>
                </View>
              </View>
            )}
            numColumns={2}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <AntDesign
                  name="arrowleft"
                  size={30}
                  color="black"
                  position="absolute"
                  left={10}
                  onPress={() => setModalVisible(false)}
                />
                 <AntDesign
                  name="hearto"
                  size={30}
                  color="red"
                  style={styles.heartIcon}
                  onPress={() => favoritePress(selectedProduct.index)}
                />
                {selectedProduct.item && (
                  <>
                    <Image
                      source={{ uri: selectedProduct.item.image }}
                      style={{ width: 250, height: 250 }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {selectedProduct.item.title}
                    </Text>
                    <Text>{selectedProduct.item.description}</Text>
                    <Text>{selectedProduct.item.price} USD</Text>
                  </>
                )}
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: "#2196F3" }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: "auto",
  },
  smallContentTitle: {
    flex: 1,
    flexDirection: "column",
  },
  titleContainer: {
    height: "12%",
    backgroundColor: "#e2ded3",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: -40,
  },
  title2Container: {
    height: "12%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: -40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    marginLeft: 15,
    top: 10,
  },
  welcomeContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#e2ded3", // or any other color you prefer
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },

  productContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "#fff",
    padding: 20,
    bottom: 35,
    justifyContent: "space-between",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageScrollView: {
    width: width,
  },
  carouselImage: {
    width: width,
    height: 200,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  carouselSlide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -65,
  },
  overlayText: {
    position: "absolute",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  productBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 20,
    marginHorizontal: 10, // Give space between boxes horizontally
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;