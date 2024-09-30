import React, { createContext, useReducer, useState } from "react";
import {
  storeHabit,
  fetchHabits,
  updateHabitInFirebase,
  deleteHabitFromFirebase,
} from "../util/data";

export const HabitsContext = createContext({
  habits: [],
  addHabit: async (habitData) => {},
  setHabits: (habits) => {},
  deleteHabit: (id) => {},
  updateHabit: (id, habitData) => {},
  fetchHabits: async () => {},
  incrementSteps: (id) => {},
});

function habitsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return Array.isArray(action.payload) ? action.payload.reverse() : [];
    case "UPDATE":
      const updatableIndex = state.findIndex(
        (habit) => habit.id === action.payload.id
      );
      const updatedHabits = [...state];
      updatedHabits[updatableIndex] = {
        ...state[updatableIndex],
        ...action.payload.data,
      };
      return updatedHabits;
    case "DELETE":
      return state.filter((habit) => habit.id !== action.payload);
    default:
      return state;
  }
}

function HabitsContextProvider({ children }) {
  const [habitsState, dispatch] = useReducer(habitsReducer, []);
  const [errorMessage, setErrorMessage] = useState(null);

  async function addHabit(habitData) {
    try {
      const id = await storeHabit(habitData);
      dispatch({ type: "ADD", payload: { id, ...habitData } });
    } catch (error) {
      console.error("Błąd w addHabit:", error);
      setErrorMessage(`Błąd w addHabit: ${error.message}`);
    }
  }

  function setHabits(habits) {
    dispatch({ type: "SET", payload: habits });
  }

  async function fetchHabitsData() {
    try {
      const habits = await fetchHabits();
      setHabits(habits);
    } catch (error) {
      console.error("Błąd podczas pobierania nawyków:", error);
      setErrorMessage(`Błąd podczas pobierania nawyków: ${error.message}`);
    }
  }

  async function deleteHabit(id) {
    try {
      await deleteHabitFromFirebase(id);
      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      console.error("Błąd przy usuwaniu nawyku:", error);
      setErrorMessage(`Błąd przy usuwaniu nawyku: ${error.message}`);
    }
  }

  async function updateHabit(id, habitData) {
    try {
      await updateHabitInFirebase(id, habitData);
      dispatch({ type: "UPDATE", payload: { id, data: habitData } });
    } catch (error) {
      console.error("Błąd przy aktualizacji nawyku:", error);
      setErrorMessage(`Błąd przy aktualizacji nawyku: ${error.message}`);
    }
  }

  function incrementSteps(id) {
    const habitIndex = habitsState.findIndex((habit) => habit.id === id);
    if (habitIndex >= 0) {
      const habit = habitsState[habitIndex];
      const updatedStepsCompleted = Math.min(
        habit.stepsCompleted + 1,
        habit.totalSteps
      );
      const isCompleted = updatedStepsCompleted === habit.totalSteps;

      let updatedPoints = habit.points || 0;
      if (isCompleted && habit.points === 0) {
        updatedPoints = Math.floor(Math.random() * 10) + 1;
      }

      const updatedHabit = {
        ...habit,
        stepsCompleted: updatedStepsCompleted,
        completed: isCompleted,
        points: updatedPoints,
      };

      updateHabit(id, updatedHabit)
        .then(() => {
          dispatch({ type: "UPDATE", payload: { id, data: updatedHabit } });
        })
        .catch((error) => {
          console.error("Błąd przy aktualizacji nawyku w Firebase:", error);
          setErrorMessage(`Błąd przy aktualizacji nawyku: ${error.message}`);
        });
    }
  }

  return (
    <HabitsContext.Provider
      value={{
        habits: habitsState,
        addHabit,
        setHabits,
        deleteHabit,
        updateHabit,
        incrementSteps,
        fetchHabits: fetchHabitsData,
      }}>
      {children}
      {errorMessage && <Text>{errorMessage}</Text>}
    </HabitsContext.Provider>
  );
}

export default HabitsContextProvider;
