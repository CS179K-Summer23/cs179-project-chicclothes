import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../configuration/firebase";
import { Button, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import data from "../../data.json";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import {
  getLastSwipedIndexForUser,
  storeFavoriteForUser,
  x,
} from "../../hook/databaseQueries";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  map,
  SafeAreaView,
  FlatList,
  View,
  TouchableHighlight,
  Pressable,
  Image,
} from "react-native";

let buttonState = "";

function setButtonState(mode) {
  buttonState = mode;
  // console.log("set " + buttonState);
}

function getButtonState() {
  // console.log("get " + buttonState);
  return buttonState;
}

var productCount = 0;

const ShoppingBagTest = ({ route, navigation }) => {
  const currCat = route.params;

  const layout = useWindowDimensions();

  var [categoryState, setcategoryState] = React.useState(5);
  const BASE_URL = "https://";
  const [products, setProducts] = useState([]);

  const [modalItemIndex, setModalItemIndex] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uid, setUid] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Men", title: "Men" },
    { key: "Women", title: "Women" },
  ]);

  const handleCategorySelection = (majorCategoryName) => {
    setSelectedCategory(majorCategoryName);
    // console.log(`Handling category selection for: ${majorCategoryName}`);

    const selectedMajorCategory = data.find(
      (major) =>
        major.majorCategory &&
        major.majorCategory.toLowerCase() === majorCategoryName.toLowerCase()
    );
  };

  // const addToFav = () => {
  //   storeFavoriteForUser(uid, products[modalItemIndex])
  //   setModalVisible(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // };

  useEffect(() => {
    // console.log(currCat);

    if (currCat) {
      setSelectedCategory(currCat);
      // console.log(selectedCategory);
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    const majorCategory = index === 0 ? "Men" : "Women";

    // Find the corresponding sub-category from your local data.json
    const subCategoryData = data.find(
      (item) => item.majorCategory === majorCategory
    )?.subCategories[categoryState];

    // const itemData = data.find((item) => item.majorCategory === majorCategory)
    //   ?.subCategories[categoryState].products[clothsIndex];

    // // If sub-category exists, set its products to the component state
    if (subCategoryData) {
      setProducts(subCategoryData.products);
    if (data && Array.isArray(data)) {
      const allProducts = data.reduce((acc, curr) => {
        if (curr && curr.subCategories && Array.isArray(curr.subCategories)) {
          return [...acc, ...curr.subCategories.flatMap((sub) => (sub && sub.products) || [])];
        }
        return acc;
      }, []);
  
      if (searchQuery) {
        const matches = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredSuggestions(matches.slice(0, 5));
      } else {
        setFilteredSuggestions([]);
      }
    }

    // if (itemData) {
    //   setClothes(itemData);
    // }
  }, [categoryState, index, searchQuery]);
  

  const genderSwipeHandler = (swipedIndex) => {
    setIndex(swipedIndex);
    setcategoryState(5);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setProductIndex = (itemIndex) => {
    setModalItemIndex(itemIndex);
    // console.log(itemIndex);
  };

  var touchProps = {
    opacity: 0,
    // style: categoryState == 0 ? styles.categoriesSelected : styles.categories, // <-- but you can still apply other style changes
    // onHideUnderlay: () => setcategoryState(0),
    // onShowUnderlay: () => setcategoryState(2),
    // onPress: () => setcategoryState(true), // <-- "onPress" is apparently required
    onPress: () => console.log(categoryState),
  };

  var touchProps2 = {
    opacity: 0,
    style: categoryState == 2 ? styles.categoriesSelected : styles.categories, // <-- but you can still apply other style changes
    // onHideUnderlay: () => setcategoryState(0),
    // onShowUnderlay: () => setcategoryState(2),
    // onPress: () => setcategoryState(true), // <-- "onPress" is apparently required
    onPress: () => console.log(categoryState),
  };

  //routes

  const FirstRoute = () => (
    // <View style={{ flex: 1 }} />

    // <Text>Hello</Text>
    <SafeAreaView style={styles.ye}>
      <View style={styles.leftColumnContainer}>
        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(5)}
            {...touchProps}
            style={
              categoryState == 5 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Shirts</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(6)}
            {...touchProps}
            style={
              categoryState == 6 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Graphic Tees</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(2)}
            {...touchProps}
            style={
              categoryState == 2 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Outerwear</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(3)}
            {...touchProps}
            style={
              categoryState == 3 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>
              Hoodies & Sweatshirts
            </Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(1)}
            {...touchProps}
            style={
              categoryState == 1 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Jeans</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(7)}
            {...touchProps}
            style={
              categoryState == 7 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Shorts</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(4)}
            {...touchProps}
            style={
              categoryState == 4 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Swim</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(0)}
            {...touchProps}
            style={
              categoryState == 0 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Footwear</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.productsList}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.picContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedProduct(item);
                  setModalVisible(true);
                  setProductIndex(index);
                }}
              >
                <Image
                  source={{ uri: `${BASE_URL}${item.imageUrl}` }}
                  style={styles.pics}
                />
                <Modal isVisible={isModalVisible}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 200,
                      marginBottom: 200,
                      backgroundColor: "white",
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URL}${products[modalItemIndex].imageUrl}`,
                      }}
                      style={styles.modalPics}
                    />
                    <Text style={{ alignItems: "center", fontSize: 16 }}>
                      {products[modalItemIndex].name} USD
                    </Text>
                    <Text style={{ alignItems: "center", fontSize: 16 }}>
                      {products[modalItemIndex].price} USD
                    </Text>

                    <AntDesign
                      name="hearto"
                      size={30}
                      color="red"
                      style={styles.heartIcon}
                      onPress={() =>
                        storeFavoriteForUser(
                          uid,
                          products[modalItemIndex],
                          setModalVisible(false)
                        )
                      }
                    />

                    <Button title="Close" onPress={toggleModal} />
                  </View>
                </Modal>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                  {item.price} USD
                </Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );

  const SecondRoute = () => (
    // <View style={{ flex: 1 }} />;
    <SafeAreaView style={styles.ye}>
      <View style={styles.leftColumnContainer}>
        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(5)}
            {...touchProps}
            style={
              categoryState == 5 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Shirts</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(7)}
            {...touchProps}
            style={
              categoryState == 7 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Printed Tees</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(0)}
            {...touchProps}
            style={
              categoryState == 0 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Outerwear</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(4)}
            {...touchProps}
            style={
              categoryState == 4 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Dresses</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(3)}
            {...touchProps}
            style={
              categoryState == 3 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>
              Hoodies & Sweatshirts
            </Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(2)}
            {...touchProps}
            style={
              categoryState == 2 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Jeans</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(9)}
            {...touchProps}
            style={
              categoryState == 9 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Shorts</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(1)}
            {...touchProps}
            style={
              categoryState == 1 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Spanx</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(6)}
            {...touchProps}
            style={
              categoryState == 6 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Swim & Beach</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight
            onShowUnderlay={() => setcategoryState(8)}
            {...touchProps}
            style={
              categoryState == 8 && index == 1
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Footwear</Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.productsList}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.picContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedProduct(item);
                  setModalVisible(true);
                  setProductIndex(index);
                }}
              >
                <Image
                  source={{ uri: `${BASE_URL}${item.imageUrl}` }}
                  style={styles.pics}
                />
                <Modal isVisible={isModalVisible}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 200,
                      marginBottom: 200,
                      backgroundColor: "white",
                    }}
                  >
                    <Image
                      source={{
                        uri: `${BASE_URL}${products[modalItemIndex].imageUrl}`,
                      }}
                      style={styles.modalPics}
                    />
                    <Text style={{ alignItems: "center", fontSize: 16 }}>
                      {products[modalItemIndex].name} USD
                    </Text>
                    <Text style={{ alignItems: "center", fontSize: 16 }}>
                      {products[modalItemIndex].price} USD
                    </Text>

                    <AntDesign
                      name="hearto"
                      size={30}
                      color="red"
                      style={styles.heartIcon}
                      onPress={() =>
                        storeFavoriteForUser(
                          uid,
                          products[modalItemIndex],
                          setModalVisible(false)
                        )
                      }
                    />

                    <Button title="Close" onPress={toggleModal} />
                  </View>
                </Modal>
                <Text
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 13,
                  }}
                >
                  {item.price} USD
                </Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );

  const renderScene = SceneMap({
    Men: FirstRoute,
    Women: SecondRoute,
  });

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
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      </View>
      {searchQuery.length > 0 && (
        <View style={styles.suggestionsDropdown}>
          {filteredSuggestions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSearchQuery(item.name); // or navigate, add to cart, etc.
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text
                style={{
                  color: "black",
                  margin: 8,
                  fontSize: 16,
                }}
              >
                {route.title}
              </Text>
            )}
            indicatorStyle={styles.indicatorStyle}
            style={styles.genderSelect}
          />
        )}
        renderScene={renderScene}
        indicatorStyle={styles.indicatorStyle}
        onIndexChange={genderSwipeHandler}
        style={styles.tabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ye: {
    flex: 1,
  },
  containerShop: {
    flex: 1,
    backgroundColor: "white",
  },
  genderSelect: {
    backgroundColor: "white",
    marginTop: "-3%",
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
    // borderRadius: 16,
    marginVertical: "4%",
    // marginVertical: 16,
    height: 50,
    // paddingLeft: 5,
    // paddingRight: 5,
    marginLeft: 15,
    marginRight: 15,
    // marginBottom: "-0.1%",
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
  indicatorStyle: {
    backgroundColor: "black",
    paddingTop: 3.5,
  },
  leftColumnContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    // backgroundColor: "black",
    // alignItems: "flex-start", // if you want to fill rows left to right
  },
  categoriesSelected: {
    width: "30%", // is 50% of container width
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    backgroundColor: "#eeeeef",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000101",
    // backgroundColor: "black",
  },
  categories: {
    width: "30%", // is 50% of container width
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    backgroundColor: "white",
  },
  TextCategories: {
    fontSize: 15,
    color: "#000101",
  },
  productsList: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "black",
    // width: "64%",
    marginLeft: 111,
    justifyContent: "flex-start",
    // marginTop: -414,
    marginTop: -560,
  },
  pics: {
    width: 90,
    height: 90,
    backgroundColor: "black",
  },
  modalPics: {
    width: 250,
    height: 250,
    backgroundColor: "black",
  },
  picContainer: {
    marginBottom: 20,
    marginHorizontal: 25,
    backgroundColor: "#eeeeef",
    padding: 10,
  },
  heartIcon: {
    // position: "absolute",
    paddingTop: 7,
    // top: 10,
    // right: 10,
    zIndex: 1,
  },
  suggestionsDropdown: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    maxHeight: 200,  // You can adjust this
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default ShoppingBagTest;
