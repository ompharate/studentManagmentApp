import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDQQT7nC5BxJzyNBR5d6_HUjEltRH0qabM",
  authDomain: "dsa-project-3dca5.firebaseapp.com",
  projectId: "dsa-project-3dca5",
  storageBucket: "dsa-project-3dca5.appspot.com",
  messagingSenderId: "11969764639",
  appId: "1:11969764639:web:4fda378916c2245205a42a",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
