import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PointsHistoryScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Point History</Text>
      <View style={styles.container2}>
        <Text style={styles.text0}>Member</Text>
        <Text style={styles.text1}>0 Points</Text>
        <Text style={styles.text2}>
          Your membership will be renewed on 12/31/2030
        </Text>
      </View>
      <TouchableOpacity
        style={isExpanded ? styles.expandedContainer4 : styles.container4}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={isExpanded ? styles.clickedText : styles.defaultText}>
          POINTS 0
        </Text>
        {isExpanded && (
          <>
            <Text style={styles.purchasedText}>Purchase</Text>
            <Text>
              Every time you shop online in store, you'll earn points. $1.00 = 1
              points
            </Text>
            <Text style={styles.thereMoreText}>And there's more!</Text>
            <Text>
              From time to time, you can earn extra points on your purchases -
              so keep an eye out!
            </Text>
          </>
        )}
      </TouchableOpacity>
      <View style={isExpanded ? styles.expandedContainer3 : styles.container3}>
        <Text style={styles.text3}>You don't have any points yet</Text>
        <Text style={styles.text4}>
          Take a look under Points to find out more.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "#f9f9f9",
    marginTop: 70,
  },
  container2: {
    margin: 10,
    padding: 30,
    alignItems: "center",
  },
  container3: {
    alignItems: "center",
    margin: 10,
    padding: 20,
  },
  container4: {
    backgroundColor: "white",
    width: "80%",
    borderWidth: 1,
    height: 50,
  },
  text0: {
    marginTop: -10,
    fontSize: 22,
  },
  text1: {
    fontSize: 50,
    fontWeight: "700",
  },
  text2: {
    marginTop: 15,
    fontSize: 12,
    textAlign: "center",
    color: "grey",
  },
  text3: {
    fontSize: 18,
    fontWeight: "500",
  },
  text4: {
    fontFamily: "Helvetica",
    fontWeight: "400",
    marginTop: 5,
  },
  defaultText: {
    color: "black",
    textAlign: "center",
    paddingVertical: 15,
    fontWeight: "600",
  },
  clickedText: {
    paddingTop: 60,
    color: "red",
    textAlign: "center",
    paddingVertical: 15,
    marginTop: -60,
    fontWeight: "600",
  },
  expandedContainer4: {
    backgroundColor: "white",
    width: "80%",
    borderWidth: 1,
    minHeight: 200,
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },
  expandedContainer3: {
    alignItems: "center",
    margin: 10,
    padding: 20,
    marginTop: 30,
  },
  purchasedText: {
    fontWeight: "600",
    paddingBottom: 5,
  },
  thereMoreText: {
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: "left",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 30,
    padding: 10,
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: -40,
    padding: 10,
    alignContent: "center",
  },
});

export default PointsHistoryScreen;
