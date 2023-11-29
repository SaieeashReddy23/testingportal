import { CaretRightOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { Collapse, theme } from 'antd'
import { styled } from 'styled-components'
import Eligv2ResponseComparison from './Eligv2ResponseComparison'
import { MdArrowBack } from 'react-icons/md'
import { myComparisonContext } from '../../pages/dashboard/Comparison'
const text = ` Not yet implemented `

const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'Eligv2',
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

const ComparisonComponent = () => {
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

  return (
    <Wrapper>
      <button className="back-btn" onClick={handleBackbtn}>
        <MdArrowBack />
      </button>
      <Collapse
        accordion
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
          // height: '400px',
          // overflowY: 'auto',
        }}
        items={getItems(panelStyle)}
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
`
