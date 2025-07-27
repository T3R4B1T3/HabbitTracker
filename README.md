# 📱 Habit Tracker

🎥 **App preview demo:** [Check out on Google Drive](https://drive.google.com/drive/folders/1MCSZuOpNceUjHdWW5gc41F96_PKhDGBu?usp=sharing)

A mobile application for tracking daily habits, built with React Native using Expo and Firebase. Helps users build positive routines and stay consistent.

## 🚀 Features

- ➕ Add new habits  
- 📋 Daily habit checklist  
- ✅ Mark habits as completed  
- 📈 View habit history and progress  
- 🔐 Firebase authentication (sign up & log in)  

## 🧭 Screens

1. **Welcome / Login Screen** – Sign up and log in using Firebase  
2. **Home Screen** – View today’s habits  
3. **Add Habit Screen** – Create and customize new habits  
4. **History Screen** – Track past habit completions  

## 🛠️ Tech Stack

- **React Native (with Expo)**  
- **Firebase (Authentication + Firestore)**  
- **React Navigation**  
- **React Hook Form** (optional)  
- **Context API** for global state management  

## ⚠️ Important Notice

> **This app may currently not function properly.**  
> The Firebase database access has expired. To use the app, you need to:  
> 1. Create a new Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)  
> 2. Enable Firestore and Email/Password Authentication  
> 3. Replace the configuration in your local file (e.g., `firebaseConfig.js`) with the new project's credentials

## ⚙️ Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/T3R4B1T3/habit-tracker.git
   cd habit-tracker
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**  
   ```bash
   npx expo start
   ```

## 🔧 Firebase Configuration Example

Make sure you replace the Firebase config in your project (usually in a file like `firebaseConfig.js`) with your own credentials:

```js
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

> Don’t forget to add Firebase rules and environment protection if you plan to deploy the app publicly.
