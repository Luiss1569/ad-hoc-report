"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import reducer from "./reducer";

const FilterContext = createContext("");

const initialState = [
  {
    id: 1,
    field: "",
    operator: "",
    value: "",
    logic: "and",
  },
];

const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [filters, dispatch], [filters, dispatch]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFiltersContext = () => useContext(FilterContext);
