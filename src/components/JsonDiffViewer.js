import { diffLines, formatLines } from 'unidiff'
import { parseDiff, Diff, Hunk } from 'react-diff-view'

import 'react-diff-view/style/index.css'
// import './styles.css';

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

const filterOutNormalChanges = (hunk) => {
  return {
    ...hunk,
    changes: hunk.changes.filter((change) => !change.isNormal),
  }
}

const removeNormalChanges = (ComponentIn) => {
  const ComponentOut = ({ hunks, ...props }) => {
    const purgedHunks = hunks.map(filterOutNormalChanges)
    console.log(purgedHunks)

    return <ComponentIn {...props} hunks={hunks} />
  }

  ComponentOut.displayName = `removeNormalChanges(${ComponentIn.displayName})`

  return ComponentOut
}

const JsonDiffViewer = () => {
  const oldJsonString = JSON.stringify(oldJson, null, 2)
  const newJsonString = JSON.stringify(newJson, null, 2)
  const diffText = formatLines(diffLines(oldJsonString, newJsonString), {
    context: 3,
  })
  const [diff] = parseDiff(diffText, { nearbySequences: 'zip' })

  const MyDiff = removeNormalChanges(Diff)

  return (
    <div>
      <main>
        <MyDiff viewType="split" diffType="" hunks={diff.hunks || EMPTY_HUNKS}>
          {(hunks) =>
            hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
          }
        </MyDiff>
      </main>
    </div>
  )
}
export default JsonDiffViewer
