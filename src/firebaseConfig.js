
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnPHowFmypfWRL0FzpL-SJMjeBdHbSa6s",
  authDomain: "sendthesong-b39de.firebaseapp.com",
  projectId: "sendthesong-b39de",
  storageBucket: "sendthesong-b39de.firebasestorage.app",
  messagingSenderId: "914910612420",
  appId: "1:914910612420:web:47b66c0cdc19975e257291",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
