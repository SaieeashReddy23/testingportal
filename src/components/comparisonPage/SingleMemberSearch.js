import { Button, DatePicker, Form, Input } from 'antd'
import axios from 'axios'
import { useContext } from 'react'
import { styled } from 'styled-components'
import { myComparisonContext } from '../../pages/dashboard/Comparison'

const SingleMemberSearch = () => {
  const { form, setLoading, setShowComparison } =
    useContext(myComparisonContext)

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onFinish = async (values) => {
    console.log('Success:', values)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowComparison(true)
    }, 2000)
  }
  return (
    <Wrapper className="member-search-container">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="MemberId"
          name="memberId"
          style={{ fontWeight: 500 }}
          rules={[
            {
              required: true,
              message: 'Please input your MemberId!',
            },
          ]}
        >
          <Input placeholder="Enter MemberId" />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          style={{ fontWeight: 500 }}
          rules={[
            {
              required: true,
              message: 'Please input your Date of birth!',
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            // disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}
export default SingleMemberSearch

const Wrapper = styled.div`
  width: 40vw;
  max-width: 500px;
  margin: 5rem auto 3rem auto;
  border: 1px solid var(--grey-100);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }
`
