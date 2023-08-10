import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatGptResponseModalContent = ({ message }) => {
    return (
        <View>
            <Text>{message}</Text>
        </View>
    );
}

export default ChatGptResponseModalContent;
