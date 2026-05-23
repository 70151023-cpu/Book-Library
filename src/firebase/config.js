import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjiPUro0Si3xX4bS_00M6BPHudI40KPjM",
  authDomain: "book-library-4004.firebaseapp.com",
  projectId: "book-library-4004",
  storageBucket: "book-library-4004.firebasestorage.app",
  messagingSenderId: "322530109861",
  appId: "1:322530109861:web:2eb9e5c6b6806f1140a04c",
  measurementId: "G-8G269DHTJF"
};
const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);