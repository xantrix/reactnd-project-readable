import React from 'react';

import './Post.css';
import dateFormat from 'app/util/date';

export default function Post ({ post, onClickVote, onPostClick, togglePostForm, onDeletePost }) {
  return (
    <li key={post.id} className="post-container">

      <div className="card">
        
        <div className="card-content" onClick={() => onPostClick(`${post.category}/${post.id}`, post)}>
          <h2>{post.title}</h2>
          <div className="card-details">
            <p className="description">
              { post.body.slice(0, 120) }
              { post.body.length > 120 ? '...' : ''}
            </p>
          </div>
        </div>

        <div className="bottom-data">
          <span className="author">By {post.author} </span>
          
          <span className="date"> On {dateFormat(post.timestamp)}</span>
          
          <div className="comment">
            <span className="img">comment</span>
            <span className="comment-count">{post.comments ? post.comments.length: 0}</span>
          </div>

          <div className="likes-container">
            <span className="likes-count">
              {post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore}
            </span>
            <div className="likes-buttons">
              <span onClick={() => onClickVote(post.id, 'upVote')} className="up-vote"></span>
              <span onClick={() => onClickVote(post.id, 'downVote')} className="down-vote"></span>
            </div>
          </div>
          <div className="danger-buttons">
            <div onClick={() => togglePostForm(true, post)} className="edit-button"></div>
            <div onClick={() => onDeletePost(post)} className="delete-button"></div>
          </div>
        </div>

      </div>

    </li>
  )
}