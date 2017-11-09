import React from 'react';

//components
import Post from './components/Post/Post';

export default function PostList ({posts, isFetching, onClickVote, onPostClick }) {
  return (
    <ul>
    { 
      !isFetching && ( 
        posts.map(post => (
          !post.deleted  && (
            <Post 
              key={post.id} 
              post={post} 
              onClickVote={onClickVote} 
              onPostClick={onPostClick}
            /> 
          )
        ))
      )
    }
    </ul>
  )
}