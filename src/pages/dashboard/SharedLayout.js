import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const SharedLayout = () => {
  const idToken = '123'

  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  if (!idToken) {
    return <Navigate to="/login" />
  }

  return (
    <Wrapper>
      <Sidebar sidebar={sidebarIsOpen} />
      <div className="main-content">
        <Navbar setSidebarIsOpen={setSidebarIsOpen} sidebar={sidebarIsOpen} />
        <Outlet />
      </div>
    </Wrapper>
  )
}
export default SharedLayout

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  overflow: hidden;

  .main-content {
    flex: 1;
    overflow-y: auto;
  }
`
