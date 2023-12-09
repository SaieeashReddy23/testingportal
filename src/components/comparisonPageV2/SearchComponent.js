import { styled } from 'styled-components'
import { Form, Input, Button, DatePicker, Segmented } from 'antd'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { FaUsers } from 'react-icons/fa'
import SingleMemberSearch from './SingleMemberSearch'
import MultipleMembersSearch from './MultipleMembersSearch'
import { useContext } from 'react'

import { SET_SEARCH } from './reducer/comparisionReducer'
import { compareContext } from '../../pages/dashboard/ComparisonV2'

const options = [
  {
    label: 'Single member',
    value: 'single',
    icon: <FaUser />,
  },
  {
    label: 'Multiple members',
    value: 'multiple',
    icon: <FaUsers />,
  },
]

const SearchComponent = () => {
  const { state, dispatch } = useContext(compareContext)
  const { search } = state

  return (
    <Wrapper className="member-search-container">
      <div className="search-header">
        Verify Eligibility Apis for Single or Multiple Members
      </div>

      <div className="search-body">
        <Segmented
          options={options}
          size="large"
          style={{ marginBottom: '2rem' }}
          value={search}
          onChange={(value) => dispatch({ type: SET_SEARCH, payload: value })}
          block
        />
        {search === 'single' ? (
          <SingleMemberSearch />
        ) : (
          <MultipleMembersSearch />
        )}
      </div>
    </Wrapper>
  )
}
export default SearchComponent

const Wrapper = styled.div`
  margin: 5rem auto;
  max-width: 600px;
  border: 1px solid var(--grey-100);
  /* padding: 2rem 3rem; */
  border-radius: 0.5rem;
  transition: var(--transition);

  .search-header {
    text-align: center;
    padding: 1rem;
    letter-spacing: 0.5px;
    font-weight: 500;
    background-color: var(--grey-100);
    color: var(--grey-900);
  }

  .search-body {
    padding: 2rem 3rem;
  }
`
