import React, { useState, useRef, useEffect } from "react";
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
import HelpUsImproveModalContent from "./HelpUsImproveModalContent";
import MembershipModalContent from "./MembershipModalContent";
import SuggestionScreen from "./SuggestionBotModalContent";
import PaymentMethodModalContent from "./PaymentMethodModalContent";
import OrdersModalsContent from "./OrdersModalsContent";
import ViewMemIdModalContent from "./ViewMemIdModalContent";
import PointsHistoryModalContent from "./PointsHistoryModalContent";

import { auth, db } from "../../configuration/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getUserDataFromFirestore } from "../../hook/databaseQueries";

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const scrollViewRef = useRef(null); //for setting button
  const sectionRef = useRef(null); //for setting range to show when press
  const [userName, setUserName] = useState("User"); // Default to 'User' will update it with the user name :) should be hehe
  const [userPoints, setUserPoints] = useState(0); // Default to 0 will update it with the user points

  const rewardPoint = Math.max(200 - userPoints, 0);
  const silverRewardPoint = Math.max(500 - userPoints, 0);

  const offers = [
    {
      image: require("../images/offer1.png"),
      title: "Up to 25% off select \t       styles",
      description: "      MEMBER PRICES \n Valid until: 12/31/2030 ",
    },
    {
      image: require("../images/offer2.jpg"),
      title: "25% off select jeans",
      description: "\tDENIM DEAL \n Valid until: 12/31/2030 ",
    },
    {
      image: require("../images/offer3.png"),
      title: "Baby Clothes Bundles",
      description: "\tBABY ALIVE \n Valid until: 12/31/2030 ",
    },
    {
      image: require("../images/offer4.jpg"),
      title: "Earn $5 for every $50 \t    you spend",
      description: "BACK-TO-SCHOOL DONATION \n        Valid until: 12/31/2030 ",
    },
    {
      image: require("../images/offer5.jpg"),
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
    const handlePress = () => {
      if (title === "Sign out") {
        navigation.navigate("Login"); // Navigate to Login screen
      } else {
        setActiveModal(title);
        setModalVisible(true);
      }
    };
    return (
      <TouchableOpacity style={styles.optionButton} onPress={handlePress}>
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
        return <ViewMemIdModalContent onclose={() => setModalVisible(false)} />;
      case "Points History":
        return (
          <PointsHistoryModalContent onclose={() => setModalVisible(false)} />
        );
      case "My orders":
        return <OrdersModalsContent onClose={() => setModalVisible(false)} />;
      case "Payments":
        return (
          <PaymentMethodModalContent onClose={() => setModalVisible(false)} />
        );
      case "My points":
        return (
          <PointsHistoryModalContent onclose={() => setModalVisible(false)} />
        );
      case "Membership":
        return (
          <MembershipModalContent onClose={() => setModalVisible(false)} />
        );
      case "Help us Improve":
        return (
          <HelpUsImproveModalContent onClose={() => setModalVisible(false)} />
        );
      case "Suggestion Bot":
        return <SuggestionScreen onClose={() => setModalVisible(false)} />;
      case "Sign out":
        return null;
      default:
        return null;
    }
  };

  const handleSettingsPress = () => {
    sectionRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({ x: 0, y: pageY, animated: true });
    });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;
    let unsubscribe;

    if (uid) {
      const userRef = doc(db, "users", uid);
      unsubscribe = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          setUserName(userData.name || "User");
          setUserPoints(userData.points || 0);
        } else {
          console.log("No such document!");
        }
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const getDotPosition = (points, maxPoints, tracerWidth) => {
    let position = (points / maxPoints) * tracerWidth;
    return Math.min(position, tracerWidth);
  };
  const dotPosition = getDotPosition(userPoints, 500, 350);

  return (
    <ScrollView ref={scrollViewRef} style={styles.mainScrollView}>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeUser}>Hi {userName}!</Text>
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
            <Text style={styles.rewardText}>{userPoints} points</Text>
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
            <View style={[styles.redLine, { width: dotPosition }]}></View>
            <View style={[styles.redDot, { left: dotPosition - 5 }]}></View>
          </View>
          <Text style={styles.greyText}>
            You're {rewardPoint} points away from your next reward and{" "}
            {silverRewardPoint} points are needed to become a Silver Member.
            Vouchers are issued 30 days after purchased.
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
                style={{ position: "absolute", top: 30, left: 10, zIndex: 10 }}
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
