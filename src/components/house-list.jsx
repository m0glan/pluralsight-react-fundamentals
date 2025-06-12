import HouseRow from "./house-row";
import Button from "./button";
import useHouses from "../hooks/use-houses";
import loadingState from "../helpers/loading-state";
import LoadingIndicator from "./loading-indicator";

const HouseList = ({ onSelectionChanged }) => {
  const { houses, setHouses, currentLoadingState, setCurrentLoadingState } = useHouses();

  if (currentLoadingState === loadingState.isLoading) {
    return <LoadingIndicator loadingState={currentLoadingState} />;
  }

  const addHouse = async () => {
    try {
      setCurrentLoadingState(loadingState.isLoading);
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
      setCurrentLoadingState(loadingState.loaded);
    } catch {
      setCurrentLoadingState(loadingState.hasErrored);
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
          {/* key attribute is important for React to identify elements in an array of elements */}
          {houses.map(h => <HouseRow key={h.id} house={h} onClick={onSelectionChanged} />)}
        </tbody>
      </table>

      <Button onClick={addHouse}>Add</Button>
    </>
  );
};

export default HouseList;