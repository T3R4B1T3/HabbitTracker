import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import HomePage from "./HomePage";
import { AuthContext } from "../store/auth-context";

const screenWidth = Dimensions.get("window").width;

function OnboardingScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [pulseAnim] = useState(new Animated.Value(1));
  const authCtx = useContext(AuthContext);

  const steps = [
    {
      key: "addButton",
      description: "Tap here to add a new habit!",
      position: { top: 67, left: screenWidth - 72 },
      size: { width: 60, height: 60 },
    },
    {
      key: "frequencyButton",
      description: "Select the frequency for your habits here!",
      position: { top: 130, left: screenWidth - 385 },
      size: { width: 375, height: 80 },
    },
    {
      key: "habitTile",
      description:
        "Here is your habit tile. You can track progress, mark completion, and delete it.",
      position: { top: 200, left: 4 },
      size: { width: screenWidth - 10, height: 150 },
    },
    {
      key: "progressBar",
      description: "This bar shows your progress towards completing the habit.",
      position: { top: 290, left: 20 },
      size: { width: screenWidth - 120, height: 20 },
    },
    {
      key: "checkbox",
      description:
        "Check this box to mark your habit as completed for the day.",
      position: { top: 278, left: screenWidth - 107 },
      size: { width: 40, height: 40 },
    },
    {
      key: "deleteIcon",
      description: "Tap this icon to delete a habit.",
      position: { top: 270, left: screenWidth - 74 },
      size: { width: 60, height: 60 },
    },
  ];

  useEffect(() => {
    const startPulsing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startPulsing();
  }, [pulseAnim]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      authCtx.completeOnboarding();
      navigation.replace("Tabs");
    }
  };

  const currentStepData = steps[currentStep];

  if (!currentStepData) {
    return null;
  }

  const { description, position, size } = currentStepData;

  return (
    <View style={styles.container}>
      <HomePage />

      <View style={styles.overlay}>
        <View
          style={[
            styles.highlightSpot,
            {
              top: position.top,
              left: position.left,
              width: size.width,
              height: size.height,
            },
          ]}
        />

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity onPress={nextStep} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>
              {currentStep < steps.length - 1 ? "Next" : "Close"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  highlightSpot: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
  },
  descriptionContainer: {
    position: "absolute",
    top: "50%",
    left: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 10,
    marginTop: 250,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OnboardingScreen;
