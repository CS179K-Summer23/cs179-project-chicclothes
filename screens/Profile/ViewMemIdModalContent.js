import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MemberIDScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to MemberIDScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});

export default MemberIDScreen;
