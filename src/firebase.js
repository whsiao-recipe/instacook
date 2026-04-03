import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_Rpbh6r7yKickpQLIti28sVV17Qq4HEI",
  authDomain: "instacook-2c540.firebaseapp.com",
  projectId: "instacook-2c540",
  storageBucket: "instacook-2c540.firebasestorage.app",
  messagingSenderId: "811052861279",
  appId: "1:811052861279:web:a362acb1050b732d9098ea",
  measurementId: "G-CYL6BZNKL5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
