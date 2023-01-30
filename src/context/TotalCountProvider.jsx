import React, { createContext } from "react";
import useCountFunction from "../hooks/useCountFunction";

export const CountContext = createContext(null);

const CountContextProvider = ({ children }) => {
  const allContext = useCountFunction();
  return (
    <CountContext.Provider value={allContext}>{children}</CountContext.Provider>
  );
};

export default CountContextProvider;
