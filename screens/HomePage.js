import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { HabitsContext } from "../store/habit-context";
import CalendarComponent from "../components/Habit/CalendarComponent";
import FrequencyFilter from "../components/Habit/FrequencyFilter";
import HabitList from "../components/Habit/HabitList";
import AddHabitModal from "../components/Habit/AddHabitModal";
import CelebrationAnimation from "../components/Habit/CelebrationAnimation";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { AuthContext } from "../store/auth-context";

function HomePage() {
  const habitsCtx = useContext(HabitsContext);
  const authCtx = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [checkedHabits, setCheckedHabits] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAnimationVisible, setAnimationVisible] = useState(false);
  const [completedHabitId, setCompletedHabitId] = useState(null);
  const [filterOption, setFilterOption] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      await habitsCtx.fetchHabits();
      initializeCheckedHabits();
    };
    fetchData();
  }, [authCtx.email]);

  const initializeCheckedHabits = () => {
    const initialCheckedState = {};
    habitsCtx.habits.forEach((habit) => {
      initialCheckedState[habit.id] = false;
    });
    setCheckedHabits(initialCheckedState);
  };

  const handleToggleHabit = async (habit) => {
    await habitsCtx.toggleHabit(habit.id);
    initializeCheckedHabits();

    setCompletedHabitId(habit.id);
    setAnimationVisible(true);

    if (authCtx.isNotificationsEnabled) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Habit Completed!",
          body: `Great job! You've completed the habit: ${habit.title}.`,
          sound: true,
        },
        trigger: null,
      });
    }

    setTimeout(() => {
      setAnimationVisible(false);
    }, 2000);
  };

  const sendCompletionNotification = (habitName) => {
    if (authCtx.isNotificationsEnabled) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Habit Completed!",
          body: `Great job! You've completed the habit: ${habitName}.`,
          sound: true,
        },
        trigger: null,
      });
    }
  };

  function handleSaveHabit(newHabit) {
    const habitWithDate = {
      ...newHabit,
      dateAdded: new Date().toISOString(),
      completed: false,
      stepsCompleted: 0,
      totalSteps: newHabit.totalSteps || 4,
    };
    if (selectedHabit) {
      habitsCtx.updateHabit(selectedHabit.id, habitWithDate);
    } else {
      habitsCtx.addHabit(habitWithDate);
    }
    setModalVisible(false);
    setSelectedHabit(null);
    initializeCheckedHabits();
  }

  const handleDeleteHabit = (habitId) => {
    habitsCtx.deleteHabit(habitId);
  };

  const handleCheckboxToggle = (habitId) => {
    const currentDate = new Date().toISOString().split("T")[0];

    const habitToUpdate = habitsCtx.habits.find(
      (habit) => habit.id === habitId
    );

    if (habitToUpdate) {
      const lastUpdated = habitToUpdate.lastUpdated?.split("T")[0] || null;

      if (lastUpdated !== currentDate) {
        const updatedStepsCompleted = habitToUpdate.stepsCompleted + 1;
        const finalStepsCompleted = Math.min(
          updatedStepsCompleted,
          habitToUpdate.totalSteps
        );

        const randomPoints = Math.floor(Math.random() * 10) + 1;

        const updatedHabit = {
          ...habitToUpdate,
          stepsCompleted: finalStepsCompleted,
          completed: finalStepsCompleted >= habitToUpdate.totalSteps,
          points: (habitToUpdate.points || 0) + randomPoints,
          lastUpdated: new Date().toISOString(),
        };

        habitsCtx.updateHabit(habitId, updatedHabit);

        setCheckedHabits((prev) => ({
          ...prev,
          [habitId]: !prev[habitId],
        }));

        if (finalStepsCompleted === habitToUpdate.totalSteps) {
          setCompletedHabitId(habitId);
          setAnimationVisible(true);
          sendCompletionNotification(habitToUpdate.name);
        }
      } else {
        Alert.alert("Warning", "This habit was checked today. Try tomorrow!", [
          { text: "OK", onPress: () => console.log("OK pressed") },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Habits</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <FrequencyFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      <ScrollView contentContainerStyle={styles.habitListContainer}>
        <HabitList
          filterOption={filterOption}
          selectedDate={selectedDate}
          habits={habitsCtx.habits.filter(
            (habit) => habit.email === authCtx.email
          )}
          checkedHabits={checkedHabits}
          setCheckedHabits={setCheckedHabits}
          setSelectedHabit={setSelectedHabit}
          setModalVisible={setModalVisible}
          setCompletedHabitId={setCompletedHabitId}
          setAnimationVisible={setAnimationVisible}
          handleDeleteHabit={handleDeleteHabit}
          handleCheckboxToggle={handleCheckboxToggle}
        />
      </ScrollView>

      {/* <View style={styles.footer}>
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View> */}

      <AddHabitModal
        isVisible={isModalVisible}
        habitToEdit={selectedHabit}
        onSave={handleSaveHabit}
        onClose={() => {
          setModalVisible(false);
          setSelectedHabit(null);
        }}
      />
      {isAnimationVisible && (
        <CelebrationAnimation
          onAnimationFinish={() => setAnimationVisible(false)}
          habitId={completedHabitId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  habitListContainer: {
    paddingBottom: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#6200EE",
    borderRadius: 40,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default HomePage;
