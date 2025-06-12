import { useCallback, useState } from 'react'
import './app.css'
import Banner from './components/banner'
import ErrorBoundary from './components/error-boundary'
import navigationValues from './navigation/navigation-values'
import navigationContext from './navigation/navigation-context'
import ComponentPicker from './components/component-picker'

function App() {
  const navigate = useCallback((target, param) => setNavigation({ currentLocation: target, param, navigate }), []);

  const [ navigation, setNavigation ] = useState({ currentLocation: navigationValues.home, navigate });

  return (
    <navigationContext.Provider value={navigation}>
      <ErrorBoundary fallback="It's over">
        <Banner>
          <div>Providing houses all over the world.</div>
        </Banner>

        <ComponentPicker currentNavigationLocation={navigation.currentLocation} />
      </ErrorBoundary>
    </navigationContext.Provider>
  )
}

export default App
