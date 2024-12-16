import React, { createContext, useState} from "react";

export const UserContext = createContext();

// create a provider component 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};