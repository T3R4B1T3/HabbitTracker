import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const HabitItem = ({
  habit,
  checkedHabits,
  handleCheckboxToggle,
  handleHabitPress,
  handleDeleteHabit,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.habitContainer,
        habit.completed && { backgroundColor: "#d3d3d3" },
      ]}
      onPress={() => handleHabitPress(habit)}
      activeOpacity={habit.completed ? 1 : 0.7}>
      <View style={styles.habitRow}>
        <Ionicons name={habit.icon} size={24} color="#0d6fbf" />
        <Text style={styles.habitText}>{habit.name || "Unnamed Habit"}</Text>
      </View>
      <Text style={styles.stepsText}>
        {habit.stepsCompleted}/{habit.totalSteps || 0}
      </Text>
      <View style={styles.progressRow}>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={
              habit.totalSteps > 0 ? habit.stepsCompleted / habit.totalSteps : 0
            }
            width={null}
            height={10}
            color="#0dffbe"
            unfilledColor="#0d6fbf"
            borderWidth={0}
            borderRadius={5}
          />
        </View>
        <TouchableOpacity onPress={() => handleCheckboxToggle(habit.id)}>
          <Ionicons
            name={checkedHabits[habit.id] ? "checkbox" : "square-outline"}
            size={24}
            color={checkedHabits[habit.id] ? "#0dffbe" : "#999"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteHabit(habit.id)}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  habitContainer: {
    backgroundColor: "#e6f3ff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    elevation: 2,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: "#0d6fbf"
  },
  stepsText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
    color: "#0d6fbf"
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default HabitItem;
