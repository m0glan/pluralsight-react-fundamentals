import type { LoadingState } from '../helpers/loading-state'

interface LoadingIndicatorProps {
  loadingState: LoadingState
}

const LoadingIndicator = ({ loadingState }: LoadingIndicatorProps) => {
  return <h3>{loadingState}</h3>
}

export default LoadingIndicator
