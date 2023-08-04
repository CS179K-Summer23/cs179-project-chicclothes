import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const HelpUsImproveModalContent = ({ onClose }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);
    const maxCharCount = 1024;

    const handleTextChange = (text) => {
        if (text.length <= maxCharCount) {
            setFeedback(text);
        }
    }

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <AntDesign 
                    key={i}
                    name={i <= rating ? "star" : "staro"} 
                    size={24} 
                    color="black"
                    onPress={() => setRating(i)} 
                />
            );
        }
        return stars;
    }

    if (showThankYou) {
        return (
            <>
                <Text>Thank you for your feedback!</Text>
                <Button title="Done" onPress={onClose} />
            </>
        );
    }

    return (
        <TouchableWithoutFeedback onPress ={Keyboard.dismiss}>
        <>
            
            <Image source={require('./images/improve.jpg')} style={styles.image} />
            <Text>Rate your app experience</Text>
            <View style={{ flexDirection: 'row' }}>
                {renderStars()}
            </View>
            <Text>Please share your feedback for us to improve the app or website experience</Text>
            <TextInput 
                multiline={true}
                maxLength={maxCharCount}
                numberOfLines={4}
                onChangeText={handleTextChange}
                value={feedback}
                style={{ width: '80%', height: 100, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
            />
            <Text style={styles.charCounter}>{feedback.length}/{maxCharCount}</Text>
            <Button 
                title="Submit" 
                onPress={() => setShowThankYou(true)}
                disabled={feedback.length === 0}
            />
        </>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    image: {
        width: '100%',  // 100% of its parent's width
        height: 200,    // An arbitrary height, adjust as needed
        resizeMode: 'cover',
    },
    charCounter: {
        alignSelf: 'flex-end',
        marginRight: '10%',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 12,
        color: 'gray'
    }
});

export default HelpUsImproveModalContent;
