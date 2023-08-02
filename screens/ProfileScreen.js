import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, ScrollView } from 'react-native';

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const offers = [
        { image: require('./images/offer1.png'), title: "Title 1", description: "Description 1" },
        { image: require('./images/offer2.jpg'), title: "Title 2", description: "Description 2" },
        { image: require('./images/offer3.png'), title: "Title 3", description: "Description 3" },
        { image: require('./images/offer4.jpg'), title: "Title 4", description: "Description 4" },
        { image: require('./images/offer5.jpg'), title: "Title 5", description: "Description 5" },
    ];

    return (
        <View style={styles.container}>

            {/* Reward Point System Container */}
            <View style={styles.rewardContainer}>
                <Text style={styles.rewardText}>0 points</Text>
                <View style={styles.pointTracer}></View>
                 {/* Button to Show the Modal */}
            <Button title="View Member ID" onPress={() => setModalVisible(true)} />
            </View>
            
           

            {/* Modal Design */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Member ID: ##</Text>
                        <Image source={require('./images/qrcode.png')} style={styles.qrImage} />
                        <Button 
                            title="Close"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>

            <Text style={styles.offersTitle}>My Offers</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.offerScrollView}>
        {offers.map((offer, index) => (
            <View key={index} style={styles.offerCard}>
                <Image source={offer.image} style={styles.offerImage} />
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
        ))}
    </ScrollView>

            


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingTop: 5
    },
    rewardContainer: {
        width: '100%', // 100% of its parent container's width
        height: 200,    
        backgroundColor: '#f0ebdf', // light brown
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center', // to center the text inside the container
        justifyContent: 'center'
    },
    rewardText: {
        fontSize: 24,
        color: '#000',
    },
    pointTracer: {
        height: 2,
        backgroundColor: '#000',
        marginTop: 10,
        marginBottom: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '80%',
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
        textAlign: "center",
        fontSize: 18
    },
    qrImage: {
        width: 150,
        height: 150,
        marginVertical: 20
    },
    offersTitle: {
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'left',

    },
    offerScrollView: {
        paddingLeft: 20,
    },
    offerCard: {
        width: 200, 
        length: 20,
        marginRight: 20, 
        // borderRadius: 10, 
        backgroundColor: '#FFF', 
        padding: 10, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        alignItems: 'center',  // To ensure that content inside the card is centered
    },
    offerImage: {
        width: 180, 
        height: 120, 
        marginBottom: 10, 
        borderRadius: 10
    },
    offerTitle: {
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center'  // This will center-align the title
    },
    offerDescription: {
        fontSize: 14,
        textAlign: 'center'  // This will center-align the description
    }
});

export default ProfileScreen;

