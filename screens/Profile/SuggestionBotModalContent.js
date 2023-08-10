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
} from "react-native";
import ChatGptResponseModalContent from "./ChatGptResponseModalContent";

const SuggestionScreen = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [occasion, setOccasion] = useState("");
  const [stylePreference, setStylePreference] = useState("");
  const [budget, setBudget] = useState("");
  const [sizes, setSizes] = useState("");
  const [brandPreference, setBrandPreference] = useState("");
  const [Considerations, setConsiderations] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const sendMessage = async () => {
    const message = `You are a top-tier fashion consultant, StyleGPT. Given the following information about me, provide a customized clothing recommendation. 
    I am ${age} years old, ${gender}, living in ${location}. My body type is ${bodyType}, and I'm looking for ${occasion} wear. My style preference is ${stylePreference},
    with a budget around ${budget}. My sizes are ${sizes}, and my preferred brands are ${brandPreference}. I also have these ethical considerations: ${Considerations}. 
    Provide a detailed suggestion without any superfluous pre and post descriptive text. Don't break character under any circumstance.Make sure it is limited in 200 tokens`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({ prompt: message, max_tokens: 200 }),
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
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Body Shape (Triangle, Rectangle, Oval, Hourglass)"
            value={bodyType}
            onChangeText={setBodyType}
          />
          <TextInput
            style={styles.input}
            placeholder="Sizes (waist, chest, T-shirt/Dress)"
            value={sizes}
            onChangeText={setSizes}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Season/ Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Occasion/Event"
            value={occasion}
            onChangeText={setOccasion}
          />
          <TextInput
            style={styles.input}
            placeholder="Style Preference (Classic? Formal? Vintage? Stree? etc.)"
            value={stylePreference}
            onChangeText={setStylePreference}
          />
          <TextInput
            style={styles.input}
            placeholder="Budget Range"
            value={budget}
            onChangeText={setBudget}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand Preference"
            value={brandPreference}
            onChangeText={setBrandPreference}
          />
          <TextInput
            style={styles.input}
            placeholder="Considerations (Ex: Don't like it too tight)"
            value={Considerations}
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ChatGptResponseModalContent message={responseMessage} />
              <TouchableOpacity
                style={{ ...styles.buttonContainer, marginTop: 10 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
    fontSize: 20, // Increase the font size
    fontWeight: "500", // Adjust the font weight
    borderWidth: 1,
    padding: 10, // Add padding inside the border
    borderRadius: 5, // Optionally, add rounded corners to the border
    backgroundColor: "#fff", // Set the background color, if needed
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
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
});

export default SuggestionScreen;
