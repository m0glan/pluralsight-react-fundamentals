import { useContext } from "react";
import currencyFormatter from "../helpers/currency-formatter";
import navigationContext from "../navigation/navigation-context";
import navigationValues from "../navigation/navigation-values";

const HouseRow = ({ house }) => {
  const { navigate } = useContext(navigationContext); 

  return (
    <tr className="clickable" onClick={() => navigate(navigationValues.house, house)}>
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price &&
        <td className={`${house.price > 500_000 ? 'text-primary' : ''}`}>{currencyFormatter.format(house.price)}</td>}
    </tr>
  );
}

export default HouseRow;