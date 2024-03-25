import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <Outlet />
  )
}

export default App
