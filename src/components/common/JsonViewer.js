import { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { IoCopy } from 'react-icons/io5'
import Highlight from 'react-highlight'
import { styled } from 'styled-components'
import { toast } from 'react-toastify'

const JsonViewer = ({ data }) => {
  let jsonData = JSON.stringify(data, null, 2)
  const handleCopy = () => {
    console.log('copied')
    toast.success('Copied to clipboard')
  }

  return (
    <Wrapper>
      <CopyToClipboard text={jsonData || ''} onCopy={handleCopy}>
        <span className="copy-icon">
          <IoCopy />
        </span>
      </CopyToClipboard>
      <div className="json-viewer">
        <Highlight language="json">{jsonData}</Highlight>
      </div>
    </Wrapper>
  )
}
export default JsonViewer

const Wrapper = styled.div`
  position: relative;

  .copy-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1rem;
    z-index: 1;
    color: var(--grey-400);
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      color: var(--grey-500);
    }
  }

  .json-viewer {
    max-height: 400px; /* Set the maximum height as needed */
    overflow: auto;
    border: 1px solid var(--grey-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
`
