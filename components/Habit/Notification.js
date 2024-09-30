import * as Notifications from "expo-notifications";

export const sendCompletionNotification = async (habitName) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Congratulations! 🎉",
        body: `You've completed the habit: ${habitName}!`,
        sound: true,
        vibrate: [200, 100, 200],
      },
      trigger: null,
    });
  } catch (error) {
    console.error("Error sending completion notification:", error);
  }
};
