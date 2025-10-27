import './App.css'
import Banner from './components/banner'
import ErrorBoundary from './components/error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router'
import HouseList from './components/house-list'
import House from './components/house'

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback="It's over">
        <Banner>
          <div>Providing houses all over the world.</div>
        </Banner>

        <Routes>
          <Route index element={<HouseList />} />
          <Route path="house/:id" element={<House />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
