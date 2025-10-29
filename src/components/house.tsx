import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import currencyFormatter from '../helpers/currency-formatter'
import loadingState, { type LoadingState } from '../helpers/loading-state'
import LoadingIndicator from './loading-indicator'
import { Bid, HouseDetail } from '../types'
import HouseBids from './house-bids'

const House = () => {
  const { id } = useParams<{ id: string }>()
  const [ house, setHouse ] = useState<HouseDetail | null>(null)
  const [ initialBids, setInitialBids ] = useState<Bid[]>([])
  
  const [ currentLoadingState, setCurrentLoadingState ] = useState<LoadingState>(
    loadingState.isLoading,
  )

  useEffect(() => {
    const fetchData = async () => {
      setCurrentLoadingState(loadingState.isLoading);

      try {
        const [ houseResponse, bidsResponse ] = await Promise.all([
          fetch(`https://localhost:4000/house/${id}`),
          fetch(`https://localhost:4000/house/${id}/bids`),
        ])

        if (!houseResponse.ok || !bidsResponse.ok) {
          throw new Error('Failed to load house details')
        }

        const [ housePayload, bidsPayload ] = await Promise.all([
          houseResponse.json(),
          bidsResponse.json(),
        ])

        setHouse(housePayload as HouseDetail)
        setInitialBids(bidsPayload as Bid[])
        setCurrentLoadingState(loadingState.loaded)
      } catch (error) {
        console.error('Error fetching house data:', error)
        setCurrentLoadingState(loadingState.hasErrored)
      }
    }

    void fetchData()
  }, [ id ])

  if (currentLoadingState !== loadingState.loaded || !house) {
    return <LoadingIndicator loadingState={currentLoadingState} />
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <img
            className="img-fluid"
            src={
              house.photo
                ? `./houseImages/${house.photo}.jpeg`
                : './defaultphoto.png'
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
            {typeof house.price === 'number'
              ? currencyFormatter.format(house.price)
              : 'Price unavailable'}
          </h2>
        </div>
        <div className="row">
          <div className="col-12 mt-3">{house.description}</div>
        </div>

        <HouseBids houseId={id!} initialBids={initialBids} />
      </div>
    </div>
  )
}

export default House
