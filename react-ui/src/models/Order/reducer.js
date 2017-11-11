import { ORDER_POSTS, ORDER_COMMENTS } from './constants';

// order: 'asc' or 'desc'
// by: 'voteScore' or 'timestamp'
const initialState = {
  post: {
    order: 'asc', 
    by: 'voteScore',
  },
  comment: {
    order: 'asc', 
    by: 'voteScore',
  }
}

export default function post (state=initialState, action) {
  const { order, by } = action;

  switch(action.type) {
    case ORDER_POSTS:
      return {
        ...state,
        post: {
          order,
          by,
        },
      };

    case ORDER_COMMENTS:
      return {
        ...state,
        comment: {
          order,
          by,
        },
      };

    default: 
      return state;
  }
}