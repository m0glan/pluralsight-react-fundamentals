const loadingState = {
  loaded: 'Loaded',
  isLoading: 'Loading...',
  hasErrored: 'An error occurred while loading.',
} as const

export type LoadingState = (typeof loadingState)[keyof typeof loadingState]

export default loadingState
