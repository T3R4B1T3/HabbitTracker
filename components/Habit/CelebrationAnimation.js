import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import LottieView from "lottie-react-native";
import styles from "../../constants/styles";

const CelebrationAnimation = ({ isVisible, onAnimationFinish, habitId, sourceScreen }) => {
  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

  const getMessage = () => {
    if (sourceScreen === "onboarding") {
      return "Onboarding completed!";
    } else if (sourceScreen === "homepage") {
      return "Good Job! You have completed your habit!";
    }
    return "Well done!";
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animacja.json")}
          autoPlay
          loop={false}
          style={styles.lottie}
          onAnimationFinish={() => {
            onAnimationFinish(habitId);
          }}
        />
        <Text style={styles.congratsText}>
          {getMessage()}
        </Text>
      </View>
    </Modal>
  );
};

export default CelebrationAnimation;
