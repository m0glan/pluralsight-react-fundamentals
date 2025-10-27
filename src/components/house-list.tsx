import Button from './button'
import HouseRow from './house-row'
import LoadingIndicator from './loading-indicator'
import loadingState from '../helpers/loading-state'
import useHouses from '../hooks/use-houses'
import type { HouseSummary } from '../types'

const HouseList = () => {
  const {
    houses,
    setHouses,
    currentLoadingState,
    setCurrentLoadingState,
  } = useHouses()

  if (currentLoadingState === loadingState.isLoading) {
    return <LoadingIndicator loadingState={currentLoadingState} />
  }

  const addHouse = async () => {
    try {
      setCurrentLoadingState(loadingState.isLoading)
      const response = await fetch('https://localhost:4000/house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: 'New House Address',
          country: 'New Country',
          price: 1_000_000,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add house')
      }

      const newHouse = (await response.json()) as HouseSummary
      setHouses([ ...houses, newHouse ])
      setCurrentLoadingState(loadingState.loaded)
    } catch {
      setCurrentLoadingState(loadingState.hasErrored)
    }
  }

  if (currentLoadingState === loadingState.hasErrored) {
    return <LoadingIndicator loadingState={currentLoadingState} />
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
          {houses.map((house) => (
            <HouseRow key={house.id} house={house} />
          ))}
        </tbody>
      </table>

      <Button onClick={addHouse}>Add</Button>
    </>
  )
}

export default HouseList
