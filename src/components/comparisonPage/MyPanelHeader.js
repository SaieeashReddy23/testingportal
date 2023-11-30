import { styled } from 'styled-components'
import { IoMdCloseCircle, IoMdCheckmarkCircle } from 'react-icons/io'

const MyPanelHeader = ({ apiName, status, isLoading }) => {
  return (
    <Wrapper>
      <div className="title">{apiName}</div>
      {isLoading ? (
        <span className="my-loading"></span>
      ) : status === 'success' ? (
        <span className="icon">
          <IoMdCheckmarkCircle color="green" />
        </span>
      ) : (
        <span className="icon">
          <IoMdCloseCircle color="red" />
        </span>
      )}
    </Wrapper>
  )
}
export default MyPanelHeader

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .title {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
  }

  .my-loading {
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid var(--grey-400);
    border-radius: 50%;
    border-top-color: var(--primary-500);
    animation: spinner 0.6s linear infinite;
    /* margin: 0 auto; */
  }
  .icon {
    display: grid;
    place-items: center;
    font-size: 1.3rem;
  }
`
