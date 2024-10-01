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
import FrequencyFilter from "../components/Habit/FrequencyFilter";
import HabitList from "../components/Habit/HabitList";
import AddHabitModal from "../components/Habit/AddHabitModal";
import CelebrationAnimation from "../components/Habit/CelebrationAnimation";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/Auth/ui/LoadingOverlay";
import {
  scheduleReminderNotification,
  sendCompletionNotification,
} from "../components/Habit/Notification";

function HomePage() {
  const habitsCtx = useContext(HabitsContext);
  const authCtx = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [checkedHabits, setCheckedHabits] = useState({});
  const [isAnimationVisible, setAnimationVisible] = useState(false);
  const [completedHabitId, setCompletedHabitId] = useState(null);
  const [filterOption, setFilterOption] = useState("daily");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await habitsCtx.fetchHabits();
      initializeCheckedHabits();
      setIsLoading(false);
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
          { text: "OK" },
        ]);
      }
    }
  };

  const handleSaveHabit = (newHabit) => {
    setIsLoading(true);
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

    scheduleReminderNotification(habitWithDate, authCtx.isNotificationsEnabled);

    setModalVisible(false);
    setSelectedHabit(null);
    initializeCheckedHabits();
    setIsLoading(false);
  };

  const handleDeleteHabit = (habitId) => {
    setIsLoading(true);
    habitsCtx.deleteHabit(habitId);
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading habits, please wait..." />;
  }

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
