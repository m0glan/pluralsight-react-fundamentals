import { useState } from "react";
import HouseRow from "./HouseRow";

const housesArray = [
  {
    id: 1,
    address: "12 Valley of Kings, Geneva",
    country: "Switzerland",
    price: 900000,
  },
  {
    id: 2,
    address: "89 Road of Forks, Bern",
    country: "Switzerland",
    price: 500000,
  },
];

const HouseList = () => {
  const [ houses, setHouses ] = useState(housesArray);
  
  const addHouse = () => {
    setHouses([ ...houses, {
      id: houses.length + 1,
      address: "New House Address",
      country: "New Country",
      price: 1000000,
    } ])
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