import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import { AuthContext } from "../store/auth-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function SettingsScreen({ onLogout }) {
  const authCtx = useContext(AuthContext);
  const { isNotificationsEnabled, toggleNotifications } = authCtx;
  const userEmail = authCtx.email;

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => subscription.remove();
  }, []);

  const handleNotification = (notification) => {
    console.log("Received notification:", notification);
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Failed to get notification permissions!"
      );
      return;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const toggleSwitch = () => {
    toggleNotifications();
    if (!isNotificationsEnabled) {
      Alert.alert("Notifications Enabled", "You have allowed notifications.");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Notifications Enabled",
          body: "You have successfully enabled notifications.",
          sound: true,
        },
        trigger: null,
      });
    } else {
      Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert(
        "Notifications Disabled",
        "You have turned off notifications."
      );
    }
  };

  function logoutHandler() {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: authCtx.logout },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      {/* Notifications Switch */}
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#7b2cbf" }}
          thumbColor={isNotificationsEnabled ? "#4cc9f0" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
