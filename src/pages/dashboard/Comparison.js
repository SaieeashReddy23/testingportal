import { Form } from 'antd'
import { createContext, useState } from 'react'
import { styled } from 'styled-components'
import ComparisonComponent from '../../components/comparisonPage/ComparisonComponent'
import DecisionComponent from '../../components/comparisonPage/DecisionComponent'
import LoadingComponent from '../../components/comparisonPage/LoadingComponent'

export const myComparisonContext = createContext()
const Comparison = () => {
  const [loading, setLoading] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [form] = Form.useForm()

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <myComparisonContext.Provider
      value={{ form, setLoading, setShowComparison }}
    >
      <Wrapper>
        {showComparison ? <ComparisonComponent /> : <DecisionComponent />}
      </Wrapper>
    </myComparisonContext.Provider>
  )
}
export default Comparison

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
