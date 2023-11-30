import { CaretRightOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { Collapse, theme } from 'antd'
import { styled } from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import { myComparisonContext } from '../../pages/dashboard/Comparison'
import MyPanelHeader from './MyPanelHeader'
import { useEffect } from 'react'
import {
  stgApi,
  prodApi,
  setStageAuthHeader,
  setProdAuthHeader,
} from '../../utils/axiosConfig'
import JsonDiffViewer from './JsonDiffViewer'

const initialPanelData = [
  {
    key: '1',
    apiName: 'Elig v2',
    status: 'none',
    isLoading: true,
    prodUrl: 'https://jsonplaceholder.typicode.com/todos/5',
    stageUrl: 'https://jsonplaceholder.typicode.com/users',
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '2',
    apiName: 'Coverage',
    status: 'none',
    isLoading: true,
    prodUrl: 'https://jsonplaceholder.typicode.com/todos/5',
    stageUrl: 'https://jsonplaceholder.typicode.com/users',
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '3',
    apiName: 'Network status',
    status: 'none',
    isLoading: true,
    prodUrl: 'https://jsonplaceholder.typicode.com/todos/5',
    stageUrl: 'https://jsonplaceholder.typicode.com/users',
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '4',
    apiName: 'Member SearchV2',
    status: 'none',
    isLoading: true,
    prodUrl: 'https://jsonplaceholder.typicode.com/todos/5',
    stageUrl: 'https://jsonplaceholder.typicode.com/users',
    prodResponse: '',
    stageResponse: '',
  },
]

const ComparisonComponent = () => {
  const [transactionId, setTransactionId] = useState({ stage: '', prod: '' })
  const [panelData, setPanelData] = useState(initialPanelData)
  const { setShowComparison, form } = useContext(myComparisonContext)
  const { token } = theme.useToken()
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  const handleBackbtn = () => {
    console.log('back btn clicked')
    setShowComparison(false)
    form.resetFields()
  }

  const handleCompareAgain = async (e, panelKey) => {
    e.stopPropagation()
    console.log('transactionId', transactionId)
    const updatedPanelData = panelData.map((panel) => {
      if (panel.key === panelKey) {
        return {
          ...panel,
          isLoading: true,
          status: 'none',
        }
      }
      return panel
    })

    setPanelData([...updatedPanelData])

    try {
      await setProdAuthHeader()
      await setStageAuthHeader()

      let panelKeyData = updatedPanelData?.find(
        (panel) => panel.key === panelKey
      )

      const prodResponse = await prodApi.get(panelKeyData.prodUrl)
      const stageResponse = await stgApi.get(panelKeyData.stageUrl)

      const prodResponseString = JSON.stringify(prodResponse.data, null, 2)
      const stageResponseString = JSON.stringify(stageResponse.data, null, 2)

      const updatedPanelData = panelData.map((panel) => {
        if (panel.key === panelKey) {
          return {
            ...panel,
            prodResponse: prodResponseString,
            stageResponse: stageResponseString,
            isLoading: false,
            status: 'success',
          }
        }
        return panel
      })
      setPanelData([...updatedPanelData])
    } catch (error) {
      console.log(error)
      const updatedPanelData = panelData.map((panel) => {
        if (panel.key === panelKey) {
          return {
            ...panel,
            prodResponse: '',
            stageResponse: '',
            isLoading: false,
            status: 'error',
          }
        }
        return panel
      })
      setPanelData([...updatedPanelData])
    }
  }

  const getItems = (data) => {
    return data.map((panel) => {
      return {
        key: panel.key,
        label: <MyPanelHeader {...panel} />,
        children: <JsonDiffViewer panel={panel} setPanelData={setPanelData} />,
        style: panelStyle,
        extra: !panel.isLoading && (
          <span
            className="compare-again"
            onClick={(e) => handleCompareAgain(e, panel.key)}
          >
            Compare Again
          </span>
        ),
      }
    })
  }

  const fetchPanelApisData = async () => {
    try {
      await setProdAuthHeader()
      await setStageAuthHeader()
      const data = await Promise.all(
        panelData.map(async (panel) => {
          try {
            const prodResponse = await prodApi.get(
              `https://jsonplaceholder.typicode.com/todos/5`
            )
            const stageResponse = await stgApi.get(
              `https://jsonplaceholder.typicode.com/users`
            )
            const prodResponseString = JSON.stringify(
              prodResponse.data,
              null,
              2
            )
            const stageResponseString = JSON.stringify(
              stageResponse.data,
              null,
              2
            )
            return {
              ...panel,
              prodResponse: prodResponseString,
              stageResponse: stageResponseString,
              isLoading: false,
              status: 'success',
            }
          } catch (error) {
            console.log(error)
            return {
              ...panel,
              isLoading: false,
              status: 'error',
            }
          }
        })
      )
      setPanelData(data)
    } catch (error) {
      console.log(error)
      const data = panelData.map((panel) => {
        return {
          ...panel,
          isLoading: false,
          status: 'error',
        }
      })
      setPanelData(data)
    }
  }

  const fetchEligV2AndThenRemainingApis = async () => {
    try {
      await setProdAuthHeader()
      await setStageAuthHeader()

      // Elig v2 call
      const prodResponse = await prodApi.get(panelData[0].prodUrl)
      const stageResponse = await stgApi.get(panelData[0].stageUrl)

      let updatedTransactionId = {
        ...transactionId,
        prod: prodResponse.data.transactionId,
        stage: stageResponse.data.transactionId,
      }

      const prodResponseString = JSON.stringify(prodResponse.data, null, 2)
      const stageResponseString = JSON.stringify(stageResponse.data, null, 2)

      const updatedPanelData = panelData.map((panel) => {
        if (panel.key === '1') {
          return {
            ...panel,
            prodResponse: prodResponseString,
            stageResponse: stageResponseString,
            isLoading: false,
            status: 'success',
          }
        }
        return panel
      })

      hitOtherApisDependedOnEligV2(updatedPanelData, updatedTransactionId)
      setPanelData([...updatedPanelData])
      setTransactionId({ ...updatedTransactionId })
    } catch (error) {
      console.log(error)
      const updatedPanelData = panelData.map((panel) => {
        return {
          ...panel,
          prodResponse: '',
          stageResponse: '',
          isLoading: false,
          status: 'error',
        }
      })
      setPanelData([...updatedPanelData])
    }
  }

  const hitOtherApisDependedOnEligV2 = async (
    updatedPanelData,
    updatedTransactionId
  ) => {
    try {
      console.log('updatedTransactionId', updatedTransactionId)
      const data = await Promise.all(
        updatedPanelData.map(async (panel) => {
          try {
            if (panel.key === '1') {
              return { ...panel }
            }

            const prodResponse = await prodApi.get(panel.prodUrl)
            const stageResponse = await stgApi.get(panel.stageUrl)
            const prodResponseString = JSON.stringify(
              prodResponse.data,
              null,
              2
            )
            const stageResponseString = JSON.stringify(
              stageResponse.data,
              null,
              2
            )
            return {
              ...panel,
              prodResponse: prodResponseString,
              stageResponse: stageResponseString,
              isLoading: false,
              status: 'success',
            }
          } catch (error) {
            console.log(error)
            return {
              ...panel,
              isLoading: false,
              status: 'error',
            }
          }
        })
      )
      setPanelData(data)
    } catch (error) {
      console.log(error)
      const data = panelData.map((panel) => {
        if (panel.key === '1') {
          return { ...panel }
        }
        return {
          ...panel,
          isLoading: false,
          status: 'error',
        }
      })
      setPanelData(data)
    }
  }

  useEffect(() => {
    console.log('panelData', panelData)
  }, [panelData])

  useEffect(() => {
    // fetchPanelApisData()
    fetchEligV2AndThenRemainingApis()
  }, [])

  return (
    <Wrapper>
      <button className="back-btn" onClick={handleBackbtn}>
        <MdArrowBack />
      </button>
      <Collapse
        accordion
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
          // height: '400px',
          // overflowY: 'auto',
        }}
        // items={getItems(panelStyle)}
        items={getItems(panelData)}
      />
    </Wrapper>
  )
}
export default ComparisonComponent

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 1rem;

  .back-btn {
    display: grid;
    place-items: center;
    background-color: var(--white);
    padding: 0.25rem 0.75rem;
    font-size: 1.2rem;
    border: 1px solid var(--grey-300);
    border-radius: 0.5rem;
    color: var(--grey-600);
    margin: 1rem 0;
    cursor: pointer;
    transition: var(--transition);
    justify-self: start;
  }

  .back-btn:hover {
    transform: scale(1.05);
  }

  .compare-again {
    display: grid;
    place-items: center;
    background-color: var(--white);
    padding: 0.1rem 0.75rem;
    font-size: 0.8rem;
    border: 1px solid var(--grey-300);
    border-radius: 0.5rem;
    color: var(--grey-600);
    cursor: pointer;
    transition: var(--transition);
  }

  .icon {
    display: grid;
    place-items: center;
    font-size: 1.3rem;
  }
`
