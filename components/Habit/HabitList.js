import React from "react";
import HabitItem from "./HabitItem";
import { Text } from "react-native";
import styles from "../../constants/styles";

const HabitList = ({
  habits,
  filterOption,
  checkedHabits,
  setCheckedHabits,
  setSelectedHabit,
  setModalVisible,
  handleDeleteHabit,
  handleCheckboxToggle,
}) => {
  const filteredHabits = habits.filter((habit) => {
    return habit.howOften === filterOption && !habit.completed;
  });

  return (
    <>
      {filteredHabits.length === 0 ? (
        <Text style={styles.noHabitsText}>No habits added for this day</Text>
      ) : (
        filteredHabits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            checkedHabits={checkedHabits}
            handleCheckboxToggle={handleCheckboxToggle}
            handleHabitPress={(habit) => {
              setSelectedHabit(habit);
              setModalVisible(true);
            }}
            handleDeleteHabit={handleDeleteHabit}
          />
        ))
      )}
    </>
  );
};

export default HabitList;
