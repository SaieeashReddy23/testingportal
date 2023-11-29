import { Button, Form } from 'antd'
import { styled } from 'styled-components'
import MemberSearchComponent from '../../components/MemberSearchComponent'
import collection from '../../assets/data/automation.json'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import JsonDiffViewer from '../../components/JsonDiffViewer'

export const myContext = createContext()

const MemberSearch = () => {
  const [form] = Form.useForm()
  const [report, setReport] = useState('')
  const [loading, setLoading] = useState(false)

  const openReport = () => {
    const newWindow = window.open('', '_blank')
    console.log(newWindow)
    newWindow.document.write(report)
  }

  return (
    <myContext.Provider
      value={{ form, report, setReport, loading, setLoading }}
    >
      <Wrapper>
        {/* <JsonDiffViewer /> */}
        <MemberSearchComponent />

        {loading ? (
          <div className="loading"></div>
        ) : (
          report && (
            <div className="report-gen">
              Your Report is generated pls{' '}
              <span onClick={openReport}>click me </span> to open it
            </div>
          )
        )}
      </Wrapper>
    </myContext.Provider>
  )
}
export default MemberSearch

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
