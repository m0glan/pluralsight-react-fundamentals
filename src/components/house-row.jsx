import currencyFormatter from "../helpers/currency-formatter";
import { useNavigate } from "react-router";

const HouseRow = ({ house }) => {
  const navigate = useNavigate(); 

  return (
    <tr className="clickable" onClick={() => navigate(`/house/${house.id}`)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price &&
        <td className={`${house.price > 500_000 ? 'text-primary' : ''}`}>{currencyFormatter.format(house.price)}</td>}
    </tr>
  );
}

export default HouseRow;