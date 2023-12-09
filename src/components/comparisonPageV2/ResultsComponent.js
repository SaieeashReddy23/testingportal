import { Descriptions } from 'antd'
import axios from 'axios'
import { MdArrowBack } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { styled } from 'styled-components'
import { memberSearchContext } from '../../pages/dashboard/MemberSearch'
import JsonViewer from '../common/JsonViewer'
import {
  SEARCH_CRITERIA_ID_DOB,
  SEARCH_CRITERIA_ID_NAME,
  SEARCH_CRITERIA_NAME_DOB,
} from '../../utils/constants'
import TransactionIdDependentResultComponent from './resultComponents/TransactionIdDependentResultComponent'
import { compareContext } from '../../pages/dashboard/ComparisonV2'
import { BACK_TO_SEARCH } from './reducer/comparisionReducer'
import JsonDiffViewer from '../common/JsonDiffViewer'

const transactionIdDependedntApis = [
  {
    title: 'Coverage Attributes',
    url: 'https://eligv2-dev.carefirst.com/eligibility/coverage-attributes',
  },
  {
    title: 'Network status',
    url: 'https://eligv2-dev.carefirst.com/eligibility/network-status',
  },
  {
    title: 'Benefit Summary',
    url: 'https://eligv2-dev.carefirst.com/eligibility/benefit-summary',
  },
  {
    title: 'Benefit Details',
    url: 'https://eligv2-dev.carefirst.com/eligibility/benefit-details',
  },
]

const getEligv2Url = (searchCriteria, searchData) => {
  if (searchCriteria === SEARCH_CRITERIA_ID_DOB) {
    let { memberId, dob, startDate, endDate } = searchData

    dob = dob.format('MM/DD/YYYY')
    startDate = startDate.format('MM/DD/YYYY')
    endDate = endDate.format('MM/DD/YYYY')

    return `https://eligv2-dev.carefirst.com/eligibility/eligibility?memberNumber=${memberId}&dob=${dob}&startDate=${startDate}&endDate=${endDate}`
  } else if (searchCriteria === SEARCH_CRITERIA_ID_NAME) {
    const { memberId, lastName, firstName } = searchData

    return `https://eligv2-dev.carefirst.com/eligibility/eligibility?memberNumber=${memberId}&lastName=${lastName}&firstName=${firstName}`
  } else if (searchCriteria === SEARCH_CRITERIA_NAME_DOB) {
    let { lastName, firstName, dob } = searchData
    dob = dob.format('MM/DD/YYYY')

    return `https://eligv2-dev.carefirst.com/eligibility/eligibility?dob=${dob}&lastName=${lastName}&firstName=${firstName}`
  }
  return ''
}

const getSearchedData = (searchCriteria, searchData) => {
  let items = []
  if (searchCriteria === SEARCH_CRITERIA_ID_DOB) {
    items = [
      {
        key: '1',
        label: 'Member ID',
        children: searchData.memberId,
      },
      {
        key: '2',
        label: 'Date of Birth',
        children: searchData.dob.format('MM/DD/YYYY'),
      },
    ]
    return items
  } else if (searchCriteria === SEARCH_CRITERIA_ID_NAME) {
    items = [
      {
        key: '1',
        label: 'Member ID',
        children: searchData.memberId,
      },
      {
        key: '2',
        label: 'Last Name',
        children: searchData.lastName,
      },
      {
        key: '3',
        label: 'First Name',
        children: searchData.firstName,
      },
    ]
    return items
  } else if (searchCriteria === SEARCH_CRITERIA_NAME_DOB) {
    items = [
      {
        key: '1',
        label: 'Last Name',
        children: searchData.lastName,
      },
      {
        key: '2',
        label: 'First Name',
        children: searchData.firstName,
      },
      {
        key: '3',
        label: 'Date of Birth',
        children: searchData.dob.format('MM/DD/YYYY'),
      },
    ]
    return items
  }
  return {}
}

const ResultsComponent = () => {
  const { state, dispatch } = useContext(compareContext)
  const { searchData, searchCriteria } = state
  const [transactionId, setTransactionId] = useState('')
  const [eligv2Data, setEligv2Data] = useState(null)
  const [stgEligv2Data, setStgEligv2Data] = useState(null)

  const handlebackBtn = () => {
    dispatch({ type: BACK_TO_SEARCH })
  }

  const fetchEligv2Data = async () => {
    try {
      const eligv2Url = getEligv2Url(searchCriteria, searchData)
      console.log('eligv2Url', eligv2Url)
      // const response = await axios.get(url)
      // console.log('response',

      const prodEligv2Data = {
        transactionId: '1234',
        eligibility: {
          member: {
            memberId: '1234',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: '01/01/1990',

            address: {
              addressLine1: '1234 Main St',
              addressLine2: 'Apt 123',
              city: 'Baltimore',
              state: 'MD',
              zip: '21201',
            },
          },
          coverage: {
            planName: 'CareFirst BlueChoice Advantage',
            planType: 'HMO',
            planEffectiveDate: '01/01/2021',
            planEndDate: '12/31/2021',
            planStatus: 'Active',
            planStatusEffectiveDate: '01/01/2021',
            planStatusEndDate: '12/31/2021',
            planStatusReason: 'Active',
            planStatusReasonEffectiveDate: '01/01/2021',
            planStatusReasonEndDate: '12/31/2021',
            planStatusReasonDescription: 'Active',
            planStatusReasonDescriptionEffectiveDate: '01/01/2021',
          },
        },
      }

      const stgEligv2Data = {
        transactionId: '457678',
        eligibility: {
          member: {
            memberId: '1234',
            firstName: 'Krishna',
            lastName: 'Reddy',
            dateOfBirth: '01/01/1990',

            address: {
              addressLine1: '1234 Main St',
              addressLine2: 'Hyd 123',
              city: 'Usa',
              state: 'MD',
              zip: '21201',
            },
          },
          coverage: {
            planName: 'CareFirst Katre Advantage',
            planType: 'HMO',
            planEffectiveDate: '01/01/2021',
            planEndDate: '12/31/2021',
            planStatus: 'Active',
            planStatusEffectiveDate: '01/01/2021',
            planStatusEndDate: '12/31/2021',
            planStatusReason: 'Active',
            planStatusReasonEffectiveDate: '01/01/2021',
            planStatusReasonEndDate: '12/31/2021',
            planStatusReasonDescription: 'inAcxtgive',
            planStatusReasonDescriptionEffectiveDate: '01/01/2021',
          },
        },
      }

      setEligv2Data(prodEligv2Data)
      setStgEligv2Data(stgEligv2Data)
      // setTransactionId('1234'
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchEligv2Data()
  }, [])

  return (
    <Wrapper>
      <div className="results-header">
        <button className="back-btn" onClick={handlebackBtn}>
          <MdArrowBack />
        </button>
        <Descriptions
          title=""
          items={getSearchedData(searchCriteria, searchData)}
        />
      </div>

      <div className="results-body">
        <div className="eligv2-result-container">
          <div className="api-header">
            <div className="api-header-title">Elig v2</div>
          </div>
          <div className="api-body">
            {/* {eligv2Data ? ( */}
            <div className="res-body">
              <div className="req-url-container">
                {/* <div className="req-url-title">URL</div */}

                {/* <div className="req-url-body">{eligv2Url}</div> */}
              </div>
              {/* <JsonViewer data={eligv2Data} /> */}
              <JsonDiffViewer
                stageResponse={stgEligv2Data}
                prodResponse={eligv2Data}
                status="Success"
              />
            </div>
            {/* ) : (
              <p>Loading data...</p>
            )} */}
          </div>
        </div>
        {transactionIdDependedntApis.map((api) => {
          return (
            <TransactionIdDependentResultComponent
              transactionId={transactionId}
              key={api.title}
              title={api.title}
              url={api.url}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
export default ResultsComponent

const Wrapper = styled.div`
  padding: 1rem;

  .results-header {
    display: flex;
    gap: 4rem;
    align-items: baseline;
  }

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
  }

  .back-btn:hover {
    transform: scale(1.05);
  }

  .eligv2-result-container {
    border: 1px solid var(--grey-100);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .api-header {
    padding: 1rem;
    background-color: var(--grey-50);
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .api-body {
    padding: 1rem;
  }

  .pre-styling {
    white-space: pre-wrap;
    word-wrap: break-word;
    max-height: 400px;
    overflow-y: scroll;
  }

  .json-view-container {
    max-height: 400px; /* Set the maximum height as needed */
    overflow: auto;
    border: 1px solid var(--grey-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .req-url-container {
    margin-bottom: 1rem;
  }

  .req-url-body {
    color: var(--grey-400);
    font-size: 0.9rem;
    word-wrap: break-word;
  }
`
