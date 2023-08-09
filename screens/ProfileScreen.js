import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./stylesheets";
import HelpUsImproveModalContent from './HelpUsImproveModalContent';
import MembershipModalContent from './MembershipModalContent';
import SuggestionScreen from "./SuggestionBotModalContent";
import PaymentMethodModalContent from "./PaymentMethodModalContent";
import OrdersModalsContent from "./OrdersModalsContent";


const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const scrollViewRef = useRef(null); //for setting button
  const sectionRef = useRef(null); //for setting range to show when press


  const offers = [
    {
      image: require("./images/offer1.png"),
      title: "Up to 25% off select \t       styles",
      description: "      MEMBER PRICES \n Valid until: 12/31/2030 ",
    },
    {
      image: require("./images/offer2.jpg"),
      title: "25% off select jeans",
      description: "\tDENIM DEAL \n Valid until: 12/31/2030 ",
    },
    {
      image: require("./images/offer3.png"),
      title: "Baby Clothes Bundles",
      description: "\tBABY ALIVE \n Valid until: 12/31/2030 ",
    },
    {
      image: require("./images/offer4.jpg"),
      title: "Earn $5 for every $50 \t    you spend",
      description: "BACK-TO-SCHOOL DONATION \n        Valid until: 12/31/2030 ",
    },
    {
      image: require("./images/offer5.jpg"),
      title: "20% off Clique Closet \t\tSport",
      description: "  DO SOME EXERCISE! \n Valid until: 12/31/2030 ",
    },
  ];


  const options = [
    { title: "My orders", icon: "shoppingcart" },
    { title: "Payments", icon: "creditcard" },
    { title: "My points", icon: "star" },
    { title: "Membership", icon: "idcard" },
    { title: "Help us Improve", icon: "heart" },
    { title: "Sign out", icon: "logout" },
    { title: "Suggestion Bot", icon: "bulb1" },
  ];


  const OptionButton = ({ title, icon }) => {
    return (
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
          setActiveModal(title);
          setModalVisible(true);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name={icon} size={24} color="black" />
            <Text style={styles.optionButtonText}>{title}</Text>
          </View>
          <AntDesign name="right" size={20} color="grey" />
        </View>
      </TouchableOpacity>
    );
  };


  const renderModalContent = () => {
    switch (activeModal) {
      case "View Member ID":
        return (
          <>
            <Image
              source={require("./images/qrcode.png")}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}></Text>
          </>
        );
        case 'Points History':
          return <>
          <Text style={styles.modalText}>POINT HISTROYYYYY</Text>
      </>
      case 'My orders':
          return <OrdersModalsContent onClose = {() => setModalVisible(false)} />
      case 'Payments':
          return <PaymentMethodModalContent onClose={() => setModalVisible(false)} />;
      case 'My points':
          return <Text style={styles.modalText}>Your points summary goes here.</Text>;
      case 'Membership':
          return <MembershipModalContent onClose={() => setModalVisible(false)} />;
      case 'Help us Improve':
          return <HelpUsImproveModalContent onClose={() => setModalVisible(false)} />;
      case 'Sign out':
          return null; // ned to implement this method
      case 'Suggestion Bot':
          return <SuggestionScreen onClose={() => setModalVisible(false)} />;
      default:
          return null;
  }
  };


  const handleSettingsPress = () => {
    sectionRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({ x: 0, y: pageY, animated: true });
    });
  };


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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.rewardText}>0 points</Text>
            <TouchableOpacity
              onPress={() => {
                setActiveModal("Points History");
                setModalVisible(true);
              }}
            >
              <Text style={styles.pointsHistory}>points history</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pointTracer}>
            <View style={styles.redDot}></View>
          </View>
          <Text style={styles.greyText}>
            You're 200 points away from your next reward and 500 points are
            needed to become a Silver Member. Vouchers are issued 30 days after
            purchased.
          </Text>
          <TouchableOpacity
            style={styles.memberIdButton}
            onPress={() => {
              setActiveModal("View Member ID");
              setModalVisible(true);
            }}
          >
            <AntDesign name="qrcode" size={25} color="black" />
            <Text style={styles.memberIdText}>View Member ID</Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.offersTitle}>My Offers</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.offerScrollView}
        >
          {offers.map((offer, index) => (
            <View key={index} style={styles.offerCard}>
              <Image source={offer.image} style={styles.offerImage} />
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
          ))}
        </ScrollView>
        <View ref={sectionRef}>
          {options.map((option) => (
            <OptionButton
              key={option.title}
              title={option.title}
              icon={option.icon}
            />
          ))}
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{ position: "absolute", top: 30, left: 10 }}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="arrowleft" size={40} color="black" />
              </TouchableOpacity>
              {renderModalContent()}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};


export default ProfileScreen;


