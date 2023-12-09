export const SET_COLLECTION = 'SET_COLLECTION'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA'
export const SET_SHOW_RESULTS = 'SET_SHOW_RESULTS'
export const BACK_TO_SEARCH = 'BACK_TO_SEARCH'

const initialState = {
  collection: [],
  loading: false,
  error: null,
  search: 'single',
  searchCriteria: 'option1',
  showResults: false,
  searchData: {},
}

export const comparisonReducer = (state, action) => {
  switch (action.type) {
    case SET_COLLECTION:
      return {
        ...state,
        collection: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    case SET_SEARCH_CRITERIA:
      return {
        ...state,
        searchCriteria: action.payload,
      }
    case SET_SHOW_RESULTS:
      console.log('action.payload', action.payload)

      return {
        ...state,
        showResults: true,
        searchData: action.payload,
      }
    case BACK_TO_SEARCH:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
