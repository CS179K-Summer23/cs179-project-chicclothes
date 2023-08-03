import React, { useState,useRef } from 'react';
import { View, Text, StyleSheet, Modal, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeModal, setActiveModal] = useState('');
    const scrollViewRef = useRef(null); //for setting button
    const sectionRef = useRef(null); //for setting range to show when press
    const [pointsModalVisible, setPointsModalVisible] = useState(false); //points history



    const offers = [
        { image: require('./images/offer1.png'), title: "Up to 25% off select \t       styles", description: "      MEMBER PRICES \n Valid until: 12/31/2030 " },
        { image: require('./images/offer2.jpg'), title: "25% off select jeans", description: "\tDENIM DEAL \n Valid until: 12/31/2030 " },
        { image: require('./images/offer3.png'), title: "Baby Clothes Bundles", description: "\tBABY ALIVE \n Valid until: 12/31/2030 " },
        { image: require('./images/offer4.jpg'), title: "Earn $5 for every $50 \t    you spend", description: "BACK-TO-SCHOOL DONATION \n        Valid until: 12/31/2030 " },
        { image: require('./images/offer5.jpg'), title: "20% off Clique Closet \t\tSport", description: "  DO SOME EXERCISE! \n Valid until: 12/31/2030 " },
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
                <TouchableOpacity onPress={() => setPointsModalVisible(true)}>
                    <Text style={styles.pointsHistory}>points history</Text>
                </TouchableOpacity>
             </View>
            <View style={styles.pointTracer}>
                <View style={styles.redDot}></View>
            </View> 
                <Text style={styles.greyText}>You're 200 points away from your next reward and 500 points are needed to become a Silver Member. Vouchers are issued 30 days after purchased.</Text>
                    <TouchableOpacity style={styles.memberIdButton} onPress={() => { setActiveModal('View Member ID'); setModalVisible(true); }}>
                        <AntDesign name="qrcode" size={25} color="black" />
                        <Text style={styles.memberIdText}>View Member ID</Text>
                    </TouchableOpacity>
                {/* Modal for points history */}
                <Modal
                animationType="slide"
                transparent={true}
                visible={pointsModalVisible}
                onRequestClose={() => setPointsModalVisible(false)}
                >
                <View style={styles.centeredView}>
                     <View style={styles.modalView}>
                        <Text style={styles.modalText}>Points History</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setPointsModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
        height: 250,
        backgroundColor: '#f0ebdf',
        padding: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    rewardText: {
        fontSize: 24,
        color: '#000',
        borderBottomWidth: 1,
        borderColor: 'black',
        fontWeight: 'bold',
    },
    pointsHistory: {
        textDecorationLine: 'underline',
        fontSize: 10,
        color: 'black',
        marginLeft: 180,

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
        width: '90%',
        alignSelf: 'center'
    },
    memberIdText: {
        color: 'black',
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    pointTracer: {
        height: 3,
        width: '100%',
        backgroundColor: 'grey',
        marginVertical: 10,
        position: 'relative', // To enable absolute positioning of the marks
    },
    redDot: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: [{ translateY: -5 }],
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
   
    offersTitle: {
        alignSelf: 'flex-start', // Add this to override the parent's alignItems
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,  // To give some space from the left edge
        marginTop: 20,
        marginBottom:10,
    },
    offerScrollView: {
        paddingLeft: 20,
    },
    offerCard: {
        width: 160,
        marginRight: 30,
        backgroundColor: '#FFF',
        // padding: 10,
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
        width: 160,
        height: 110,
        marginBottom: 10,
        // borderRadius: 10
    },
    offerTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    offerDescription: {
        color: 'grey',
        fontSize: 10,
        paddingBottom: 10,
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
