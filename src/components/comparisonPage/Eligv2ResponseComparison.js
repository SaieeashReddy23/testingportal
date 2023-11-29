import { diffLines, formatLines } from 'unidiff'
import { parseDiff, Diff, Hunk } from 'react-diff-view'
import 'react-diff-view/style/index.css'
import { styled } from 'styled-components'

const EMPTY_HUNKS = []

const oldJson = {
  name: 'Niroj',
  age: '22',
  address: {
    city: 'Kathmandu',
    country: 'Nepal',
  },
}

const newJson = {
  name: 'Niman',
  age: '22',
  address: {
    city: 'Kathmandu',
    country: 'india',
  },
}

const Eligv2ResponseComparison = () => {
  const oldJsonString = JSON.stringify(oldJson, null, 2)
  const newJsonString = JSON.stringify(newJson, null, 2)
  const diffText = formatLines(diffLines(oldJsonString, newJsonString), {
    context: 3,
  })
  const [diff] = parseDiff(diffText, { nearbySequences: 'zip' })

  return (
    <Wrapper>
      <div className="my-diff-header">
        <div>Prod</div>
        <div>Stage</div>
      </div>
      <Diff viewType="split" diffType="" hunks={diff.hunks || EMPTY_HUNKS}>
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff>
    </Wrapper>
  )
}
export default Eligv2ResponseComparison

const Wrapper = styled.div`
  background-color: var(--white);

  .my-diff-header {
    background-color: #f1f8ff;
    border: 1px solid #d8dee2;
    border-radius: 3px;
    padding: 0.5em;
    margin-bottom: 1em;
    font-size: 0.9em;
    font-weight: bold;
    color: #24292e;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    align-items: center;
  }
`
