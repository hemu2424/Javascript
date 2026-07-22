import AppRoute from './routes/AppRoute'
import { BookmarkProvider } from './providers/BookmarkProviders'
import { ThemeProvider } from './providers/ThemeProvider'

function App() {
  return (
    <>
    <ThemeProvider>
    <BookmarkProvider>
    <AppRoute/>
    </BookmarkProvider>
    </ThemeProvider>
    </>
  )
}

export default App
