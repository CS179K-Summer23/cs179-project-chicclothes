
import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  //profile screen css
  mainScrollView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center", // To align items vertically in the center
    justifyContent: "space-between", // To push the items to either end
    width: "100%", // Take the full width of the parent
    paddingHorizontal: 15, // A little bit of padding to avoid touching the screen edges
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  welcomeUser: {
    fontSize: 30,
    fontWeight: "bold",
  },
  rewardContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0ebdf",
    padding: 20,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rewardText: {
    fontSize: 24,
    color: "#000",
    borderBottomWidth: 1,
    borderColor: "black",
    fontWeight: "bold",
  },
  pointsHistory: {
    textDecorationLine: "underline",
    fontSize: 10,
    color: "black",
    marginLeft: 180,
  },
  greyText: {
    color: "grey",
    fontSize: 12,
    marginBottom: 5,
  },
  memberIdButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f0ebdf",
    width: "90%",
    alignSelf: "center",
  },
  memberIdText: {
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
  pointTracer: {
    height: 3,
    width: "100%",
    backgroundColor: "grey",
    marginVertical: 10,
    position: "relative", // To enable absolute positioning of the marks
  },
  redDot: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -5 }],
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },


  offersTitle: {
    alignSelf: "flex-start", // Add this to override the parent's alignItems
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20, // To give some space from the left edge
    marginTop: 20,
    marginBottom: 10,
  },
  offerScrollView: {
    paddingLeft: 20,
  },
  offerCard: {
    width: 160,
    marginRight: 30,
    backgroundColor: "#FFF",
    // padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: "center",
    marginBottom: 30,
  },
  offerImage: {
    width: 160,
    height: 110,
    marginBottom: 10,
    // borderRadius: 10
  },
  offerTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  offerDescription: {
    color: "grey",
    fontSize: 10,
    paddingBottom: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 15, // Add padding to the left and right
    width: "90%", // Set the width to 90%
    justifyContent: "space-between", // Distribute items (icon, text, arrow) equally
    backgroundColor: "#f9f9f9",
    // borderRadius: 5,
    alignSelf: "center", // Center the button within its parent
  },
  optionButtonText: {
    marginLeft: 10,
    flex: 1, // Allow the text to take up available space
    textAlign: "left", // Align text to the left
  },
  modalView: {
    width: "100%",
    height: "100%",
    margin: 0, // remove the margin
    backgroundColor: "white",
    borderRadius: 0, // remove the border radius to take full screen
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 70,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background to act as an overlay
  },
  modalImage: {
    width: 200, // adjust based on your needs
    height: 200, // adjust based on your needs
    marginBottom: 20,
  },
  //profile screen css
});


export default styles;
