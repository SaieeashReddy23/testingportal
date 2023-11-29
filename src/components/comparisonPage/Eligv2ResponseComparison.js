import ReactDiffViewer from 'react-diff-viewer-continued'
import { diffLines, formatLines } from 'unidiff'
import { parseDiff, Diff, Hunk } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { styled } from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const EMPTY_HUNKS = []

const oldJson = {
  name: 'Niroj',
  age: '22',
  address: {
    city: 'Kathmandu',
    country: 'Nepal',
  },
}

// const oldJson = {
//   name: 'Niman',
//   age: '22',
//   address: {
//     city: 'Kathmandu',
//     country: 'india',
//   },
// }

const newJson = {
  name: 'Niman',
  age: '22',
  address: {
    city: 'Kathmandu',
    country: 'india',
  },
}

const Eligv2ResponseComparison = () => {
  const [diffState, setDiffState] = useState({})

  //   const oldJsonString = JSON.stringify(oldJson, null, 2)
  //   const newJsonString = JSON.stringify(newJson, null, 2)
  //   const diffText = formatLines(diffLines(oldJsonString, newJsonString), {
  //     context: 3,
  //   })
  //   const [diff] = parseDiff(diffText, { nearbySequences: 'zip' })

  const [prod, setProd] = useState('')
  const [stage, setStage] = useState('')

  const fetchProdAndStageResponse = async () => {
    try {
      const prodResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/5`
      )
      const stageResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      )
      const prodResponseString = JSON.stringify(prodResponse.data, null, 2)
      const stageResponseString = JSON.stringify(stageResponse.data, null, 2)
      const diffText = formatLines(
        diffLines(prodResponseString, stageResponseString),
        {
          context: 3,
        }
      )

      const [diff] = parseDiff(diffText, { nearbySequences: 'zip' })
      console.log(diff)
      setDiffState(diff)
      setProd(prodResponseString)
      setStage(stageResponseString)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProdAndStageResponse()
  }, [])

  return (
    <Wrapper>
      <div className="my-diff-header">
        <div>Prod</div>
        <div>Stage</div>
      </div>
      {/* <Diff viewType="split" diffType="" hunks={diffState.hunks || EMPTY_HUNKS}>
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff> */}
      <ReactDiffViewer
        oldValue={prod}
        newValue={stage}
        splitView={true}
        disableWordDiff={true}
        // leftTitle="Prod"
        // rightTitle="Stage"
        styles={{
          diffContainer: {
            overflowY: 'scroll',
            height: '50vh',
          },
        }}
      />
    </Wrapper>
  )
}
export default Eligv2ResponseComparison

const Wrapper = styled.div`
  background-color: var(--white);
  overflow-y: scroll;
  max-height: 60vh;
  position: relative;

  .my-diff-header {
    background-color: #f1f8ff;
    border: 1px solid #d8dee2;
    border-radius: 3px;
    padding: 0.5em;
    margin-bottom: 0.2rem;
    font-size: 0.9em;
    font-weight: bold;
    color: #24292e;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`
