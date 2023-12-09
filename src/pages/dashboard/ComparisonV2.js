import { styled } from 'styled-components'
import { createContext, useReducer } from 'react'

import { comparisonReducer } from '../../components/comparisonPageV2/reducer/comparisionReducer'
import SearchComponent from '../../components/comparisonPageV2/SearchComponent'
import ResultsComponent from '../../components/comparisonPageV2/ResultsComponent'

export const compareContext = createContext()

const initialState = {
  collection: [],
  loading: false,
  error: null,
  search: 'single',
  searchCriteria: 'option1',
  showResults: false,
  searchData: {},
}

const ComparisonV2 = () => {
  const [state, dispatch] = useReducer(comparisonReducer, initialState)

  return (
    <compareContext.Provider value={{ state, dispatch }}>
      <Wrapper>
        {state?.showResults ? <ResultsComponent /> : <SearchComponent />}
      </Wrapper>
    </compareContext.Provider>
  )
}
export default ComparisonV2

const Wrapper = styled.div`
  height: calc(100vh - 4rem);
  margin-top: 4rem;
  overflow-y: auto;
`
