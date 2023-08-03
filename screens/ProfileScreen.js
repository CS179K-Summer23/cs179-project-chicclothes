import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeModal, setActiveModal] = useState('');

    const offers = [
        { image: require('./images/offer1.png'), title: "Up to 25% off select styles", description: "MEMBER PRICES \n Valid until: 12/31/2030 11:59 pm" },
        { image: require('./images/offer2.jpg'), title: "25% off select jeans", description: "DENIM DEAL \n Valid until: 12/31/2030 11:59 pm" },
        { image: require('./images/offer3.png'), title: "Baby Clothes Bundles", description: "BABY ALIVE \n Valid until: 12/31/2030 11:59 pm" },
        { image: require('./images/offer4.jpg'), title: "Earn $5 for every $50 you spend", description: "BACK-TO-SCHOOL DONATION \n Valid until: 12/31/2030 11:59 pm" },
        { image: require('./images/offer5.jpg'), title: "20% off ChicCloset Sport", description: "DO SOME EXERCISE! \n Valid until: 12/31/2030 11:59 pm" },
    ];

    const options = [
        { title: 'My orders', icon: 'shoppingcart' },
        { title: 'Payments', icon: 'creditcard' },
        { title: 'Account Settings', icon: 'setting' },
        { title: 'My points', icon: 'star' },
        { title: 'Membership', icon: 'idcard' },
        { title: 'Help us Improve', icon: 'heart' },
        { title: 'Sign out', icon: 'logout' }
    ];

    const OptionButton = ({ title, icon }) => {
        return (
            <TouchableOpacity style={styles.optionButton} onPress={() => { setActiveModal(title); setModalVisible(true); }}>
                <AntDesign name={icon} size={24} color="black" />
                <Text style={styles.optionButtonText}>{title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView style={styles.mainScrollView}>
            <View style={styles.container}>

                <View style={styles.rewardContainer}>
                    <Text style={styles.rewardText}>0 points</Text>
                    <View style={styles.pointTracer}></View>
                    <Button title="View Member ID" onPress={() => setModalVisible(true)} style={styles.memberIdButton} />
                </View>

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

                {options.map(option => <OptionButton key={option.title} title={option.title} icon={option.icon} />)}

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
                            <Text style={styles.modalText}>This is the {activeModal} modal.</Text>
                            <Button
                                title="Close"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainScrollView: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 20
    },
    rewardContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0ebdf',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rewardText: {
        fontSize: 24,
        color: '#000',
        alignSelf: 'flex-start'  // To align the "0 points" text to the left
    },
    memberIdButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center'
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
        width: 160,
        marginRight: 20,
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
        alignItems: 'center',
    },
    offerImage: {
        width: 140,
        height: 100,
        marginBottom: 10,
        borderRadius: 10
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f2f2f2'
    },
    optionButtonText: {
        marginLeft: 10
    },
});

export default ProfileScreen;
