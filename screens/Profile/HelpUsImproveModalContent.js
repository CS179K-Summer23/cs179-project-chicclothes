import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HelpUsImproveModalContent = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const maxCharCount = 1024;

  const handleTextChange = (text) => {
    if (text.length <= maxCharCount) {
      setFeedback(text);
    }
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={30}
          color="black"
          onPress={() => setRating(i)}
        />
      );
    }
    return stars;
  };

  if (showThankYou) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.thankYou}> Thank you for your feedback!</Text>
        <View style={styles.Done}>
          <Button color="black" title="Done" onPress={onClose} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={20}
      enabled
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.title}>Help us Improve</Text>
          <View style={{ height: 150, overflow: "hidden" }}>
            <Image
              source={require("../images/improve.jpg")}
              style={[styles.image]} 
            />
          </View>
          <View style={styles.centeredContent}>
            <Text style={styles.rateText}>Rate your app experience</Text>
            <View style={styles.starsDesign}>{renderStars()}</View>
            <Text style={styles.description}>
              Please share your feedback for us to improve the app or website
              experience
            </Text>
            <TextInput
              multiline={true}
              maxLength={maxCharCount}
              numberOfLines={4}
              onChangeText={handleTextChange}
              value={feedback}
              style={{
                width: "80%",
                height: 120,
                borderColor: "#000000",
                backgroundColor: "white",
                borderWidth: 1,
                marginTop: 10,
              }}
            />
          </View>
          <Text style={styles.charCounter}>
            {feedback.length}/{maxCharCount}
          </Text>

          <View style={styles.submitButtonContainer}>
            <Button
              title="Submit"
              onPress={() => setShowThankYou(true)}
              disabled={feedback.length === 0}
              color="#272727"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#6d6d6d",
  },
  image: {
    width: "100%", // 100% of its parent's width
    height: 220, // An arbitrary height, adjust as needed
    resizeMode: "cover",
    marginBottom: 10,
  },
  rateText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  starsDesign: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  description: {
    width: "80%",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "400",
  },

  charCounter: {
    alignSelf: "flex-end",
    marginRight: "10%",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 12,
    color: "gray",
  },
  submitButtonContainer: {}, // debating, i looks good without a border hmmmm

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thankYou: {
    fontSize: 18,
    marginBottom: 50,
  },
  Done: {
    marginBottom: 200,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    padding: 10,
    textAlign: "center",
  },
  centeredContent: {
    alignItems: "center",
  },
});

export default HelpUsImproveModalContent;
