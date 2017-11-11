import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  EDITING_COMMENT,
  DELETE_COMMENT,
} from './constants';

const initialState = {
  isFetching: false,
  comments: [],
  editingComment: {},
}

export default function post(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_COMMENTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_COMMENTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
      };

    case `${CREATE_COMMENT}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${CREATE_COMMENT}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        comments: state.comments.concat(action.payload),
      };

    case `${VOTE_COMMENT}_FULFILLED`:
      const { id, voteScore } = action.payload;
      const { comments } = state;

      return {
        ...state,
        comments: comments.map(
          comment => comment.id === id ? { ...comment, voteScore } : comment
        ),
      };

    case EDITING_COMMENT:
      return {
        ...state,
        editingComment: action.payload,
      };

    case`${UPDATE_COMMENT}_FULFILLED`:
      const notUpdatedComments = state.comments.filter(
        comment => comment.id !== action.payload.id
      );
      return {
        ...state,
        editingComment: {},
        comments: notUpdatedComments.concat(action.payload)
      };

    case `${DELETE_COMMENT}_FULFILLED`:
      return {
        ...state,
        editingComment: {},
        comments: state.comments.map(
          comment => comment.id === action.payload ?
                    Object.assign({}, comment, { deleted: true }) :
                    comment
        )
      };

    default:
      return state;
  }
}