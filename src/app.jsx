import { useCallback, useState } from 'react'
import './app.css'
import Banner from './components/banner'
import HouseList from './components/house-list'
import House from './components/house'

function App() {
  const [ selectedHouse, setSelectedHouse ] = useState();

  const handleHouseSelectionChanged = useCallback(house => {
    setSelectedHouse(house);
  }, []);

  return (
    <>
      <Banner>
        <div>Providing houses all over the world.</div>
      </Banner>

      {selectedHouse ? <House house={selectedHouse} /> : <HouseList onSelectionChanged={handleHouseSelectionChanged} />}
    </>
  )
}

export default App
