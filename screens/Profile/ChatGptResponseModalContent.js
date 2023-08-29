import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ChatGptResponseModalContent = ({ message, setModalVisible,suitableProductsList,handleProductSelect }) => {
const [productModalVisible, setProductModalVisible] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const BASE_URL = "https://";

return (
  <ScrollView style={styles.mainContainer}>
    <Image source={require("../images/robot.png")} style={styles.image} />
    <Text style={styles.entryText}>Our Bot Suggests: </Text>
    <View style={styles.container}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
    <View style={styles.productsContainer}>
      {suitableProductsList.slice(0, 4).map((product) => (
        <View key={product.id} style={styles.product}>
          <TouchableOpacity
            key={product.id}
            onPress={() => {
              setSelectedProduct(product);
              setProductModalVisible(true);
          }}
          >
            <Image
              source={{ uri: `${BASE_URL}${product.imageUrl}` }}
              style={styles.productImage}
            />
            <Text>{product.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    <TouchableOpacity
      style={{ ...styles.buttonContainer, marginTop: 10 }}
      onPress={() => setModalVisible((prev) => !prev)}
    >
      <Text style={styles.buttonText}>Close</Text>
    </TouchableOpacity>
    <Modal
    animationType="slide"
    transparent={true}
    visible={productModalVisible}
    onRequestClose={() => {
        setProductModalVisible(false);
        setSelectedProduct(null);
    }}
>
<View style={styles.centeredView}>
        <View style={styles.modalView}>
        <AntDesign
                  name="arrowleft"
                  size={30}
                  color="black"
                  position="absolute"
                  left={10}
                  onPress={() => setProductModalVisible(false)}
                />
            {selectedProduct && (
                <>
                    <Image
                        source={{ uri: `${BASE_URL}${selectedProduct.imageUrl}` }}
                        style={styles.productImage}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedProduct.name}</Text>
                    <Text style={{ fontSize: 18, color: 'gray' }}>{selectedProduct.price}</Text>
                </>
            )}

            <TouchableOpacity
                style={{ ...styles.buttonContainer, marginTop: 10 }}
                onPress={() => setProductModalVisible(false)}
            >
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>
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
    width: 200,  
    height: 200, 
    resizeMode: "contain"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
modalText: {
    marginBottom: 15,
    textAlign: "center"
}
});

export default ChatGptResponseModalContent;
