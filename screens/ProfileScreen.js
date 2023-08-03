import React, { useState,useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeModal, setActiveModal] = useState('');
    const scrollViewRef = useRef(null); //for setting button
    const sectionRef = useRef(null); //for setting range to show when press




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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name={icon} size={24} color="black" />
                        <Text style={styles.optionButtonText}>{title}</Text>
                    </View>
                    <AntDesign name="right" size={20} color="grey" />
                </View>
            </TouchableOpacity>
        );
    }
    

    const renderModalContent = () => {
        switch (activeModal) {
            case 'View Member ID':
                return (
                <>
                    <Image source={require('./images/qrcode.png')} style={styles.modalImage} />
                    <Text style={styles.modalText}>Your QRCODE details go here.</Text>
                </>
            );
            case 'My orders':
                return <Text style={styles.modalText}>Your orders list goes here.</Text>;
            case 'Payments':
                return <Text style={styles.modalText}>Your payment details go here.</Text>;
            case 'Account Settings':
                return <Text style={styles.modalText}>Your account settings go here.</Text>;
            case 'My points':
                return <Text style={styles.modalText}>Your points summary goes here.</Text>;
            case 'Membership':
                return <Text style={styles.modalText}>Your membership details go here.</Text>;
            default:
                return null;
        }
    };

    const handleSettingsPress = () => {
        sectionRef.current.measure((x, y, width, height, pageX, pageY) => {
            scrollViewRef.current?.scrollTo({ x: 0, y: pageY, animated: true });
        });
    }
    
    

    return (
        <ScrollView ref={scrollViewRef} style={styles.mainScrollView}>
            <View style={styles.container}>
                
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeUser}>Hi User!</Text>
                <TouchableOpacity onPress={handleSettingsPress}>
                    <AntDesign name="setting" size={35} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.rewardContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.rewardText}>0 points</Text>
                    <Button
                    title="points history"
                    onPress={() => { /* your function to show modal */ }}
                    color="black" // Set button text color to black
                    />
                </View>
                <View style={styles.pointTracer}></View>
                <Text style={styles.greyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                <TouchableOpacity style={styles.memberIdButton} onPress={() => { setActiveModal('View Member ID'); setModalVisible(true); }}>
                    <AntDesign name="qrcode" size={20} color="black" />
                    <Text style={{ color: 'black', marginLeft: 10 }}>View Member ID</Text>
                </TouchableOpacity>
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
                <View ref={sectionRef}>
                {options.map(option => <OptionButton key={option.title} title={option.title} icon={option.icon} />)}
                </View>

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
                        {renderModalContent()}
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
        paddingBottom: 20,
        backgroundColor: '#ffffff',
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center', // To align items vertically in the center
        justifyContent: 'space-between', // To push the items to either end
        width: '100%', // Take the full width of the parent
        paddingHorizontal: 15, // A little bit of padding to avoid touching the screen edges
        paddingTop:15,
        paddingBottom:10,
        backgroundColor: '#ffffff',
    },
    welcomeUser: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    rewardContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0ebdf',
        padding: 20,
        //borderRadius: 5,
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rewardText: {
        fontSize: 24,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    greyText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 5,
    },
    memberIdButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f0ebdf',
        width: '80%',
        alignSelf: 'center'
    },
    pointTracer: {
        height: 3,
        width: '100%',
        backgroundColor: 'grey',
        marginVertical: 10, // Spacing above and below the line
        // Add other styles for the point tracker marks if needed
    },
    offersTitle: {
        alignSelf: 'flex-start', // Add this to override the parent's alignItems
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,  // To give some space from the left edge
        marginTop: 20,
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
        paddingHorizontal: 15,   // Add padding to the left and right
        width: '90%',            // Set the width to 90%
        justifyContent: 'space-between',  // Distribute items (icon, text, arrow) equally
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        alignSelf: 'center'  // Center the button within its parent
    },
    optionButtonText: {
        marginLeft: 10,
        flex: 1,  // Allow the text to take up available space
        textAlign: 'left'  // Align text to the left
    },
    modalView: {
    width: '80%', // Use 80% of the screen width
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
    shadowRadius: 3.84,
    elevation: 5
},
modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16
},
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background to act as an overlay
},
 modalImage: {
        width: 200,  // adjust based on your needs
        height: 200, // adjust based on your needs
        marginBottom: 20,
    },


});

export default ProfileScreen;
