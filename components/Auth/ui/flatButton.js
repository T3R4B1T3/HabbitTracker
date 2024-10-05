import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function FlatButton({ onPress, children }) {
  return (
    <TouchableOpacity style={styles.flatButton} onPress={onPress}>
      <Text style={styles.flatButtonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flatButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  flatButtonText: {
    color: "#0dffbe",
    fontSize: 16,
  },
});

export default FlatButton;
