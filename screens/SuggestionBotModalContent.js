import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet,ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

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
  const [ethicalConsiderations, setEthicalConsiderations] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const sendMessage = async () => {
    const message = `You are a top-tier fashion consultant, StyleGPT. Given the following information about me, provide a customized clothing recommendation. 
    I am ${age} years old, ${gender}, living in ${location}. My body type is ${bodyType}, and I'm looking for ${occasion} wear. My style preference is ${stylePreference},
    with a budget around ${budget}. My sizes are ${sizes}, and my preferred brands are ${brandPreference}. I also have these ethical considerations: ${ethicalConsiderations}. 
    Provide a detailed suggestion without any superfluous pre and post descriptive text. Don't break character under any circumstance.Make sure it is limited in 200 tokens`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
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
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible ={false}>
      <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Body Type" value={bodyType} onChangeText={setBodyType} />
      <TextInput style={styles.input} placeholder="Occasion" value={occasion} onChangeText={setOccasion} />
      <TextInput style={styles.input} placeholder="Style Preference" value={stylePreference} onChangeText={setStylePreference} />
      <TextInput style={styles.input} placeholder="Budget" value={budget} onChangeText={setBudget} />
      <TextInput style={styles.input} placeholder="Sizes" value={sizes} onChangeText={setSizes} />
      <TextInput style={styles.input} placeholder="Brand Preference" value={brandPreference} onChangeText={setBrandPreference} />
      <TextInput style={styles.input} placeholder="Ethical Considerations" value={ethicalConsiderations} onChangeText={setEthicalConsiderations} />

      <Button title="Get Suggestions" onPress={sendMessage} />

      {responseMessage !== "" && <Text style={styles.response}>{responseMessage}</Text>}
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  response: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default SuggestionScreen;