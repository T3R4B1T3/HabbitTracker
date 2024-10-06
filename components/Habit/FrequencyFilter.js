import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const FrequencyFilter = ({ filterOption, setFilterOption }) => (
  <View style={styles.filterContainer}>
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterOption === "daily" && styles.activeFilter,
      ]}
      onPress={() => setFilterOption("daily")}>
      <Text
        style={[
          styles.filterText,
          filterOption === "daily" ? styles.activeText : styles.inactiveText,
        ]}>
        Daily
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterOption === "weekly" && styles.activeFilter,
      ]}
      onPress={() => setFilterOption("weekly")}>
      <Text
        style={[
          styles.filterText,
          filterOption === "weekly" ? styles.activeText : styles.inactiveText,
        ]}>
        Weekly
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterOption === "monthly" && styles.activeFilter,
      ]}
      onPress={() => setFilterOption("monthly")}>
      <Text
        style={[
          styles.filterText,
          filterOption === "monthly" ? styles.activeText : styles.inactiveText,
        ]}>
        Monthly
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 25,
    elevation: 2,
    maxWidth: "100%"
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#4f6d7a",
    elevation: 1,
  },
  activeFilter: {
    backgroundColor: "#dd6e42",
    elevation: 4,
  },
  filterText: {
    fontSize: 16,
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "white",
  },
});

export default FrequencyFilter;
