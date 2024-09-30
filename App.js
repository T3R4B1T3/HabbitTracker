import { StatusBar } from "expo-status-bar";
import { Colors } from "./constants/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./screens/HomePage";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import IconButton from "./components/Auth/ui/IconButton";
import SettingsScreen from "./screens/Settings";
import HabitsContextProvider from "./store/habit-context";
import Progress from "./screens/Progress";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.back },
        headerTintColor: "black",
        contentStyle: { backgroundColor: Colors.back },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="Homepage"
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
          title: "Progress",
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
          title: "Settings",
          tabBarLabel: "Settings",
          headerRight: () => (
            <IconButton
              icon="exit"
              color="black"
              size={24}
              onPress={authCtx.logout}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <HabitsContextProvider>
          <Navigation />
        </HabitsContextProvider>
      </AuthContextProvider>
    </>
  );
}
