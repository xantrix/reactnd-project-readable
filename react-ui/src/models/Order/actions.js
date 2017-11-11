import { ORDER_POSTS, ORDER_COMMENTS } from './constants';

export const orderPosts = (order, by) => ({
  type: ORDER_POSTS,
  order,
  by,
})

export const orderComments = (order, by) => ({
  type: ORDER_COMMENTS,
  order,
  by,
})