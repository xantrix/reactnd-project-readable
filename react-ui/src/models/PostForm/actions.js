import { TOGGLE_POST_FORM } from './constants';

export const togglePostForm = (isOpen, post={}) => ({
  type: TOGGLE_POST_FORM,
  payload: {
    isOpen,
    post,
  }
})