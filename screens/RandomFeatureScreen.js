import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

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

  // Function to handle when a user sends a message
  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    // Send user's message to the GPT-3 model and get the model's response
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      "prompt": newMessages[0].text,
      "max_tokens": 60
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      }
    })
    .then(response => {
      // Append the GPT-3 model's response to the message list
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: previousMessages.length + 1,
        text: response.data.choices[0].text.trim(),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatGPT',
        },
      }))
    })
    .catch(error => {
      console.error(error);
    });
  }

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
