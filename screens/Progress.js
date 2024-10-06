import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { HabitsContext } from "../store/habit-context";
import { PieChart } from "react-native-chart-kit";
import Collapsible from "react-native-collapsible";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const Progress = () => {
  const { habits } = useContext(HabitsContext);
  const [monthlyHabits, setMonthlyHabits] = useState({});
  const [activeSections, setActiveSections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentMonthPoints, setCurrentMonthPoints] = useState(0);

  const groupHabitsByMonth = () => {
    const grouped = habits.reduce((acc, habit) => {
      const habitDate = new Date(habit.dateAdded);
      const monthKey = habitDate.toLocaleString("default", { month: "long" });

      if (!acc[monthKey]) {
        acc[monthKey] = { completed: 0, incomplete: 0, habits: [] };
      }

      if (habit.completed) {
        acc[monthKey].completed += 1;
      } else {
        acc[monthKey].incomplete += 1;
      }

      acc[monthKey].habits.push(habit);

      return acc;
    }, {});

    setMonthlyHabits(grouped);
  };

  useEffect(() => {
    groupHabitsByMonth();
  }, [habits]);

  useEffect(() => {
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    const totalPoints =
      monthlyHabits[currentMonth]?.habits.reduce(
        (total, habit) => total + (habit.completed ? habit.points : 0),
        0
      ) || 0;
    setCurrentMonthPoints(totalPoints);
  }, [monthlyHabits]);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const renderChart = (month) => {
    const { completed, incomplete } = monthlyHabits[month] || {
      completed: 0,
      incomplete: 0,
    };
    const data = [
      {
        name: "Completed",
        count: completed,
        color: "#dd6e42",
      },
      {
        name: "Incomplete",
        count: incomplete,
        color: "#eaeaea",
      },
    ];

    const totalPoints = monthlyHabits[month]?.habits.reduce(
      (total, habit) => total + (habit.completed ? habit.points : 0),
      0
    );

    return (
      <TouchableOpacity
        onPress={() => openModal(month)}
        style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Habits Statistics for {month}</Text>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 32}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            backgroundColor: "#fff",
          }}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          absolute
          hasLegend={false}
          style={{ marginLeft: 165 }}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: "#dd6e42" }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: "#eaeaea" }]} />
            <Text style={styles.legendText}>Incomplete</Text>
          </View>
        </View>
        <View style={styles.pointsContainer}>
          <Ionicons
            name="star"
            size={24}
            color="#FFD700"
            style={styles.pointsIcon}
          />
          <Text style={styles.totalPointsText}>
            Total Points: {totalPoints}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const openModal = (month) => {
    setSelectedMonth(month);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedMonth(null);
  };

  const toggleSection = (monthName) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(monthName)
        ? prevActiveSections.filter((section) => section !== monthName)
        : [...prevActiveSections, monthName]
    );
  };

  const renderHabitDetails = () => {
    if (!selectedMonth || !monthlyHabits[selectedMonth]) return null;

    const { habits } = monthlyHabits[selectedMonth];

    return (
      <ScrollView>
        {habits.map((habit, index) => {
          const points = habit.completed ? habit.points : 0;

          return (
            <View key={index} style={styles.habitTile}>
              <View style={styles.habitRow}>
                <View style={styles.habitNameContainer}>
                  <Text style={styles.habitName} numberOfLines={1} ellipsizeMode="tail">
                    {habit.name}
                  </Text>
                </View>
                <View style={styles.habitIconContainer}>
                  <Ionicons
                    name={habit.completed ? "checkmark-circle" : "close-circle"}
                    size={26}
                    color={habit.completed ? "#2AAA8A" : "#D2042D"}
                  />
                </View>
                <View style={styles.habitPointsContainer}>
                  <Text style={styles.habitPoints}>
                    {points}
                  </Text>
                  <Ionicons
                    name="star"
                    size={24}
                    color="#FFD700"
                    style={styles.pointsIcon}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
          <View style={styles.pointsTopRightContainer}>
            <Ionicons name="star" size={24} color="#ffb703" />
            <Text style={styles.totalPointsTopRightText}>
              Total Points: {currentMonthPoints}
            </Text>
          </View>
        </View>

        <View style={styles.currentMonthContainer}>
          {monthlyHabits[currentMonth] && renderChart(currentMonth)}
        </View>

        <ScrollView style={styles.scrollableList}>
          {Array.from({ length: 12 }, (_, i) => {
            const monthName = new Date(1970, i, 15).toLocaleString("default", {
              month: "long",
            });

            if (monthName === currentMonth) return null;

            const isMonthDisplayed = activeSections.includes(monthName);

            return (
              <TouchableOpacity
                key={`${monthName}-${i}`}
                onPress={() => toggleSection(monthName)}
                style={styles.monthTile}>
                <View style={styles.touchableMonth}>
                  <Text style={styles.monthTitle}>{monthName}</Text>
                  <Ionicons
                    name={isMonthDisplayed ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#6200ee"
                    style={styles.chevronIcon}
                  />
                </View>
                <Collapsible collapsed={!isMonthDisplayed}>
                  {monthlyHabits[monthName] ? (
                    renderChart(monthName)
                  ) : (
                    <Text style={styles.noHabitsMessage}>
                      No habits added yet.
                    </Text>
                  )}
                </Collapsible>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={styles.centeredModalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Habit Details</Text>
                <Text style={styles.modalTitle}>{selectedMonth}</Text>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="#333" />
              </TouchableOpacity>
            </View>
            {renderHabitDetails()}
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default Progress;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    padding: 16,
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f6d7a",
  },
  pointsTopRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 60,
  },
  totalPointsTopRightText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#4f6d7a"
  },
  scrollableList: {
    flex: 1,
  },
  currentMonthContainer: {
    backgroundColor: "#4f6d7a",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  monthTile: {
    backgroundColor: "#4f6d7a",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  touchableMonth: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#eaeaea",
  },
  chevronIcon: {
    marginLeft: 10,
    color: "#eaeaea"
  },
  noHabitsMessage: {
    textAlign: "center",
    color: "#eaeaea",
    fontWeight: "bold",
    marginTop: 10,
  },
  chartContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#eaeaea'
  },
  legendContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    color: "white"
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  pointsIcon: {
    marginRight: 5,
    color: "#ffb703"
  },
  totalPointsText: {
    fontSize: 16,
    color: "#eaeaea"
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#4f6d7a',
    borderRadius: 8,
  },
  habitNameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  habitName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eaeaea",
    paddingLeft: 5,
  },
  habitIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitPointsContainer: {
    flex: 1,
    flexDirection: "row", 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  habitPoints: {
    fontSize: 16,
    color: "#eaeaea",
    marginRight: 5, 
  },
  pointsIcon: {
    marginLeft: 5,
  },
  centeredModalContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "70%",
    marginTop: "35%",
  },
  modalContent: {
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    padding: 20,
    width: Dimensions.get("window").width - 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f6d7a"
  },
  closeButton: {
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#dd6e42",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
