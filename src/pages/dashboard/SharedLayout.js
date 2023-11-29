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
      <main className="main-layout">
        <Sidebar sidebar={sidebarIsOpen} />
        <div className="content-layout">
          <Navbar setSidebarIsOpen={setSidebarIsOpen} sidebar={sidebarIsOpen} />
          {/* <div className="dashboard-page"> */}
          <Outlet />
          {/* </div> */}
        </div>
      </main>
    </Wrapper>
  )
}
export default SharedLayout

const Wrapper = styled.section`
  background-color: var(--white);
  border-radius: 0.5rem;
  height: 100vh;
  padding: 0 0.5rem;

  .main-layout {
    display: flex;
    width: 100vw;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }

  .content-layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .dashboard-page {
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
`
