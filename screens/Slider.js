import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { COLORS } from '../constants';
import { SliderBox } from 'react-native-image-slider-box';

const Slider = () => {
    const pictures = [
        require('../assets/clothes/pants1.png'),
        require('../assets/clothes/shirt1.png'),
        require('../assets/clothes/pants2.jpeg'),
        require('../assets/clothes/shirt2.png')
        // "./assets/clothes/pants1.png",
        // "./assets/clothes/pants2.jpeg",
        // "./assets/clothes/shirt1.png",
        // "./assets/clothes/shirt2.png",
    ]

    return (
        <View style = {styles.sliderContainer}>
            <SliderBox 
                images = {pictures} 
                inactiveDotColor = {COLORS.secondary}
                ImageComponentStyle = {{borderRadius: 15, width: '90%', marginTop: 15}}
                autoplay
                circleLoop
                />
        </View>
    );
}

export default Slider

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        alignItems: 'center'
    }
})