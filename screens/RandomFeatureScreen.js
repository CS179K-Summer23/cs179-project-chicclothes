import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';


const RandomFeatureScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! Ask me anything!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatGPT',
        },
      },
    ])
  }, [])

  

  return (
    <View style={styles.container}>
      <GiftedChat messages={messages} onSend={newMessages => onSend(newMessages)} user={{ _id: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default RandomFeatureScreen;
