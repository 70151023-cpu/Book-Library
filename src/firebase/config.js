import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ STEP 1: Go to https://console.firebase.google.com
// ✅ STEP 2: Create a project → Add Web App → copy config below
// ✅ STEP 3: Enable Firestore → Build → Firestore Database → Start in Test Mode

const firebaseConfig = {
    apiKey: "AIzaSyBwss4aH6fqogCxn-YMGyXZlcErs2UPTCI",
    authDomain: "web-engineering-1794.firebaseapp.com",
    projectId: "web-engineering-1794",
    storageBucket: "web-engineering-1794.firebasestorage.app",
    messagingSenderId: "708034063955",
    appId: "1:708034063955:web:2a7b9d46201db465a520a6",
    measurementId: "G-05JF5NP7J8"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);