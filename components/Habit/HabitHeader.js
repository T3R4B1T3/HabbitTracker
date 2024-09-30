import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function HabitHeader({ title, onClose }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 18,
    color: "#6200ee",
  },
});

export default HabitHeader;
