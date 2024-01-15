import { auth, db } from "config/firerBase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const AdminContext = React.createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

  console.log(currentUser);

  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    if (loading === true) {
      setLoading(false);
    }
  }, 2000);

  const updateUser = (updatedUser) => {
    const updatedCurrentUser = {
      ...currentUser,
      ...updatedUser,
    };
    setCurrentUser(updatedCurrentUser);
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  React.useEffect(() => {
    const loggedInUser = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        if (user) {
          // console.log(user?.uid, "Signed In Student");
          const docRef = doc(db, "admins", user?.uid);
          const adminSnap = await getDoc(docRef);
          if (adminSnap.exists) {
            setCurrentUser(adminSnap.data());
          } else {
            const docRef = doc(db, "teachers", user?.uid);
            const docSnap = await getDoc(docRef);
            setCurrentUser(docSnap.data());
          }
        } else {
          console.log("Signed out");
          setCurrentUser(null);
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AdminContext);
