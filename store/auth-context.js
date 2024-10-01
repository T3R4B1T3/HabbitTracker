import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  isNotificationsEnabled: false,
  authenticate: (token, email) => {},
  toggleNotifications: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authenticateToken, setAuthenticateToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

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

  function logout() {
    setAuthenticateToken(null);
    setUserEmail(null);
  }

  const value = {
    token: authenticateToken,
    email: userEmail,
    isAuthenticated: !!authenticateToken,
    isNotificationsEnabled,
    authenticate: authenticate,
    toggleNotifications: toggleNotifications,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
