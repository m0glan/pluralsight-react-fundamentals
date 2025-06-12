import { useState, useEffect } from "react";
import loadingState from "../helpers/loading-state";

const useHouses = () => {
  const [ houses, setHouses ] = useState([]);
  const [ currentLoadingState, setCurrentLoadingState ] = useState(loadingState.isLoading);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch("https://localhost:4000/house");
        const houses = await response.json();
        setHouses(houses);
        setCurrentLoadingState(loadingState.loaded);
      } catch {
        setCurrentLoadingState(loadingState.hasErrored);
      }
    };

    fetchHouses();
  }, [])

  return { houses, setHouses, currentLoadingState, setCurrentLoadingState };
};

export default useHouses;