import { Button, Form } from 'antd'
import { styled } from 'styled-components'
import MemberSearchComponent from '../../components/MemberSearchComponent'
import collection from '../../assets/data/automation.json'
import { createContext, useEffect, useReducer, useState } from 'react'
import SearchComponent from '../../components/memberSearchPage/SearchComponent'
import { memberSearchReducer } from '../../components/memberSearchPage/reducer/memberSearchReducer'
import ResultsComponent from '../../components/memberSearchPage/ResultsComponent'

export const memberSearchContext = createContext()

const initialState = {
  collection: [],
  loading: false,
  error: null,
  search: 'single',
  searchCriteria: 'option1',
  showResults: false,
  searchData: {},
}

const MemberSearch = () => {
  const [state, dispatch] = useReducer(memberSearchReducer, initialState)

  return (
    <memberSearchContext.Provider value={{ state, dispatch }}>
      <Wrapper>
        {state?.showResults ? <ResultsComponent /> : <SearchComponent />}
      </Wrapper>
    </memberSearchContext.Provider>
  )
}
export default MemberSearch

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  overflow-y: auto;
`

// const openReport = () => {
//   const newWindow = window.open('', '_blank')
//   console.log(newWindow)
//   newWindow.document.write(report)
// }
