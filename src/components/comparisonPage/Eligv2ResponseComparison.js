import ReactDiffViewer from 'react-diff-viewer-continued'

import 'react-diff-view/style/index.css'
import { styled } from 'styled-components'

const Eligv2ResponseComparison = ({ panel, setPanelData }) => {
  const { key, prodResponse, stageResponse, status } = panel

  if (status === 'error') {
    return (
      <div className="error-msg">
        Some Error occureed while fetching api data , Pls compare again
      </div>
    )
  }

  return (
    <Wrapper>
      <div className="my-diff-header">
        <div>Prod</div>
        <div>Stage</div>
      </div>
      <ReactDiffViewer
        oldValue={prodResponse}
        newValue={stageResponse}
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
  border: 1px solid var(--grey-50);

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
