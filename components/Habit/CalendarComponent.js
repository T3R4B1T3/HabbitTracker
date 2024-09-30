import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
  const startWeek = startOfWeek(selectedDate);
  const endWeek = endOfWeek(selectedDate);

  const daysOfWeek = [];
  for (let day = startWeek; day <= endWeek; day = addDays(day, 1)) {
    daysOfWeek.push(day);
  }

  const handlePreviousWeek = () => {
    const newDate = subDays(selectedDate, 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = addDays(selectedDate, 7);
    setSelectedDate(newDate);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  const renderDay = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDayPress(item)}
      style={[
        styles.dayContainer,
        selectedDate.toDateString() === item.toDateString()
          ? styles.selectedDay
          : null,
      ]}>
      <Text
        style={[
          styles.dayText,
          selectedDate.toDateString() === item.toDateString()
            ? styles.selectedDayText
            : null,
        ]}>
        {format(item, "d")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.calendarContainer}>
      <TouchableOpacity onPress={handlePreviousWeek}>
        <Ionicons name="chevron-back" size={24} color="#6200ee" />
      </TouchableOpacity>

      <FlatList
        data={daysOfWeek}
        renderItem={renderDay}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysList}
      />

      <TouchableOpacity onPress={handleNextWeek}>
        <Ionicons name="chevron-forward" size={24} color="#6200ee" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  daysList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  selectedDay: {
    backgroundColor: "#6200ee",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarComponent;
