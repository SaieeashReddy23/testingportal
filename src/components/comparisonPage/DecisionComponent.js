import { styled } from 'styled-components'
import { Segmented } from 'antd'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import { FaUsers } from 'react-icons/fa'
import SingleMemberSearch from './SingleMemberSearch'
import MultipleMembersSearch from './MultipleMembersSearch'

const DecisionComponent = () => {
  const [value, setValue] = useState('single')

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

  return (
    <Wrapper>
      <Segmented
        options={options}
        size="large"
        value={value}
        onChange={setValue}
        block
      />
      {value === 'single' ? <SingleMemberSearch /> : <MultipleMembersSearch />}
    </Wrapper>
  )
}
export default DecisionComponent

const Wrapper = styled.div`
  width: 50vw;
  max-width: 500px;
  margin: 5rem auto 3rem auto;
`
