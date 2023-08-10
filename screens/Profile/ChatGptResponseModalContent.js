import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, } from "react-native";

const ChatGptResponseModalContent = ({ message, setModalVisible }) => {
 
  return (
    
    <ScrollView style={styles.mainContainer}>
      <Image source={require("../images/robot.png")} style={styles.image} />
      <Text style={styles.entryText}>Our Bot Suggests: </Text>
      <View style={styles.container}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <TouchableOpacity
        style={{ ...styles.buttonContainer, marginTop: 10 }}
        onPress={() => setModalVisible((prev) => !prev)}
      >
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f0ebdf",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "400",
  },
  entryText: {
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: "500",
    marginBottom: 10,
  },
  image: {
    marginTop: 10,
    width: 350,
    height: 300,
    resizeMode: "contain",
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
});

export default ChatGptResponseModalContent;
