import React from 'react';

import './Order.css';

export default function Order ({ onOrderClick }) {
  
  return (
    <div className="order-container">
      <h3>Order</h3>
      
      <ul>
        <li>
          <input
            id="mostVotes"
            type="radio"
            name="filter"
            onClick={() => onOrderClick('asc', 'voteScore')}
            defaultChecked={true}
          />
          <label htmlFor="mostVotes">Most</label>
        </li>
        <li className="slash">/</li>
        <li>
          <input
            id="leastVotes"
            type="radio"
            name="filter"
            onClick={() => onOrderClick('desc', 'voteScore')}
          />
          <label htmlFor="leastVotes">Least</label>
        </li>
        <li className="votes">(votes)</li>
      </ul>
      <hr className="separator"></hr>
      <ul>
        <li>
          <input
            id="newest"
            type="radio"
            name="filter"
            onClick={() => onOrderClick('asc', 'timestamp')}
          />
          <label htmlFor="newest">Newest</label>
        </li>
        <li className="slash">/</li>
        <li>
          <input
            id="oldest"
            type="radio"
            name="filter"
            onClick={() => onOrderClick('desc', 'timestamp')}
          />
          <label htmlFor="oldest">Oldest</label>
        </li>
      </ul>
    
    </div>
  )
}