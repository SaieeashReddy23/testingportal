import { styled } from 'styled-components'

import { Form, Input, Button, DatePicker, Select } from 'antd'
import { useContext, useState } from 'react'

import {
  SEARCH_CRITERIA_ID_DOB,
  SEARCH_CRITERIA_ID_NAME,
  SEARCH_CRITERIA_NAME_DOB,
} from '../../utils/constants'
import {
  SET_SEARCH_CRITERIA,
  SET_SHOW_RESULTS,
} from './reducer/comparisionReducer'
import { compareContext } from '../../pages/dashboard/ComparisonV2'

const { Option } = Select

const SingleMemberSearch = () => {
  const { state, dispatch } = useContext(compareContext)

  const { searchCriteria } = state

  const [form] = Form.useForm()

  const handleSelectChange = (value) => {
    dispatch({ type: SET_SEARCH_CRITERIA, payload: value })
  }

  const renderFormItems = () => {
    if (!searchCriteria) {
      return null
    }
    let formItems
    if (searchCriteria === SEARCH_CRITERIA_ID_DOB) {
      formItems = (
        <div className="search-form-row-2-col">
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
            <Input />
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
            <DatePicker
              placeholder=""
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>
      )
    } else if (searchCriteria === SEARCH_CRITERIA_ID_NAME) {
      formItems = (
        <div className="search-form-row-3-col">
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
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      )
    } else if (searchCriteria === SEARCH_CRITERIA_NAME_DOB) {
      // Render form items for option3
      formItems = (
        <div className="search-form-row-3-col">
          <Form.Item
            label="First Name"
            name="firstName"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input />
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
            <DatePicker
              placeholder=""
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>
      )
    }
    // Add more conditions for other options as needed

    return formItems
  }

  const onFinishFailed = (errorInfo) => {}

  const onFinish = async (values) => {
    dispatch({ type: SET_SHOW_RESULTS, payload: values })
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
          name="selectOption"
          label="Search Criteria"
          initialValue={SEARCH_CRITERIA_ID_DOB}
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <Select onChange={handleSelectChange}>
            <Option value={SEARCH_CRITERIA_ID_DOB}>
              Member ID & Date of Birth
            </Option>
            <Option value={SEARCH_CRITERIA_ID_NAME}>
              Member ID & Member Name
            </Option>
            <Option value={SEARCH_CRITERIA_NAME_DOB}>
              Member Name & Date of Birth
            </Option>
          </Select>
        </Form.Item>

        <hr className="div-line" />

        {renderFormItems()}

        <div className="search-form-row-2-col">
          <Form.Item
            label="First Service Date"
            name="startDate"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your start Date',
              },
            ]}
          >
            <DatePicker
              placeholder=""
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Last Service Date"
            name="endDate"
            style={{ fontWeight: 500 }}
            rules={[
              {
                required: true,
                message: 'Please input your End Date',
              },
            ]}
          >
            <DatePicker
              placeholder=""
              format="DD-MM-YYYY"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

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
  .search-form-row-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2rem;
  }

  .search-form-row-3-col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    gap: 2rem;
  }

  .div-line {
    border: 1px solid var(--grey-50);
    margin: 1rem 0;
  }
`
