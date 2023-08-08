import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet,ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

const SwipeMeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to SwipeMeScreen</Text>
        </View>
    );
}

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

export default SwipeMeScreen;
