import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const MemberIDScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member ID</Text>
      <Image source={require("../images/qrcode.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff",
    height: "100%",
  },
  image: {
    width: "85%",
    height: "55%",
    marginBottom: 100,
  },
});

export default MemberIDScreen;
