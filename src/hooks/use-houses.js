import { useState, useEffect } from "react";

const useHouses = () => {
  const [ houses, setHouses ] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://localhost:4000/house");
      const houses = await response.json();
      setHouses(houses);
    };

    fetchHouses();
  }, [])

  return { houses, setHouses };
};

export default useHouses;