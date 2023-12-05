import React from "react";

const AdminContext = React.createContext();

export const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

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
