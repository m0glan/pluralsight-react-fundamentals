import { useParams } from "react-router";
import currencyFormatter from "../helpers/currency-formatter";
import { useCallback, useEffect, useState } from "react";
import LoadingIndicator from "./loading-indicator";
import loadingState from "../helpers/loading-state";

const House = () => {
  const { id } = useParams();
  const [ house, setHouse ] = useState({});
  const [ bids, setBids ] = useState([]);
  const [ currentLoadingState, setCurrentLoadingState ] = useState(loadingState.isLoading);

  const [ newBid, setNewBid ] = useState({
    bidder: "",
    amount: ""
  })
  const [ isAddBtnDisabled, setIsAddBtnDisabled ] = useState(false);

  const submitBid = useCallback(async () => {
    const bid = {
      bidder: newBid.bidder,
      amount: parseFloat(newBid.amount)
    };

    try {
      setIsAddBtnDisabled(true);
      const response = await fetch(`https://localhost:4000/house/${id}/bid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bid)
      });

      if (!response.ok) {
        console.error("Failed to submit bid:", response.statusText);
      }

      const newBid = await response.json();
      setBids(prevBids => [...prevBids, newBid]);
      setNewBid({ bidder: "", amount: "" });
      setIsAddBtnDisabled(false);
    } catch (err) {
      console.log("Error submitting bid:", err);
    }
  });

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

    const fetchBids = async() => {
      try {
        setCurrentLoadingState(loadingState.isLoading);
        const response = await fetch(`https://localhost:4000/house/${id}/bids`);
        const bids = await response.json();
        setBids(bids);
        setCurrentLoadingState(loadingState.loaded);
      } catch(err) {
        console.error("Error fetching bids:", err);
        setCurrentLoadingState(loadingState.hasErrored);
      }
    }

    fetchHouse();
    fetchBids();
  }, [id])

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

          <div className="row">
            <div className="col12 mt-3">
              <table>
                <thead>
                  <tr>
                    <th>Bidder</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.map(b => (
                    <tr key={b.id}>
                      <td>{b.bidder}</td>
                      <td>{currencyFormatter.format(b.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">
                <div className="col-4 mt-3">
                  <input value={newBid.bidder} onChange={e => setNewBid({...newBid, bidder: e.target.value})} className="form-control" placeholder="Your name" />
                </div>

                <div className="col-4 mt-3">
                  <input value={newBid.amount} onChange={e => setNewBid({...newBid, amount: e.target.value})} className="form-control" placeholder="Your bid" />
                </div>

                <div className="col-2 mt-3">
                  <button
                    onClick={submitBid}
                    className="btn btn-primary"
                    disabled={isAddBtnDisabled}>Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default House;