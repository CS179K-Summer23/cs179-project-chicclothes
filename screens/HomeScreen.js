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

const HomeScreen = (navigation) => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to Our Store!</Text>
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
      <View style={styles.productContainer}>
        <View style={{ padding: 10 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20, marginHorizontal: 25 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedProduct(item);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 125, height: 125 }}
                  />
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {item.price} USD
                  </Text>
                </TouchableOpacity>
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
                {selectedProduct && (
                  <>
                    <Image
                      source={{ uri: selectedProduct.image }}
                      style={{ width: 250, height: 250 }}
                    />
                    <Text style={{ textAlign: "center" }}>
                      {selectedProduct.title}
                    </Text>
                    <Text>{selectedProduct.description}</Text>
                    <Text>{selectedProduct.price} USD</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#e2ded3", // or any other color you prefer
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    position: "absolute",
    top: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  productContainer: {
    width: "100%",
    height: 350,
    backgroundColor: "#fff",
    padding: 20,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
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
});

export default HomeScreen;