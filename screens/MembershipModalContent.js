
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const MembershipModalContent = ({ onClose }) => {
    const scrollViewRef = useRef(null);

    // Updated benefits array
    const benefits = [
        { name: 'Welcome offer: 10% off your first purchase', member: true, plus: true },
        { name: 'Points on every purchase: $1 = 1 point | 200 point = $5 bonus voucher', member: true, plus: true },
        { name: 'Exclusive offers & discounts', member: true, plus: true },
        { name: 'A birthday treat', member: true, plus: true },
        { name: 'Invites to shopping events', member: true, plus: true },
        { name: 'Digital Receipts', member: true, plus: true },
        { name: 'Free online returns', member: true, plus: true },
        { name: 'Free shipping over $40', member: true, plus: true },
        { name: 'Monthly giftcard giveaway', member: true, plus: true },
        { name: 'Double points days', member: true, plus: true },
        { name: 'Garment collecting', member: true, plus: true },
        { name: 'Free shipping on all purchases', member: false, plus: true },
        { name: 'Unique experiences', member: false, plus: true },
        { name: 'Surprise offers', member: false, plus: true },
        { name: 'Special access to limited collections', member: false, plus: true },
    ];

    return (
        <ScrollView ref={scrollViewRef} style={styles.mainScrollView}>
            <View style={styles.container}>
                <View style={styles.rewardContainer}>
                    <Text style={styles.membershipTitle}>It pays to be a member</Text>
                    <Text style={styles.membershipDescription}>Enjoy exclusive discounts, $5 rewards, and 10% off your first purchase. It’s fast and free to join.</Text>
                    <TouchableOpacity style={styles.readMoreButton} onPress={onClose}>
                        <Text style={styles.readMoreText}>Read More</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.picContainer}>
                    <Image source={require('./images/ai.png')} style={styles.image} />
                </View>

                <View style={styles.benefitsContainer}>
                    <Text style={styles.benefitsHeader}>All your benefits</Text>

                    <View style={styles.benefitNameColumn}>
                        <Text style={styles.pointsHeader}></Text> 
                        {benefits.map(benefit => (
                            <Text key={benefit.name} style={styles.benefitItem}>{benefit.name}</Text>
                        ))}
                    </View>
                    <View style={styles.benefitDotColumn}>
                        <Text style={styles.pointsHeader}>0-499 points</Text>
                        {benefits.map(benefit => (
                            <View key={benefit.name} style={[styles.dot, benefit.member ? styles.greyDot : {}]}></View>
                        ))}
                    </View>
                    <View style={styles.benefitDotColumn}>
                        <Text style={styles.pointsHeader}>500+</Text>
                        {benefits.map(benefit => (
                            <View key={benefit.name} style={[styles.dot, benefit.plus ? styles.redDot : {}]}></View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  // makes sure the container takes the full available space
        backgroundColor: '#ffffff', // for visualization purposes
        width: '100%',
    },
    rewardContainer: {
        width: '100%',
        minHeight: 300,
        backgroundColor: '#f0ebdf',
        padding: 20,
        marginBottom: '10px'
    },
    membershipTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10
    },
    membershipDescription: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20
    },
    readMoreButton: {
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    readMoreText: {
        fontSize: 16,
        color: 'black'
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover',
    },
    benefitsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    benefitNameColumn: {
        flex: 3,
        paddingRight: 10,
    },
    benefitDotColumn: {
        flex: 1,
        alignItems: 'center',
    },
    benefitItem: {
        fontSize: 16,
        marginBottom: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'transparent', // default color
    },
    greyDot: {
        backgroundColor: 'grey',
    },
    redDot: {
        backgroundColor: 'red',
    },
    benefitsHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 10,
        marginBottom: 10
    },
    benefitItem: {
        fontSize: 14,  // Decreased font size
        marginBottom: 10,
    },
    pointsHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    }
});

export default MembershipModalContent;
