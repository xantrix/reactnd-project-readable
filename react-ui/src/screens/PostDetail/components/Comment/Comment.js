import React from 'react';

import date from 'app/util/date';

export default function Comment ({ comment, onEditingComment, onDeleteComment, voteComment }) {
  
  return (
    <ol key={comment.id}>
      <p>{comment.body}</p>
      <div className="meta">
        <span className="author">by {comment.author}</span>
        <span className="date">{date(comment.timestamp)}</span>
        <div className="danger-buttons">
          <a href="#edit-anchor" 
            onClick={() => onEditingComment(comment)} 
            className="edit-button"
          > </a>
          <div onClick={() => onDeleteComment(comment.id)} className="delete-button"></div>
        </div>
        <div className="likes-container">
          <span className="likes-count">
            {comment.voteScore > 0 ? `+${comment.voteScore}` : comment.voteScore}
          </span>
          <div className="likes-buttons">
            <span onClick={() => voteComment(comment.id, 'upVote')} className="up-vote"></span>
            <span onClick={() => voteComment(comment.id, 'downVote')} className="down-vote"></span>
          </div>
        </div>
      </div>
    </ol>
  )
}