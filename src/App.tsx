import { AppRouter } from './app/AppRouter'
import { LocaleProvider } from './lib/locale'

function App() {
  return (
    <LocaleProvider>
      <AppRouter />
    </LocaleProvider>
  )
}

export default App
