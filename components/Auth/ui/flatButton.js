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
    borderColor: "#dd6e42",
    borderWidth: 2,
  },
  flatButtonText: {
    color: "#dd6e42",
    fontSize: 16,
  },
});

export default FlatButton;
