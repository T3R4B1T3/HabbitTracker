import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../Auth/ui/Button";
import FlatButton from "../Auth/ui/flatButton";
import IconSelector from "./IconSelector";
import { AuthContext } from "../../store/auth-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LoadingOverlay from "../Auth/ui/LoadingOverlay";

function AddHabitModal({ isVisible, onClose, habitToEdit, onSave }) {
  const { email } = useContext(AuthContext);

  const [habitData, setHabitData] = useState({
    name: "",
    icon: "ios-checkmark-circle",
    description: "",
    duration: "",
    howOften: "daily",
    reminderFrequency: "daily",
    reminderTime: new Date(),
  });

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (habitToEdit) {
      setHabitData({
        name: habitToEdit.name,
        icon: habitToEdit.icon,
        description: habitToEdit.description,
        duration: habitToEdit.duration.toString(),
        howOften: habitToEdit.howOften || "daily",
        reminderFrequency: habitToEdit.reminderFrequency || "daily",
        reminderTime: habitToEdit.reminderTime
          ? new Date(habitToEdit.reminderTime)
          : new Date(),
      });
    } else {
      setHabitData({
        name: "",
        icon: "ios-checkmark-circle",
        description: "",
        duration: "",
        howOften: "daily",
        reminderFrequency: "daily",
        reminderTime: new Date(),
      });
    }
  }, [habitToEdit, isVisible]);

  const handleSaveHabit = async () => {
    if (!habitData.name || !habitData.icon || !habitData.duration) {
      alert("Please fill in all fields");
      return;
    }

    const parsedDuration = parseInt(habitData.duration, 10);
    const newHabit = {
      name: habitData.name,
      icon: habitData.icon,
      description: habitData.description,
      duration: isNaN(parsedDuration) ? 0 : parsedDuration,
      howOften: habitData.howOften,
      reminderFrequency: habitData.reminderFrequency,
      reminderTime: habitData.reminderTime.toISOString(),
      stepsCompleted: 1,
      totalSteps: isNaN(parsedDuration) ? 0 : parsedDuration,
      dateAdded: new Date().toISOString(),
      completed: false,
      points: 0,
      lastUpdated: null,
      email,
    };

    setIsLoading(true);
    try {
      await onSave(newHabit);
      setIsLoading(false);
      onClose();
    } catch (error) {
      alert("Failed to save the habit");
      setIsLoading(false);
    }
  };

  const handleConfirmTime = (time) => {
    setHabitData((prevState) => ({
      ...prevState,
      reminderTime: time,
    }));
    setTimePickerVisibility(false);
  };

  const openTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const closeTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const selectHowOften = (value) => {
    setHabitData((prevState) => ({
      ...prevState,
      howOften: value,
    }));
  };

  const selectReminderFrequency = (value) => {
    setHabitData((prevState) => ({
      ...prevState,
      reminderFrequency: value,
    }));
  };

  return (
    <>
      {isLoading && <LoadingOverlay message="Saving habit, please wait..." />}

      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        style={styles.modalContainer}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
        <View style={styles.modalContent}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.modalTitle}>
              {habitToEdit ? "Edit Habit" : "Add New Habit"}
            </Text>

            <Text style={styles.label}>Habit Name</Text>
            <TextInput
              style={styles.input}
              value={habitData.name}
              placeholder="e.g walking"
              onChangeText={(text) =>
                setHabitData((prevState) => ({ ...prevState, name: text }))
              }
            />

            <Text style={styles.label}>Habit Icon</Text>
            <IconSelector
              selectedIcon={habitData.icon}
              onSelectIcon={(icon) =>
                setHabitData((prevState) => ({ ...prevState, icon }))
              }
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={habitData.description}
              placeholder="e.g long distances"
              onChangeText={(text) =>
                setHabitData((prevState) => ({
                  ...prevState,
                  description: text,
                }))
              }
            />

            <Text style={styles.label}>Duration (days)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g 2"
              keyboardType="numeric"
              value={habitData.duration}
              onChangeText={(text) =>
                setHabitData((prevState) => ({
                  ...prevState,
                  duration: text,
                }))
              }
            />

            <Text style={styles.label}>How Often</Text>
            <View style={styles.howOftenContainer}>
              <TouchableOpacity
                onPress={() => selectHowOften("daily")}
                style={[
                  styles.howOftenButton,
                  habitData.howOften === "daily" && styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Daily</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectHowOften("weekly")}
                style={[
                  styles.howOftenButton,
                  habitData.howOften === "weekly" && styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Weekly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectHowOften("monthly")}
                style={[
                  styles.howOftenButton,
                  habitData.howOften === "monthly" && styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Month</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Reminder Frequency</Text>
            <View style={styles.howOftenContainer}>
              <TouchableOpacity
                onPress={() => selectReminderFrequency("daily")}
                style={[
                  styles.howOftenButton,
                  habitData.reminderFrequency === "daily" &&
                    styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Daily</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectReminderFrequency("weekly")}
                style={[
                  styles.howOftenButton,
                  habitData.reminderFrequency === "weekly" &&
                    styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Weekly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => selectReminderFrequency("monthly")}
                style={[
                  styles.howOftenButton,
                  habitData.reminderFrequency === "monthly" &&
                    styles.selectedButton,
                ]}>
                <Text style={styles.howOftenText}>Month</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.reminderContainer}>
              <Text style={styles.label}>Reminder Time</Text>
              <TouchableOpacity
                onPress={openTimePicker}
                style={styles.reminderTimeContainer}>
                <Text style={styles.reminderTime}>
                  {habitData.reminderTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={closeTimePicker}
              textColor="black"
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <Button onPress={handleSaveHabit}>
              {habitToEdit ? "Update Habit" : "Add Habit"}
            </Button>
            <FlatButton onPress={onClose}>Cancel</FlatButton>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0d6fbf"
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#8f8f8f"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#e6f3ff",
  },
  howOftenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 6,
    backgroundColor: "#0d6fbf",
    borderRadius: 25,
    elevation: 2,
    maxWidth: "100%"
  },
  howOftenButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#e6f3ff",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    
  },
  selectedButton: {
    backgroundColor: "#0dffbe",
  },
  howOftenText: {
    color: "#0d6fbf",
    fontWeight: "bold",
  },
  reminderContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  reminderTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reminderTime: {
    fontSize: 16,
    color: "#0d6fbf",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#e6f3ff",
    textAlign: "center",
    marginLeft: 10,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AddHabitModal;
