import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { Text } from "react-native";
import Loader from "../components/Loader";

const UserContext = createContext();

export const UserAuth = () => useContext(UserContext);

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          const userDocRef = doc(db, "students", authUser.uid);
          const unsubscribeSnapshot = onSnapshot(
            userDocRef,
            (snapshot) => {
              setUser(snapshot.data());
              setIsLoggedIn(true);
              setIsLoading(false);
              setError(null);
            },
            (error) => {
              setIsLoading(false);
              setError(error.message);
            }
          );

          return () => unsubscribeSnapshot();
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
          setError(null);
        }
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
