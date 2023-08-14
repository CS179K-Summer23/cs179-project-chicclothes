import React from "react";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

const ShoppingBagScreen = ({ navigation }) => {
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
        <View style={styles.gender}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShoppingBag", {
                screen: "ShoppingBagWomen",
              })
            }
          >
            <Text style={styles.GenderText}>Womens</Text>
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

        <View style={styles.genderSelected}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.selectedGenderText}>Kids</Text>
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
            <Text style={styles.TextCategories}>Accessories</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity>
            <Text style={styles.TextCategories}>Shoes</Text>
          </TouchableOpacity>
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
    height: "8%",
    width: "33.3%",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    // borderLeftColor:  "white",
    // backgroundColor: "#eeeeef",
    // backgroundColor: "black",
  },
  selectedGenderText: {
    fontSize: 15,
    // justifyContent: "center",
    paddingLeft: "25%",
    fontWeight: "bold",
    color: "#000101",
    // paddingBottom: 20,
  },
  gender: {
    height: "8%",
    width: "33.3%",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 18,

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
