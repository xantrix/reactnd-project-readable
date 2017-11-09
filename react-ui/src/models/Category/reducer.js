import { FETCH_CATEGORIES } from './constants';

const initialState = {
  isFetching: false,
  categories: [],
  error: null,
}

/**
 * https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/reducers.md
 */
export default (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_CATEGORIES}_PENDING`:
      return {
        ...state,
        isFetching: true
      };
    
    case `${FETCH_CATEGORIES}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };

    default: 
      return state;
  }
}