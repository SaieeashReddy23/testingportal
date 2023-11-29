import { Switch } from 'antd'

import { RiArrowDropDownLine } from 'react-icons/ri'
import { AiOutlineBell, AiOutlineRight } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { styled } from 'styled-components'
import profilePic from '../../assets/images/profile.jpg'
import { AiOutlineLeft } from 'react-icons/ai'

import { Input } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Search } = Input

const Navbar = ({ setSidebarIsOpen, sidebar }) => {
  const navigate = useNavigate()
  const firstName = 'John'
  const vendorData = {
    profilePicURL: profilePic,
  }

  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const NotificationClick = () => {
    navigate('/notifications')
  }

  return (
    <Wrapper>
      {/* <span
        className="close-sidebar"
        onClick={() => setSidebarIsOpen((value) => !value)}
      >
        {sidebar ? <AiOutlineLeft /> : <AiOutlineRight />}
      </span> */}
      <div className="left-content">
        {/* <Search
          placeholder="search warehouse"
          onSearch={onSearch}
          enterButton
        /> */}
      </div>
      <div className="right-content">
        <div className="notification-container">
          <div className="notification-inner-container">
            <span className="notification-icon">
              <AiOutlineBell onClick={NotificationClick} />
            </span>
            <span className="notification-count">2</span>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-pic-container-settings">
            {vendorData.profilePicURL ? (
              <img
                src={vendorData.profilePicURL}
                alt="pic"
                className="profile-pic"
              />
            ) : (
              <span className="upload-image-icon">
                <BsFillPersonFill />
              </span>
            )}
          </div>
          <div className="profile-text-content">
            <div className="name-container">
              <div className="profile-name">{firstName}</div>
              <span className="dropdown-icon">
                <RiArrowDropDownLine />
              </span>
            </div>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Navbar

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  padding: 0 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid var(--grey-100);
  position: sticky;
  top: 0;
  z-index: 1;

  .left-content {
    font-weight: 600;
    font-size: 1.2rem;
    padding-left: 1rem;
  }

  .name {
    font-weight: 700;
  }

  .right-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;
  }

  .notification-container {
    border-right: 1px solid var(--grey-200);
    padding-right: 1rem;
  }

  .notification-inner-container {
    position: relative;
  }

  .notification-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    display: grid;
    place-items: center;
  }

  .notification-count {
    position: absolute;
    display: grid;
    top: -0.2rem;
    right: -0.15rem;
    place-items: center;
    background-color: var(--primary-500);
    color: var(--white);
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    font-size: 0.7rem;
  }

  .profile-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .profile-pic-container-settings {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0 auto;
    border: 2px solid var(--grey-100);
    position: relative;
    background-color: var(--grey-100);
  }

  .upload-image-icon {
    font-size: 2rem;
    color: var(--white);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }

  .profile-pic-edit-icon {
    background-color: var(--primary-500);
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 50%;
    color: var(--white);
    display: grid;
    place-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .img-container {
    position: relative;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }

  .profile-pic {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .active-dot {
    height: 0.5rem;
    width: 0.5rem;
    position: absolute;
    background-color: var(--primary-500);
    border-radius: 50%;
    bottom: 1px;
    right: 5px;
  }

  .profile-text-content {
  }

  .name-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .profile-name {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .dropdown-icon {
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .profile-role {
    font-size: 0.7rem;
    color: var(--grey-500);
  }

  .logout-btn {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: var(--red-dark);
    letter-spacing: 1px;
    font-weight: 500;
    font-size: 0.8rem;
    transition: var(--transition);
  }

  .logout-btn:hover {
    transform: scale(1.1);
  }
`
