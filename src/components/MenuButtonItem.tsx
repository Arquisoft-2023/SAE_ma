import React from "react";
import { StyleSheet, Text, Touchable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MenuButtonItem = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MenuButtonItem;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15
  },
  text: {
    marginStart: 7,
    color: "white",
    fontWeight: "bold"
  }
});
