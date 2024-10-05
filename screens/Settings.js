import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  SafeAreaView
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
    notification;
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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "white", true: "#0f6dbf" }}
          thumbColor={isNotificationsEnabled ? "#4cc9f0" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isNotificationsEnabled}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", 
  },
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:"#0d6fbf"
  },
  userInfoContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e6f3ff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  label: {
    fontSize: 18,
    color: "#0d6fbf",
    fontWeight: "bold"
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0dffbe",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#e6f3ff",
    borderRadius: 6,
    padding: 10
  },
  settingLabel: {
    fontSize: 18,
    color: "#0d6fbf",
    marginLeft: 10,
    fontWeight: "bold"
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#0dffbe",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
