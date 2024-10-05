import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContextProvider, { AuthContext } from "./store/auth-context";
import HabitsContextProvider from "./store/habit-context";
import { Colors } from "./constants/colors";
import HomePage from "./screens/HomePage";
import Progress from "./screens/Progress";
import SettingsScreen from "./screens/Settings";
import WelcomeScreen from "./screens/WelocomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OnboardingScreen from "./screens/OnBoardingScreen"; // Import OnboardingScreen

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "black",
        contentStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: { backgroundColor: Colors.background },
      }}>
      <BottomTabs.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarLabel: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AppNavigation() {
  const authCtx = useContext(AuthContext);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem("onboardingCompleted");
        setIsFirstLaunch(onboardingCompleted === null);
      } catch (error) {
        console.error("Failed to check onboarding status:", error);
      }
    };
    checkOnboardingStatus();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setIsFirstLaunch(false);
    } catch (error) {
      console.error("Failed to set onboarding completion status:", error);
    }
  };

  if (isFirstLaunch === null) {
    return null; // or a loading spinner if you prefer
  }

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? (
        <AuthStack />
      ) : (
        <>
          <BottomTabsNavigator />
          {isFirstLaunch && (
            <OnboardingScreen onComplete={completeOnboarding} /> // Show onboarding on the HomePage
          )}
        </>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <HabitsContextProvider>
          <AppNavigation />
        </HabitsContextProvider>
      </AuthContextProvider>
    </>
  );
}
