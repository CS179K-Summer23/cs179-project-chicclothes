import React from "react";
import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
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
  Image,
} from "react-native";

const FirstRoute = () => (
  // <View style={{ flex: 1 }} />

  // <Text>Hello</Text>

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
        <Text style={styles.TextCategories}>Accessories</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.categories}>
      <TouchableOpacity>
        <Text style={styles.TextCategories}>Shoes</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.productsList}>
      {/* <FlatList
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
      /> */}
    </View>
  </View>
);

const SecondRoute = () => (
  // <View style={{ flex: 1 }} />;

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

    <View style={styles.productsList}></View>
  </View>
);

const renderScene = SceneMap({
  Men: FirstRoute,
  Women: SecondRoute,
});

const ShoppingBagTest = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Men", title: "Men" },
    { key: "Women", title: "Women" },
  ]);

  // const renderTabBar = (props) => {
  //   return (

  //       <TabBar
  //         {...props}
  //         renderLabel={({ focused, route }) => {
  //           return (
  //             <TextView
  //               size={20}
  //               category="Medium"
  //               color={focused ? "BLACK" : "GRAY3"}
  //             >
  //               {route.title}
  //             </TextView>
  //           );
  //         }}
  //         indicatorStyle={styles.indicatorStyle}
  //         style={styles.tabBar}
  //       />
  //     </SafeAreaView>
  //   );
  // };

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
    // backgroundColor: "black",
  },
  categories: {
    width: "40%", // is 50% of container width
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    backgroundColor: "white",
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

export default ShoppingBagTest;
