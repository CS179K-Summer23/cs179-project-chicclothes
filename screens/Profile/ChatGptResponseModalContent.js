import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";

const ChatGptResponseModalContent = ({ message }) => {
    return (
        <View style={styles.mainContainer}>
            
            <Text style={styles.entryText}>Our Bot Suggests: </Text>
        <View style={styles.container}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,               // Border width around the container
        borderColor: 'black',         // Border color
        padding: 10,                  // Padding inside the border
        borderRadius: 5,              // Optionally, add rounded corners to the border
    },
    messageText: {
        fontSize: 16,                 // Font size of the text
        fontFamily: 'Arial',          // You can set a specific font family here
        fontWeight: '500', 
    },

});


export default ChatGptResponseModalContent;
