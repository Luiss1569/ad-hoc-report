"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import reducer from "./reducer";

const SortContext = createContext("");

const initialState = [];

const SortProvider = ({ children }) => {
  const [sorts, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [sorts, dispatch], [sorts, dispatch]);

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export default SortProvider;

export const useSortsContext = () => useContext(SortContext);
