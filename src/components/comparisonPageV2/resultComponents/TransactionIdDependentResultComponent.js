import { useEffect } from 'react'
import { styled } from 'styled-components'
import JsonDiffViewer from '../../common/JsonDiffViewer'
import JsonViewer from '../../common/JsonViewer'

const TransactionIdDependentResultComponent = ({
  transactionId,
  title,
  url,
}) => {
  const prod = {
    id: 1,
    title: 'iPhone 10',
    description: 'An Orange mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'Books',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  }
  const stg = {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  }
  useEffect(() => {
    if (transactionId) {
      console.log('transactionId', transactionId)
      console.log('title', title)
      console.log('url', url)
    }
  }, [transactionId])

  return (
    <Wrapper>
      <div className="api-header">
        <div className="api-header-title">{title}</div>
      </div>
      <div className="api-body">
        {/* {response ? ( */}
        <div className="res-body">
          <div className="req-url-container">
            {/* <div className="req-url-title">URL</div */}

            {/* <div className="req-url-body">{url}</div> */}
          </div>
          {/* <JsonViewer data={response} /> */}
          <JsonDiffViewer
            stageResponse={stg}
            prodResponse={prod}
            status="Success"
          />
        </div>
        {/* ) : (
          <p>Loading data...</p>
        )} */}
      </div>
    </Wrapper>
  )
}
export default TransactionIdDependentResultComponent

const Wrapper = styled.div`
  border: 1px solid var(--grey-100);
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  .api-header {
    padding: 1rem;
    background-color: var(--grey-50);
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  .api-body {
    padding: 1rem;
    padding-top: 0;
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
