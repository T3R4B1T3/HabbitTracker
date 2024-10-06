import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import CelebrationAnimation from "../components/Habit/CelebrationAnimation";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OnboardingScreen({ visible, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCelebrationVisible, setCelebrationVisible] = useState(false);
  const [isOnboardingComplete, setOnboardingComplete] = useState(false);

  const steps = [
    {
      key: "addButton",
      description: "Hey there! Let's start by adding a new habit. Tap the icon i right corner!",
    },
    {
      key: "habitTile",
      description: "Behind me is your habit tile! Track progress and stay motivated.",
    },
    {
      key: "checkbox",
      description: "Mark your habit as complete for the day by checking box!",
    },
    {
      key: "deleteIcon",
      description: "Need to remove a habit? Tap trash icon to delete it.",
    },
  ];

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingCompleted = await AsyncStorage.getItem("onboardingCompleted");
      setOnboardingComplete(onboardingCompleted === "true");
    };
    checkOnboardingStatus();
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCelebrationVisible(true);
    }
  };

  const handleAnimationFinish = async () => {
    setCelebrationVisible(false);
    await AsyncStorage.setItem("onboardingCompleted", "true");
    setOnboardingComplete(true);
    if (onComplete) {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <Modal
      visible={visible && !isOnboardingComplete}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.description}>{currentStepData?.description}</Text>
          <TouchableOpacity onPress={nextStep} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {currentStep < steps.length - 1 ? "Next" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
        <CelebrationAnimation
          isVisible={isCelebrationVisible}
          onAnimationFinish={handleAnimationFinish}
          sourceScreen="onboarding"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 20,
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: "#fb8500",
    padding: 15,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OnboardingScreen;
