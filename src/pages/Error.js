import { styled } from 'styled-components'
import notFound from '../assets/images/notFound.svg'

const Error = () => {
  return (
    <Wrapper>
      <div className="error-container">
        <img src={notFound} alt="not-found" className="img" />
        <h3>Ohh! Page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <a href="/">Go to home page</a>
      </div>
    </Wrapper>
  )
}
export default Error

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: var(--grey-50);

  .error-container {
    /* width: 90vw; */
    max-width: 40vw;
    text-align: center;
  }

  .error-container h3 {
    margin-top: 3rem;
  }

  .error-container p {
    color: var(--grey-500);
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .error-container a {
    display: inline-block;
    text-decoration: underline;
    font-size: 1.2rem;
    color: var(--primary-500);
    transition: var(--transition);
    margin-top: 1rem;
  }

  .error-container a:hover {
    color: var(--primary-800);
  }
`
