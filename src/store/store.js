import React, { useState } from "react";

export const ClothingCollectionContext = React.createContext();

export const ClothingCollectionProvider = ({ children }) => {
  const [clothingCollection, setClothingCollection] = useState([]);
  const [currentSex, setCurrentSex] = useState(null);

  return (
    <ClothingCollectionContext.Provider value={[clothingCollection, setClothingCollection, currentSex, setCurrentSex]}>
      {children}
    </ClothingCollectionContext.Provider>
  );
};