import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const UserInformation = ({ isVisible, onClose }) => {


    // will have to save the current on in the data base 
    // gotta read that and output it to the myinformation real time 
    // Zzzz 




  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Text>User information edit goes here kljasdflkasdjflkasdjf more stuff to add Zzzz.</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default UserInformation;
