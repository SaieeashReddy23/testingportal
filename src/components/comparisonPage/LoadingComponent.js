import { styled } from 'styled-components'

const LoadingComponent = () => {
  return (
    <Wrapper>
      <div className="loading"></div>
    </Wrapper>
  )
}
export default LoadingComponent

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`
