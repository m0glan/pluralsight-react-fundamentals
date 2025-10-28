import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { useParams } from 'react-router'
import currencyFormatter from '../helpers/currency-formatter'
import loadingState, { type LoadingState } from '../helpers/loading-state'
import LoadingIndicator from './loading-indicator'
import { Bid, HouseDetail } from '../types'
import Button from './button'

interface NewBidState {
  bidder: string
  amount: string
}

const createDefaultBidState = (): NewBidState => ({
  bidder: '',
  amount: '',
})

const House = () => {
  const { id } = useParams<{ id: string }>()
  const [ house, setHouse ] = useState<HouseDetail | null>(null)
  const [ bids, setBids ] = useState<Bid[]>([])
  const [ currentLoadingState, setCurrentLoadingState ] = useState<LoadingState>(
    loadingState.isLoading,
  )
  const [ newBid, setNewBid ] = useState<NewBidState>(createDefaultBidState())

  const [ isPending, startTransition ] = useTransition();

  const addBid = async () => {
    if (!id) {
      return;
    }

    const parsedAmount = Number.parseFloat(newBid.amount)
    if (Number.isNaN(parsedAmount)) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:4000/house/${id}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bidder: newBid.bidder,
          amount: parsedAmount,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit bid')
      }

      const createdBid = (await response.json()) as Bid;
      setBids((prevBids) => [ ...prevBids, createdBid ]);
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  }

  const submitBid = useCallback(async () => {
    startTransition(async () => await addBid());
    setNewBid(createDefaultBidState());
  }, [ id, newBid ])

  useEffect(() => {
    if (!id) {
      setCurrentLoadingState(loadingState.hasErrored);
      return;
    }

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
        setBids(bidsPayload as Bid[])
        setCurrentLoadingState(loadingState.loaded)
      } catch (error) {
        console.error('Error fetching house data:', error)
        setCurrentLoadingState(loadingState.hasErrored)
      }
    }

    void fetchData()
  }, [ id ])

  const handleInputChange = (field: keyof NewBidState) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setNewBid((prev) => ({
        ...prev,
        [field]: event.target.value,
      }))
    }
  }

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

        <div className="row">
          <div className="col-12 mt-3">
            <table>
              <thead>
                <tr>
                  <th>Bidder</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td>{bid.bidder}</td>
                    <td>{currencyFormatter.format(bid.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row">
              <div className="col-4 mt-3">
                <input
                  value={newBid.bidder}
                  onChange={handleInputChange('bidder')}
                  className="form-control"
                  placeholder="Your name"
                />
              </div>

              <div className="col-4 mt-3">
                <input
                  value={newBid.amount}
                  onChange={handleInputChange('amount')}
                  className="form-control"
                  placeholder="Your bid"
                />
              </div>

              <div className="col-2 mt-3">
                <Button onClick={submitBid} disabled={isPending}>Add</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default House
