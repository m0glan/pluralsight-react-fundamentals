import currencyFormatter from "../helpers/currency-formatter";

const HouseRow = ({ house, onClick }) => {
  return (
    <tr onClick={() => onClick(house)} className="clickable">
      <td>{house.address}</td>
      <td>{house.country}</td>
      {house.price &&
        <td className={`${house.price > 500_000 ? 'text-primary' : ''}`}>{currencyFormatter.format(house.price)}</td>}
    </tr>
  );
}

export default HouseRow;