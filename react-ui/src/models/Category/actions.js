import { FETCH_CATEGORIES } from './constants';

import api from 'api';

/**
 * https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md
 * Dispatch a Promise as the value of the payload property of the action.
 * FOO_PENDING promise is settled:FOO_FULFILLED, promise is rejected: FOO_REJECTED
 */
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
  payload: api.get('/categories').then(res => res.data.categories),
})