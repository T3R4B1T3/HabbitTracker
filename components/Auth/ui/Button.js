import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({ onPress, children }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dd6e42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#eaeaea",
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default Button;
