import React from "react";
import { useState, useEffect } from "react";
import { Button, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  View,
  TouchableHighlight,
  Pressable,
  Image,
} from "react-native";
import data from "../../data.json";

let buttonState = "";

function setButtonState(mode) {
  buttonState = mode;
  console.log("set " + buttonState);
}

function getButtonState() {
  console.log("get " + buttonState);
  return buttonState;
}

const ShoppingBagTest = ({ navigation }) => {
  const layout = useWindowDimensions();
  const BASE_URL = "https://";

  var [categoryState, setcategoryState] = React.useState(0);

  const mensClothes = [
    "men's clothing",
    "women's clothing",
    "men's clothing",
    "women's clothing",
  ];

  const womensClothes = [
    "women's clothing",
    "men's clothing",
    "women's clothing",
    "men's clothing",
  ];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Men", title: "Men" },
    { key: "Women", title: "Women" },
  ]);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const majorCategory = index === 0 ? "Men" : "Women";

    // Find the corresponding sub-category from your local data.json
    const subCategoryData = data.find(
      (item) => item.majorCategory === majorCategory
    )?.subCategories[categoryState];

    // If sub-category exists, set its products to the component state
    if (subCategoryData) {
      setProducts(subCategoryData.products);
    }
  }, [categoryState, index]);

  var touchProps = {
    opacity: 0,
    // style: categoryState == 0 ? styles.categoriesSelected : styles.categories, // <-- but you can still apply other style changes
    // onHideUnderlay: () => setcategoryState(0),
    // onShowUnderlay: () => setcategoryState(2),
    // onPress: () => setcategoryState(true), // <-- "onPress" is apparently required
    onPress: () => renderClothes(),
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
            onShowUnderlay={() => setcategoryState(0)}
            {...touchProps}
            style={
              categoryState == 0 && index == 0
                ? styles.categoriesSelected
                : styles.categories
            }
          >
            <Text style={styles.selectedTextCategories}>Shirts</Text>
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
            <Text style={styles.selectedTextCategories}>Graphics</Text>
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
            <Text style={styles.selectedTextCategories}>Shorts</Text>
          </TouchableHighlight>
        </View>
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
                  source={{ uri: `${BASE_URL}${item.image}` }}
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
    </SafeAreaView>
  );

  const SecondRoute = () => (
    // <View style={{ flex: 1 }} />;

    <SafeAreaView style={styles.ye}>
      <View style={styles.leftColumnContainer}>
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
            <Text style={styles.selectedTextCategories}>Shirts</Text>
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
            <Text style={styles.selectedTextCategories}>Graphics</Text>
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
            <Text style={styles.selectedTextCategories}>Jackets & Coats</Text>
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
            <Text style={styles.selectedTextCategories}>Jeans</Text>
          </TouchableHighlight>
        </View>
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
                  source={{ uri: `${BASE_URL}${item.image}` }}
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
          />
        </View>
      </View>

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
        onIndexChange={setIndex}
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
    width: "35%", // is 50% of container width
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
    width: "40%", // is 50% of container width
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
    width: "64%",
    marginLeft: 152,
    justifyContent: "flex-start",
    marginTop: -414,
  },
});

export default ShoppingBagTest;
