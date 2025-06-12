import { useEffect, useState } from "react";
import HouseRow from "./HouseRow";

const HouseList = () => {
  const [ houses, setHouses ] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://localhost:4000/house");
      const houses = await response.json();
      setHouses(houses);
    }

    fetchHouses();
  }, [])

  const addHouse = async () => {
    try {
      const response = await fetch("https://localhost:4000/house", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: "New House Address",
          country: "New Country",
          price: 1000000,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add house");
      }

      const newHouse = await response.json();
      setHouses([ ...houses, newHouse ]);
    } catch (error) {
      if (error.message) {
        window.alert(`Error adding house: "${error.message}".`);
      } else {
        window.alert("Error adding house: An unknown error occurred.");
      }
    }
  }

  return (
    <>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Country</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houses.map(h => <HouseRow key={h.id} house={h} />)} {/* key attribute is important for React to identify elements in an array of elements */}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={addHouse}>Add</button>
    </>
  );
};

export default HouseList;