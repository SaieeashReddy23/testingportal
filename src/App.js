import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Comparison from './pages/dashboard/Comparison'
import Dashboard from './pages/dashboard/Dashboard'
import History from './pages/dashboard/History'
import MemberSearch from './pages/dashboard/MemberSearch'
import Settings from './pages/dashboard/Settings'
import SharedLayout from './pages/dashboard/SharedLayout'
import Error from './pages/Error'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  useEffect(() => {
    const isWindows = navigator.userAgent.includes('Windows')
    if (isWindows) {
      document.documentElement.style.fontSize = '12.8px'
    }
    return () => {
      document.documentElement.style.fontSize = ''
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/search" element={<MemberSearch />} />
          <Route path="/history" element={<History />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  )
}

export default App
