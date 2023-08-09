import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const MembershipModalContent = ({ onClose }) => {
  const scrollViewRef = useRef(null);
  const sectionRef = useRef(null);

  // Updated benefits array
  const benefits = [
    "Welcome offer: 10% off your first purchase",
    "Points on every purchase: $1 = 1 point | 200 point = $5 bonus voucher",
    "Exclusive offers & discounts",
    "A birthday treat",
    "Invites to shopping events",
    "Digital Receipts",
    "Free online returns",
    "Free shipping over $40",
    "Monthly giftcard giveaway",
    "Double points days",
    "Garment collecting",
    "Free shipping on all purchases",
    "Unique experiences",
    "Surprise offers",
    "Special access to limited collections",
  ];

  const handleSettingsPress = () => {
    sectionRef.current.measure((x, y, width, height, pageX, pageY) => {
      scrollViewRef.current?.scrollTo({ x: 0, y: pageY, animated: true });
    });
  };

  return (
    <View>
      <Text style={styles.title}>Membership</Text>
      <View style={styles.centeredView}>
        <ScrollView ref={scrollViewRef} style={styles.mainScrollView}>
          <View style={styles.container}>
            <View style={styles.rewardContainer}>
              <Text style={styles.membershipTitle}>It pays to be a member</Text>
              <Text style={styles.membershipDescription}>
                Enjoy exclusive discounts, $5 rewards, and 10% off your first
                purchase. It’s fast and free to join.
              </Text>
              <TouchableOpacity
                style={styles.readMoreButton}
                onPress={handleSettingsPress}
              >
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.picContainer}>
              <Image
                source={require("../images/ai.png")}
                style={styles.image}
              />
            </View>
            <View ref={sectionRef}>
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsHeader}>All your benefits</Text>

                {benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitRow}>
                    <AntDesign name="gift" size={25} color="#000" />
                    <Text style={styles.benefitItem}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  mainScrollView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0ebdf",
    width: "100%",
  },
  rewardContainer: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "#f0ebdf",
    padding: 20,
    marginBottom: 10,
  },
  membershipTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
    marginTop: 25,
  },
  membershipDescription: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
  },
  readMoreButton: {
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  readMoreText: {
    fontSize: 16,
    color: "black",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  benefitsContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#f0ebdf",
  },
  benefitsHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 5,
  },
  benefitItem: {
    marginLeft: 10,
    //fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 30,
    padding :10,
  },
});

export default MembershipModalContent;
