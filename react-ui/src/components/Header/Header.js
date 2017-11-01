import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default function Header ({ togglePostForm }) {
  const isOpen = true;
  
  return (
    <div className='header-container'>
      <Link to='/' className='logo'>Readable</Link>
        <button
          onClick={() => togglePostForm(isOpen)}
          className="add-post">
            Add Post
        </button>
    </div>  
  )
}