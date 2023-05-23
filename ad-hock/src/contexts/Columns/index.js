"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import reducer from "./reducer";

const ColumnContext = createContext("");

const initialState = [];

const ColumnProvider = ({ children }) => {
  const [fields, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [fields, dispatch], [fields, dispatch]);

  return (
    <ColumnContext.Provider value={value}>{children}</ColumnContext.Provider>
  );
};

export default ColumnProvider;

export const useColumnsContext = () => useContext(ColumnContext);
