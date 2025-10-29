import { useActionState } from 'react';
import { Bid } from '../types'
import currencyFormatter from '../helpers/currency-formatter';
import Button from './button';

interface HouseBidsProps { houseId: string, initialBids: Bid[] }

interface AddBidState {
  bids: Bid[];
  error?: string;
}

function HouseBids({ houseId, initialBids }: HouseBidsProps) {
  async function addBid(prevState: AddBidState, formData: FormData): Promise<AddBidState> {
    const newBid = {
      bidder: formData.get('bidder')?.toString() ?? '',
      amount: formData.get('amount')?.toString() ?? '',
    }

    const parsedAmount = Number.parseFloat(newBid.amount)
    if (Number.isNaN(parsedAmount)) {
      return {
        error: 'Invalid amount.',
        bids: prevState.bids
      }
    }

    try {
      const response = await fetch(`https://localhost:4000/house/${houseId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBid),
      })

      if (!response.ok) {
        return {
          error: 'A network error occurred.',
          bids: prevState.bids
        }
      }

      const createdBid = (await response.json()) as Bid;
      return { bids: [ ...prevState.bids, createdBid ] };
    } catch (error) {
      return {
        error: 'An unexpected error occurred.',
        bids: prevState.bids
      };
    }
  }

  const [ addBidResult, addBidAction, isAddBidPending ] =
    useActionState<AddBidState, FormData>(addBid, { bids: initialBids });

  return (
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
            {addBidResult?.bids?.map((bid) => (
              <tr key={bid.id}>
                <td>{bid.bidder}</td>
                <td>{currencyFormatter.format(bid.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <form className="row" action={addBidAction}>
          <div className="col-4 mt-3">
            <input
              id="bidder"
              name="bidder"
              className="form-control"
              placeholder="Your name"
              disabled={isAddBidPending}
            />
          </div>

          <div className="col-4 mt-3">
            <input
              id="amount"
              name="amount"
              className="form-control"
              placeholder="Your bid"
              disabled={isAddBidPending}
            />
          </div>

          <div className="col-2 mt-3">
            <Button type="submit" disabled={isAddBidPending}>Add</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HouseBids;