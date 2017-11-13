import {
  FETCH_COMMENTS,
  CREATE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  EDITING_COMMENT,
  DELETE_COMMENT,
} from './constants';

import api from 'api';
import uuidv4 from 'uuid/v4';

export const fetchComments = (id) => ({
  type: FETCH_COMMENTS,
  payload: api.get(`/posts/${id}/comments`)
              .then(res => res.data)
})

export const createComment = ({ author, body, parentId }) => ({
  type: CREATE_COMMENT,
  payload: api.post('/comments', {
    id: uuidv4(),
    timestamp: Date.now(),
    author,
    body,
    parentId,
  }).then(res => res.data),
})

export const updateComment = (id, { author, body }) => ({
  type: UPDATE_COMMENT,
  payload: api.put(`/comments/${id}`, {
    author,
    body,
  }).then(res => res.data),
})

export const editComment = (comment) => ({
  type: EDITING_COMMENT,
  payload: comment,
})

export const deleteComment = (id) => ({
  type: DELETE_COMMENT,
  payload: api.delete(`/comments/${id}`)
              .then(res => id)
})

export const voteComment = (id, option) => ({
  type: VOTE_COMMENT,
  payload:api.post(`/comments/${id}`, { option })
             .then(res => res.data)
})