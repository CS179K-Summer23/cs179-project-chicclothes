import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import ChatGptResponseModalContent from "./ChatGptResponseModalContent";

const SuggestionScreen = () => {
  const BASE_URL = "https://";
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [stylePreference, setStylePreference] = useState("");
  const [budget, setBudget] = useState("");
  const [color, setColor] = useState("");
  const [considerations, setConsiderations] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductModalVisible, setSelectedProductModalVisible] =
    useState(false);
  const [suitableProductsList, setSuitableProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const data = require("../../data.json");
  const filterData = (
    age,
    gender,
    typeOfClothes,
    budget,
    color,
    currentSeason
  ) => {
    let suitableProducts = [];
    const [minBudget, maxBudget] = budget
      .split("-")
      .map((val) => parseFloat(val));

    data.forEach((category) => {
      if (gender === "Female" && category.majorCategory !== "Women") return;
      if (gender === "Male" && category.majorCategory !== "Men") return;

      category.subCategories.forEach((subCategory) => {
        if (
          subCategory.categoryName
            .toLowerCase()
            .includes(typeOfClothes.toLowerCase())
        ) {
          subCategory.products.forEach((product) => {
            const priceValue = parseFloat(product.price.replace("$", ""));
            if (priceValue >= minBudget && priceValue <= maxBudget) {
              if (product.name.toLowerCase().includes(color.toLowerCase())) {
                suitableProducts.push(product);
              }
            }
          });
        }
      });
      suitableProducts = shuffleArray(suitableProducts);
    });

    return suitableProducts;
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedProductModalVisible(true);
  };

  const sendMessage = async () => {
    const suitableProducts = filterData(
      age,
      gender,
      stylePreference,
      budget,
      color,
      location
    );
    setSuitableProductsList(suitableProducts);
    const productNames = suitableProducts.map((product) => product.name);
    const formatProductNames = (names) => {
      if (names.length === 1) return names[0];
      if (names.length === 2) return `${names[0]} and ${names[1]}`;
      const lastProductName = names.pop();
      return `${names.join(", ")}, and ${lastProductName}`;
    };

    const formattedNames = formatProductNames(productNames);

    const message = `You are a top-tier fashion consultant, StyleGPT. Given the following information: 
Age: ${age}, 
Gender: ${gender}, 
Type of Clothes: ${stylePreference},
Budget: ${budget},
Favorite Color: ${color},
Current Season: ${location}. 
The products I found suitable are ${formattedNames}. For only the first 4 products how would you describe or recommend them?`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({ prompt: message, max_tokens: 300 }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        options
      );
      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].text) {
        setResponseMessage(data.choices[0].text.trim());
        setModalVisible(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Something went wrong while contacting the GPT API."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    keyboardVerticalOffset={20}
    enabled
  >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Suggestion Bot</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.direction}>
            Need fashion inspiration? Answer a few questions and get tailored
            suggestions. Answer with as much details as possible.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender (Male/Female)"
            placeholderTextColor="#999"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Season/ Location"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Type of Clothes (Jacket? T-Shirts? Shoes? etc.)"
            placeholderTextColor="#999"
            value={stylePreference}
            onChangeText={setStylePreference}
          />
          <TextInput
            style={styles.input}
            placeholder="Budget Range (Ex. 20-100)"
            placeholderTextColor="#999"
            value={budget}
            onChangeText={setBudget}
          />
          <TextInput
            style={styles.input}
            placeholder="Favorite Color"
            placeholderTextColor="#999"
            value={color}
            onChangeText={setColor}
          />
          <TextInput
            style={styles.input}
            placeholder="Considerations (Ex: Don't like it too tight)"
            placeholderTextColor="#999"
            value={considerations}
            onChangeText={setConsiderations}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={sendMessage}
          >
            <Text style={styles.buttonText}>Get Suggestions</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ChatGptResponseModalContent
                  message={responseMessage}
                  setModalVisible={setModalVisible}
                  suitableProductsList={suitableProductsList}
                  handleProductSelect={handleProductSelect}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
      </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f0ebdf",
    height: "150%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },
  response: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    padding: 10,
    alignContent: "center",
  },
  direction: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#f0ebdf",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  product: {
    width: "50%",
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
  },
});

export default SuggestionScreen;