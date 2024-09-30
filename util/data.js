import axios from "axios";

const BACKEND_URL =
  "https://habbittracker-8c459-default-rtdb.europe-west1.firebasedatabase.app";

// Zapis nowego nawyku
export async function storeHabit(habitData) {
  try {
    const response = await axios.post(BACKEND_URL + "/habits.json", habitData);
    const id = response.data.name; // Pobranie ID z Firebase
    return id;
  } catch (error) {
    console.error("Błąd przy zapisie nawyku w Firebase:", error);
    throw error;
  }
}

// Pobranie nawyków z Firebase
export async function fetchHabits() {
  try {
    const response = await axios.get(BACKEND_URL + "/habits.json");

    if (!response || !response.data) {
      console.log("Brak danych w odpowiedzi Firebase.");
      return [];
    }

    const habits = Object.keys(response.data).map((key) => ({
      id: key,
      ...response.data[key],
    }));

    return habits;
  } catch (error) {
    console.error("Błąd podczas pobierania nawyków z Firebase:", error);
    throw new Error("Wystąpił problem z pobieraniem nawyków.");
  }
}

// Aktualizacja nawyku w Firebase
export async function updateHabitInFirebase(id, habitData) {
  try {
    await axios.put(`${BACKEND_URL}/habits/${id}.json`, habitData);
  } catch (error) {
    console.error("Błąd przy aktualizacji nawyku w Firebase:", error);
    throw error;
  }
}

// Usunięcie nawyku z Firebase
export async function deleteHabitFromFirebase(id) {
  try {
    await axios.delete(BACKEND_URL + `/habits/${id}.json`);
  } catch (error) {
    console.error("Błąd podczas usuwania nawyku:", error);
    throw error;
  }
}
