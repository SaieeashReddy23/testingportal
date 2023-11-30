import { CaretRightOutlined } from '@ant-design/icons'
import React, { useContext, useState } from 'react'
import { Collapse, theme } from 'antd'
import { styled } from 'styled-components'
import Eligv2ResponseComparison from './Eligv2ResponseComparison'
import { MdArrowBack } from 'react-icons/md'
import { myComparisonContext } from '../../pages/dashboard/Comparison'
import MyPanelHeader from './MyPanelHeader'
import { useEffect } from 'react'
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io'
import axios from 'axios'
const text = ` Not yet implemented `
const { Panel } = Collapse

const getItems = (panelStyle) => [
  {
    key: '1',
    label: <MyPanelHeader title="Elig v2" />,
    children: <Eligv2ResponseComparison />,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '2',
    label: 'Coverage',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '3',
    label: 'Network status',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '4',
    label: 'Eligv2',
    children: <Eligv2ResponseComparison />,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '5',
    label: 'Coverage',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '6',
    label: 'Network status',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '7',
    label: 'Eligv2',
    children: <Eligv2ResponseComparison />,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '8',
    label: 'Coverage',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '9',
    label: 'Network status',
    children: <p>{text}</p>,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
  {
    key: '10',
    label: 'Eligv2',
    children: <Eligv2ResponseComparison />,
    style: panelStyle,
    extra: <span className="compare-again">Compare Again</span>,
  },
]

const initialPanelData = [
  {
    key: '1',
    apiName: 'Elig v2',
    status: 'none',
    isLoading: true,
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '2',
    apiName: 'Coverage',
    status: 'none',
    isLoading: true,
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '3',
    apiName: 'Network status',
    status: 'none',
    isLoading: true,
    prodResponse: '',
    stageResponse: '',
  },
  {
    key: '4',
    apiName: 'Member SearchV2',
    status: 'none',
    isLoading: true,
    prodResponse: '',
    stageResponse: '',
  },
]

const ComparisonComponent = () => {
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
      const prodResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/5`
      )
      const stageResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      )
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
        children: (
          <Eligv2ResponseComparison panel={panel} setPanelData={setPanelData} />
        ),
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
    const data = await Promise.all(
      panelData.map(async (panel) => {
        try {
          const prodResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/5`
          )
          const stageResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/users`
          )
          const prodResponseString = JSON.stringify(prodResponse.data, null, 2)
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
  }

  useEffect(() => {
    console.log('panelData', panelData)
  }, [panelData])

  useEffect(() => {
    fetchPanelApisData()
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
