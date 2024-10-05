import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconSelector({ selectedIcon, onSelectIcon }) {
  const icons = [
    { name: "walk-outline", label: "Walk" },
    { name: "book-outline", label: "Read" },
    { name: "brush-outline", label: "Art" },
    { name: "barbell-outline", label: "Fitness" },
    { name: "musical-notes-outline", label: "Music" },
  ];

  return (
    <View style={styles.container}>
      {icons.map((icon) => (
        <TouchableOpacity
          key={icon.name}
          style={[
            styles.iconButton,
            selectedIcon === icon.name ? styles.selectedIcon : null,
          ]}
          onPress={() => onSelectIcon(icon.name)}>
          <Ionicons
            name={icon.name}
            size={30}
            color={selectedIcon === icon.name ? "white" : "#0d6fbf"}
          />
          <Text
            style={[
              styles.label,
              selectedIcon === icon.name && { color: "white" },
            ]}>
            {icon.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    padding: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: "#0d6fbf",
    borderWidth: 1,
    alignItems: "center",
  },
  selectedIcon: {
    backgroundColor: "#0dffbe",
    borderColor: "#0d6fbf",
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: "#0d6fbf",
  },
});

export default IconSelector;
