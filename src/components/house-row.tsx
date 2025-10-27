import { useNavigate } from 'react-router'
import currencyFormatter from '../helpers/currency-formatter'
import { HouseSummary } from '../types'

interface HouseRowProps {
  house: HouseSummary
}

const HouseRow = ({ house }: HouseRowProps) => {
  const navigate = useNavigate()
  const hasPrice = typeof house.price === 'number'

  return (
    <tr className="clickable" onClick={() => navigate(`/house/${house.id}`)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {hasPrice && (
        <td className={house.price! > 500_000 ? 'text-primary' : ''}>
          {currencyFormatter.format(house.price!)}
        </td>
      )}
    </tr>
  )
}

export default HouseRow
