import React from "react";
import { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

const ShoppingBagScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const clothesProducts = data.filter(
          (product) =>
            // product.category === "men's clothing" ||
            product.category === "women's clothing" ||
            product.category === "Women's clothing"
        );
        setProducts(clothesProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <SafeAreaView style={styles.containerShop}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchWrapper}
            // value=""
            color="#7c7c7d"
            onPressIn={() => {}}
            placeholder="What are you looking for"
          />
        </View>
        {/* <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" size={24} color="#F3F4F8" />
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.genderSelectContainer}>
        <View style={styles.genderSelected}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.selectedGenderText}>Womens</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gender}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShoppingBag", {
                screen: "ShoppingBagMen",
              })
            }
          >
            <Text style={styles.GenderText}>Mens</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.leftColumnContainer}>
        <View style={styles.categoriesSelected}>
          <TouchableOpacity>
            <Text style={styles.selectedTextCategories}>Tops</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Bottoms</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Dresses</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Outerwear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Swimwear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Jeans</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Loungewear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Accessories</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Shoes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsList}>
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
                    style={{ width: 90, height: 90 }}
                  />
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {item.price} USD
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerShop: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#eeeeef",
    borderRadius: 16,
    marginVertical: 16,
    height: 50,
    // paddingLeft: 5,
    // paddingRight: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: "#83829A",
    marginTop: 12,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#eeeeef",
    marginRight: 12,
    borderRadius: 12,
  },
  searchInput: {
    width: "100",
    height: "100",
    paddingHorizontal: 12,
  },
  genderSelectContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginTop: -10,
    marginBottom: 400,
    // backgroundColor: "black",
    // alignItems: "flex-start", // if you want to fill rows left to right
  },
  genderSelected: {
    flex: 1,
    height: "8%",
    width: "33.3%",
    paddingTop: 14,
    paddingBottom: 14,
    // paddingLeft: "15%",
    borderBottomWidth: 2,
    borderBottomColor: "black",
    justifyContent: "flex-start",
    // borderLeftColor:  "white",
    // backgroundColor: "#eeeeef",
    // backgroundColor: "black",
  },
  selectedGenderText: {
    fontSize: 15,
    // justifyContent: "center",
    paddingLeft: 20,
    fontWeight: "bold",
    color: "#000101",
    // paddingBottom: 20,
  },
  gender: {
    flex: 1,
    height: "8%",
    width: "33.3%",
    paddingTop: 14,
    paddingBottom: 14,
    // paddingLeft: 18,
    justifyContent: "flex-start",

    // backgroundColor: "#eeeeef",
    // backgroundColor: "black",
  },
  GenderText: {
    fontSize: 15,
    justifyContent: "center",
    paddingLeft: "25%",
    // fontWeight: "bold",
    color: "#000101",
  },
  productsList: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "black",
    width: "64%",
    marginLeft: 152,
    justifyContent: "flex-start",
    marginTop: -414,
  },
  leftColumnContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    marginTop: -940,
    // backgroundColor: "black",
    // alignItems: "flex-start", // if you want to fill rows left to right
  },
  categoriesSelected: {
    width: "38%", // is 50% of container width
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    backgroundColor: "#eeeeef",
    // backgroundColor: "black",
  },
  categories: {
    width: "40%", // is 50% of container width
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    backgroundColor: "white",
    // backgroundColor: "black",
  },
  selectedTextCategories: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000101",
  },
  TextCategories: {
    fontSize: 15,
    color: "#000101",
  },
});

export default ShoppingBagScreen;
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Image, FlatList } from "react-native";

// const ShoppingBagScreen = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   const fetchASOSData = async (query) => {
//     const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=27417&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`;
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'dc4c7a6c90msh735308c29f72d3fp12d5c6jsn8b868bcc1b36',  // Remember to secure this later!
//         'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const result = await response.json();
//       const simplifiedData = {
//         categoryName: result.categoryName,
//         products: result.products.map(product => ({
//           id: product.id,
//           name: product.name,
//           price: product.price.current.text,
//           url: product.url,
//           imageUrl: product.imageUrl
//         }))
//       };

//       console.log(simplifiedData);  // Logs the simplified data
//       setData(simplifiedData);
//       setData(result);
//     } catch (err) {
//       setError(err);
//     }
//   };
//   const renderProduct = ({ item: product }) => (
//     <View key={product.id} style={styles.product}>
//       <Image
//         style={styles.productImage}
//         source={{ uri: `https://${product.imageUrl}` }}
//       />
//       <Text style={styles.productName}>{product.name}</Text>

//       {product.price && product.price.current && product.price.current.text ? (
//         <Text style={styles.productPrice}>{product.price.current.text}</Text>
//       ) : (
//         <Text style={styles.productPrice}>N/A</Text>
//       )}
//     </View>
//   );

//   useEffect(() => {
//     fetchASOSData('bikini top');
//   }, []);
//   return (
//     <View style={styles.container}>
//       {error ? (
//         <Text style={styles.text}>Error: {error.message}</Text>
//       ) : data ? (
//         <FlatList
//           style={styles.productsContainer}
//           data={data.products}
//           renderItem={renderProduct}
//           keyExtractor={(product) => product.id.toString()}
//         />
//       ) : (
//         <Text style={styles.text}>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   productsContainer: {
//     flex: 1,
//     width: "100%",
//   },
//   product: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//     alignItems: "center",
//   },
//   productImage: {
//     width: 150,
//     height: 150,
//     resizeMode: "contain",
//   },
//   productName: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   text: {
//     fontSize: 18,
//     color: "#333",
//   },
//   productPrice: {
//     marginTop: 5,
//     fontSize: 18,
//     color: "#000",
//   },
// });

// export default ShoppingBagScreen;
