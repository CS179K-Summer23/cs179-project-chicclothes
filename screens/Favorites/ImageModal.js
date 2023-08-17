import React from "react";
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ImageModal = ({ isVisible, imageUrl, onClose }) => {
  return (
    <Modal
      animation="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.arrow} onPress={onClose}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>
        <Image source={{ uri: imageUrl }} style={styles.fullScreenImage} />
        <View style={styles.buttonContainer}></View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrow: {
    position: "absolute",
    top: 70,
    left: 10,
    zIndex: 10,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#FFF",
  },
});

export default ImageModal;
