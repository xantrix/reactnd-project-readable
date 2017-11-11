import {
  FETCH_ALL_POSTS,
  FETCH_SINGLE_POST_COMMENTS,
  FETCH_SINGLE_POST,
  VOTE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from './constants';

const initialState = {
  isFetching: false,
  posts: [],
  post: {},
}

export default function post(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_SINGLE_POST_COMMENTS}_FULFILLED`:
      const comments = action.payload;
      const linkedPostId = comments.length ? comments[0].parentId : undefined;

      if (typeof linkedPostId === undefined)
        return state;

      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === linkedPostId ? 
          Object.assign({}, post, { comments }) : post
        )
      };

    case `${FETCH_ALL_POSTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_ALL_POSTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };

    case `${FETCH_SINGLE_POST}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${FETCH_SINGLE_POST}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        post: Object.assign({}, state.post, action.payload)
      };

    case `${VOTE_POST}_FULFILLED`:
      const { posts, post } = state;
      const { id, voteScore } = action.payload;

      const postsWithVoteScore = posts.map(
        p => p.id === id ? { ...p, voteScore } : p
      );
      
      const postWithVoteScore = Object.keys(post).length > 0 ? action.payload :
                                Object.assign({}, state.post, { voteScore });

      return {
        ...state,
        posts: postsWithVoteScore,
        post: postWithVoteScore,
      };

    case `${CREATE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      }

    case `${UPDATE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.filter(post =>
          post.id !== action.payload.id
        ).concat(action.payload),
        post: Object.assign({}, state.post, action.payload)
      }

    case `${DELETE_POST}_FULFILLED`:
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload ?
            Object.assign({}, post, { deleted: true }) :
            post
        ),
        post: Object.assign({}, state.post, { deleted: true })
      };

    default:
      return state;
  }
}