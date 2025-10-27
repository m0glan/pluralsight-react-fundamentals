import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react'
import loadingState, { type LoadingState } from '../helpers/loading-state'
import { HouseSummary } from '../types'

interface UseHousesResult {
  houses: HouseSummary[]
  setHouses: Dispatch<SetStateAction<HouseSummary[]>>
  currentLoadingState: LoadingState
  setCurrentLoadingState: Dispatch<SetStateAction<LoadingState>>
}

const useHouses = (): UseHousesResult => {
  const [ houses, setHouses ] = useState<HouseSummary[]>([])
  const [ currentLoadingState, setCurrentLoadingState ] = useState<LoadingState>(
    loadingState.isLoading,
  )

  /**
   * Second parameter of the `useEffect` call is an array of dependencies &mdash;
   * it indicates when the effect function needs to be called (_e.g.,_ when a 
   * component property changes); if the array is empty, that means the effect function
   * is only called once when the component is initially rendered.
   */
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('https://localhost:4000/house')
        const housesResponse = (await response.json()) as HouseSummary[]
        setHouses(housesResponse)
        setCurrentLoadingState(loadingState.loaded)
      } catch {
        setCurrentLoadingState(loadingState.hasErrored)
      }
    }

    void fetchHouses()
  }, [])

  return { houses, setHouses, currentLoadingState, setCurrentLoadingState }
}

export default useHouses
