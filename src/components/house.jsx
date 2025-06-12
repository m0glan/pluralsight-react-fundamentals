import { useParams } from "react-router";
import currencyFormatter from "../helpers/currency-formatter";
import { useEffect, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import loadingState from "../helpers/loading-state";

const House = () => {
  const { id } = useParams();
  const [ house, setHouse ] = useState({});
  const [ currentLoadingState, setCurrentLoadingState ] = useState(loadingState.isLoading);

  useEffect(() => {
    const fetchHouse = async() => {
      try {
        const response = await fetch(`https://localhost:4000/house/${id}`);
        const house = await response.json();
        setHouse(house);
        setCurrentLoadingState(loadingState.loaded);
      } catch(err) {
        console.error("Error fetching house:", err);
        setCurrentLoadingState(loadingState.hasErrored);
      }
    }

    fetchHouse();
  })

  if (currentLoadingState === loadingState.isLoading) {
    return <LoadingIndicator loadingState={currentLoadingState} />;
  }

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <img
              className="img-fluid"
              src={
                house.photo
                  ? `./houseImages/${house.photo}.jpeg`
                  : "./defaultphoto.png"
              }
              alt="House pic"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="row mt-2">
            <h5 className="col-12">{house.country}</h5>
          </div>
          <div className="row">
            <h3 className="col-12">{house.address}</h3>
          </div>
          <div className="row">
            <h2 className="themeFontColor col-12">
              {currencyFormatter.format(house.price)}
            </h2>
          </div>
          <div className="row">
            <div className="col-12 mt-3">{house.description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default House;