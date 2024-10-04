import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  isNotificationsEnabled: false,
  isOnboardingCompleted: false,
  authenticate: (token, email) => {},
  toggleNotifications: () => {},
  logout: () => {},
  completeOnboarding: () => {},
});

function AuthContextProvider({ children }) {
  const [authenticateToken, setAuthenticateToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    const loadOnboardingState = async () => {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      if (onboardingCompleted === "true") {
        setIsOnboardingCompleted(true);
      }
    };
    loadOnboardingState();
  }, []);

  function authenticate(token, email) {
    setAuthenticateToken(token);
    setUserEmail(email);
  }

  function toggleNotifications() {
    setIsNotificationsEnabled((prev) => {
      const newState = !prev;
      console.log("Notifications toggled. New state:", newState);
      return newState;
    });
  }

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("onboardingCompleted");
    setAuthenticateToken(null);
    setUserEmail(null);
    setIsOnboardingCompleted(false);
  };

  const completeOnboarding = async () => {
    setIsOnboardingCompleted(true);
    await AsyncStorage.setItem("onboardingCompleted", "true");
  };

  const value = {
    token: authenticateToken,
    email: userEmail,
    isAuthenticated: !!authenticateToken,
    isNotificationsEnabled,
    isOnboardingCompleted,
    authenticate: authenticate,
    toggleNotifications: toggleNotifications,
    logout: logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
