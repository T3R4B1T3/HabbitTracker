import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import LottieView from "lottie-react-native";
import styles from "../../constants/styles";

const CelebrationAnimation = ({
  isVisible,
  onAnimationFinish,
  completedHabits,
  habitId,
}) => {
  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

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
          Good Job! You have completed your habbit!
        </Text>
      </View>
    </Modal>
  );
};

export default CelebrationAnimation;
