import { auth, db } from "config/firerBase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const AdminContext = React.createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const currentDate = new Date().toLocaleDateString().replaceAll("/", "-").toString();
  const [oldDate, setOldDate] = React.useState(currentDate);

  const updateUser = (updatedUser) => {
    const updatedCurrentUser = {
      ...currentUser,
      ...updatedUser,
    };
    setCurrentUser(updatedCurrentUser);
  };

  const signOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false)
  };

  React.useEffect(() => {
    const loggedInUser = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        if (user) {
          const docRef = doc(db, "admins", user?.uid);
          const adminSnap = await getDoc(docRef);

          if (adminSnap.exists()) {
            setCurrentUser(adminSnap.data());
            setIsLoggedIn(true)

          } else {
            const docRef = doc(db, "teachers", user?.uid);
            const docSnap = await getDoc(docRef);
            setCurrentUser(docSnap.data());
            setIsLoggedIn(true)

          }
        } else {
          setCurrentUser(null);
          setIsLoggedIn(false)

        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    });

    return loggedInUser;
  }, []);

  
  return (
    <AdminContext.Provider
      value={{
        user: currentUser,
        isLoading: loading,
        updateUser,
        signOut,
        isLoggedIn,
        oldDate,
        setOldDate
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AdminContext);
