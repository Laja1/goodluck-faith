// FoodContext.js
import React, { createContext, useState, useContext } from 'react';

const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState(null);

  return (
    <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
