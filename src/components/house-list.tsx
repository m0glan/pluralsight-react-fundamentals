import Button from './button'
import HouseRow from './house-row'
import useHouses from '../hooks/use-houses'
import { useNavigate } from 'react-router'

const HouseList = () => {
  const { houses } = useHouses()

  const navigate = useNavigate();

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

      <Button onClick={() => navigate('/house/add')}>Add</Button>
    </>
  )
}

export default HouseList
