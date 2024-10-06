import { StyleSheet } from "react-native";
import { Colors } from "./colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  habitContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedHabitContainer: {
    backgroundColor: Colors.completedHabit,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  habitText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: 'white',
  },
  completedHabitText: {
    textDecorationLine: "line-through",
    color: Colors.gray500,
  },
  stepsText: {
    color: Colors.gray500,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.error500,
    padding: 6,
    borderRadius: 6,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: Colors.primary100,
    borderRadius: 50,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  noHabitsText: {
    fontSize: 16,
    color: "#4f6d7a",
    textAlign: "center",
    marginTop: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
    marginTop: 20,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  calendar: {
    height: 100,
    marginBottom: 20,
  },
  highlightDateName: {
    color: Colors.primary100,
  },
  highlightDateNumber: {
    color: Colors.primary100,
  },
  dateNumber: {
    color: Colors.gray500,
  },
  dateName: {
    color: Colors.gray500,
  },
  habitListContainer: {
    paddingBottom: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
  },
  calendar: {
    height: 60,
    flex: 1,
    backgroundColor: Colors.white,
  },
  addButtons: {
    backgroundColor: Colors.primary100,
    borderRadius: 50,
    padding: 6,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;
