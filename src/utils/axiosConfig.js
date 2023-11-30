import axios from 'axios'

const PROD_TOKEN_URL = 'https://your-prod-token-url.com'
const PROD_API_URL = 'https://your-prod-api-url.com'
const STAGE_TOKEN_URL = 'https://your-stage-token-url.com'
const STAGE_API_URL = 'https://your-stage-api-url.com'

const stgApi = axios.create({
  baseURL: STAGE_API_URL,
  timeout: 10000,
})

const prodApi = axios.create({
  baseURL: PROD_API_URL,
  timeout: 10000,
})

const getStageToken = async () => {
  const storedToken = localStorage.getItem('STG_TOKEN')
  const expirationTime = localStorage.getItem('STG_TOKEN_EXPIRATION')

  if (storedToken && expirationTime && Date.now() < Number(expirationTime)) {
    return storedToken
  }

  try {
    const response = await stgApi.get(STAGE_TOKEN_URL)
    const newToken = response.data.token
    const expirationTimeMs = Date.now() + 60 * 60 * 1000 // 1 hour
    localStorage.setItem('STG_TOKEN', newToken)
    localStorage.setItem('STG_TOKEN_EXPIRATION', expirationTimeMs)
    return newToken
  } catch (error) {
    console.error('Error fetching token:', error)
    throw error
  }
}

const getProdToken = async () => {
  const storedToken = localStorage.getItem('PROD_TOKEN')
  const expirationTime = localStorage.getItem('PROD_TOKEN_EXPIRATION')

  if (storedToken && expirationTime && Date.now() < Number(expirationTime)) {
    return storedToken
  }

  try {
    const response = await prodApi.post(PROD_TOKEN_URL)
    const newToken = response.data.token
    const expirationTimeMs = Date.now() + 60 * 60 * 1000 // 1 hour
    localStorage.setItem('PROD_TOKEN', newToken)
    localStorage.setItem('PROD_TOKEN_EXPIRATION', expirationTimeMs)
    return newToken
  } catch (error) {
    console.error('Error fetching token:', error)
    throw error
  }
}

const setStageAuthHeader = async () => {
  try {
    const token = await getStageToken()
    stgApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } catch (error) {
    console.error('Error setting authorization header:', error)
    throw error
  }
}

const setProdAuthHeader = async () => {
  try {
    const token = await getProdToken()
    prodApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } catch (error) {
    console.error('Error setting authorization header:', error)
    throw error
  }
}

export { stgApi, prodApi, setStageAuthHeader, setProdAuthHeader }
