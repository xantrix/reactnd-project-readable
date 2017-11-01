import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

// Reducers
import category from 'models/Category/reducer';
import postForm from 'models/PostForm/reducer';

export default combineReducers({
  router: routerReducer,
  category,
  postForm
});