import * as Notifications from "expo-notifications";

export const scheduleReminderNotification = async (
  habit,
  isNotificationsEnabled
) => {
  if (!isNotificationsEnabled) return;

  const { reminderFrequency, reminderTime, name } = habit;

  let trigger;
  switch (reminderFrequency) {
    case "daily":
      trigger = {
        hour: new Date(reminderTime).getHours(),
        minute: new Date(reminderTime).getMinutes(),
        repeats: true,
      };
      break;
    case "weekly":
      trigger = {
        weekday: 1,
        hour: new Date(reminderTime).getHours(),
        minute: new Date(reminderTime).getMinutes(),
        repeats: true,
      };
      break;
    case "monthly":
      trigger = {
        day: 15,
        hour: new Date(reminderTime).getHours(),
        minute: new Date(reminderTime).getMinutes(),
        repeats: true,
      };
      break;
    default:
      return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey, It's time to work on your habit!",
        body: `Your habit "${name}" is waiting for you.`,
        sound: true,
      },
      trigger,
    });
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};

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
