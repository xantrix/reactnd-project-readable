import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import serializeFrom from 'form-serialize';

import './PostForm.css'
//actions
import { togglePostForm } from 'models/PostForm/actions';
import { fetchCategories } from 'models/Category/actions';
import { createPost, updatePost } from 'models/Post/actions';

const mapStateToProps = ({ postForm, category }) => ({
  isOpen: postForm.isOpen,
  post: postForm.post,
  categories: category.categories,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    togglePostForm,
    fetchCategories,
    createPost,
    updatePost
  }, dispatch)
}

class PostForm extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  handlePostSubmit = (e, isEditMode) => {
    e.preventDefault();
    const { post, updatePost, createPost } = this.props;
    const values = serializeFrom(e.target, { hash: true });

    // we are in Edit mode ?
    if (isEditMode) {
      updatePost(post.id, values)
    } else {
      createPost(values);
    }

    // close Modal
    this.props.togglePostForm(this.isOpen);
  }

  render() {
    const { post, categories } = this.props;
    const isEditMode = Object.keys(post).length !== 0;

    return (
      <Modal
          isOpen={this.props.isOpen}
          onRequestClose={() => this.props.togglePostForm(this.isOpen)}
          contentLabel="Post Modal"
          className="post-modal"
          overlayClassName="post-modal-overlay"
      >
          <div className="header">
            <h2> {isEditMode ? 'Edit Post' : 'Add a Post'}</h2>
            <span
              onClick={() => this.props.togglePostForm(this.isOpen)}
              className="close-button">
              x
            </span>
          </div>

          <form onSubmit={(e) => this.handlePostSubmit(e, isEditMode)}>
            <fieldset>
              <input
                type="text"
                name="title"
                defaultValue={isEditMode ? post.title : ''}
                placeholder="Title..."
                required
              />
            </fieldset>
            
            <fieldset>
              <input
                type="text"
                name="author"
                defaultValue={isEditMode ? post.author : ''}
                placeholder="Author..."
                disabled={isEditMode}
                required
              />
            </fieldset>
            
            <fieldset>
              <select disabled={isEditMode} name="category">
                {
                  categories.map(({ name }) => (
                    <option key={name} value={name}>{name}</option>
                  ))
                }
              </select>
            </fieldset>
            
            <fieldset>
              <textarea
                name="body"
                defaultValue={isEditMode ? post.body : ''}
                placeholder="..."
                required
              />
            </fieldset>
            
            <button type="submit" className="button save-edit-button">
              {isEditMode ? 'Save' : 'Post'}
            </button>
          </form>
      </Modal>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);