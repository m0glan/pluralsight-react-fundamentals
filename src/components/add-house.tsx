import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingIndicator from "./loading-indicator";
import loadingState, { LoadingState } from "../helpers/loading-state";
import Button from "./button";

function AddHouse () {
  const navigate = useNavigate();

  const [ currentLoadingState, setCurrentLoadingState ] = useState<LoadingState | null>();

  const [ address, setAddress ] = useState<string>('');
  const [ country, setCountry ] = useState<string>('Czechia');
  const [ price, setPrice ] = useState<string>('');

  const handleSubmit = async () => {
    try {
      setCurrentLoadingState(loadingState.isLoading);

      const response = await fetch('https://localhost:4000/house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, country, price }),
      })

      if (!response.ok) {
        throw new Error('Failed to add house')
      }

      setCurrentLoadingState(loadingState.loaded);
    } catch (err) {
      setCurrentLoadingState(loadingState.hasErrored);
    }
  }

  switch (currentLoadingState) {
    case loadingState.hasErrored:
      alert('Something went wrong :( Try again later');
      setCurrentLoadingState(null);
      break;
    case loadingState.isLoading:
      <LoadingIndicator loadingState={currentLoadingState} />
      break;
    case loadingState.loaded:
      alert('Success!');
      setCurrentLoadingState(null);
      navigate('/');
      break;
    default:
        return (
          <form>
            <label htmlFor="name">Address:</label>
            <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />

            <label htmlFor="country">Country:</label>
            <input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)} />

            <label htmlFor="price">Price:</label>
            <input type="text" name="price" value={price} onChange={e => setPrice(e.target.value)} />

            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        )
  }

  if (currentLoadingState === loadingState.isLoading) {
    return <LoadingIndicator loadingState={currentLoadingState} />
  }
}

export default AddHouse;