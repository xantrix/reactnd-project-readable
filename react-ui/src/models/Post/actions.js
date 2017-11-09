import {
  FETCH_ALL_POSTS,
  FETCH_SINGLE_POST_COMMENTS,
  FETCH_SINGLE_POST,
  VOTE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from './constants';

import api from 'api';
import uuidv4 from 'uuid/v4';

export const fetchSinglePostComments = (id) => ({
  type: FETCH_SINGLE_POST_COMMENTS,
  payload: api.get(`/posts/${id}/comments`).then(res => res.data)
})

export const fetchAllPosts = () => ({
  type: FETCH_ALL_POSTS,
  payload: api.get('/posts').then(res => res.data)
})

/**
 * https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/guides/chaining-actions.md
 * https://github.com/gaearon/redux-thunk
 * 
 */
export const fetchPostsAndComments = () => (
  dispatch => (
    dispatch(
      fetchAllPosts()
    )
    .then(({ value: posts }) =>
      posts.map(
        post => dispatch(
          fetchSinglePostComments(post.id)
        )
      )
    )
  )
)

export const fetchSinglePost = (id) => ({
  type: FETCH_SINGLE_POST,
  payload: api.get(`/posts/${id}`).then(res => res.data)
})


export const votePost = (id, option) => ({
  type: VOTE_POST,
  payload: api.post(`/posts/${id}`, { option }).then(res => res.data)
})
