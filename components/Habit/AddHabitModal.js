import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../Auth/ui/Button";
import FlatButton from "../Auth/ui/flatButton";
import IconSelector from "./IconSelector";
import { AuthContext } from "../../store/auth-context";

function AddHabitModal({ isVisible, onClose, habitToEdit, onSave }) {
  const { email } = useContext(AuthContext);

  const [habitData, setHabitData] = useState({
    name: "",
    icon: "ios-checkmark-circle",
    description: "",
    duration: "",
    howOften: "daily",
  });

  useEffect(() => {
    if (!habitToEdit) {
      setHabitData({
        name: "",
        icon: "ios-checkmark-circle",
        description: "",
        duration: "",
        howOften: "daily",
      });
    } else {
      setHabitData({
        name: habitToEdit.name,
        icon: habitToEdit.icon,
        description: habitToEdit.description,
        duration: habitToEdit.duration.toString(),
        howOften: habitToEdit.howOften || "daily",
      });
    }
  }, [habitToEdit, isVisible]);

  const handleSaveHabit = () => {
    if (
      !habitData.name ||
      !habitData.icon ||
      !habitData.duration ||
      !habitData.howOften
    ) {
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
      stepsCompleted: 1,
      totalSteps: isNaN(parsedDuration) ? 0 : parsedDuration,
      dateAdded: new Date().toISOString(),
      completed: false,
      points: 0,
      lastUpdated: null,
      email,
    };

    onSave(newHabit);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.headerRow}>
          <Text style={styles.modalTitle}>
            {habitToEdit ? "Edit Habit" : "Add New Habit"}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            value={habitData.name}
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
          <View style={styles.frequencyContainer}>
            {["daily", "weekly", "overall"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  habitData.howOften === option && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  setHabitData((prevState) => ({
                    ...prevState,
                    howOften: option,
                  }))
                }>
                <Text
                  style={[
                    styles.optionButtonText,
                    habitData.howOften === option &&
                      styles.optionButtonTextSelected,
                  ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.buttonRow}>
          <Button onPress={handleSaveHabit}>
            {habitToEdit ? "Update Habit" : "Add Habit"}
          </Button>
          <FlatButton onPress={onClose}>Cancel</FlatButton>
        </View>
      </View>
    </Modal>
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
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 5,
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    elevation: 2,
  },
  optionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#EAEAEA",
    elevation: 1,
  },
  optionButtonSelected: {
    backgroundColor: "#6200ee",
    elevation: 4,
  },
  optionButtonText: {
    color: "#7A7A7A",
    fontSize: 16,
    fontWeight: "500",
  },
  optionButtonTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default AddHabitModal;
