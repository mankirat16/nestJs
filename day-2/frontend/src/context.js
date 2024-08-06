import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socketId, setSocketId] = useState();
  return (
    <UpdateContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        socketId,
        setSocketId,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
