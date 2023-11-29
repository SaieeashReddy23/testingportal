import { CaretRightOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import { Collapse, theme } from 'antd'
import { styled } from 'styled-components'
import Eligv2ResponseComparison from './Eligv2ResponseComparison'
import { MdArrowBack } from 'react-icons/md'
import { myComparisonContext } from '../../pages/dashboard/Comparison'
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'Eligv2',
    children: <Eligv2ResponseComparison />,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'Coverage',
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'Network status',
    children: <p>{text}</p>,
    style: panelStyle,
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
        }}
        items={getItems(panelStyle)}
      />
    </Wrapper>
  )
}
export default ComparisonComponent

const Wrapper = styled.div``
