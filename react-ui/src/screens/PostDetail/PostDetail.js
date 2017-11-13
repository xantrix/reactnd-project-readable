import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serializeFrom from 'form-serialize';
import { Link } from 'react-router-dom';

//components
import Order from 'components/Order/Order';
import Comment from './components/Comment/Comment';

//actions
import { fetchSinglePost, votePost, deletePost } from 'models/Post/actions';
import { orderComments } from 'models/Order/actions';
import { togglePostForm } from 'models/PostForm/actions';
import { 
  fetchComments,
  createComment, 
  deleteComment, 
  editComment, 
  updateComment,
  voteComment,
} from 'models/Comment/actions';

import './PostDetail.css';
import order from 'app/util/order';
import date from 'app/util/date';

const mapStateToProps = ({ post, comment, order }) => {
  return {
    post: post.post,
    isFetchingPost: post.isFetching,
    isFetching: post.isFetching,
    orderType: order.comment,
    comments: comment.comments,
    editingComment: comment.editingComment,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchSinglePost,
    fetchComments,
    createComment,
    voteComment,
    orderComments,
    editComment,
    updateComment,
    deleteComment,
    votePost,
    deletePost,
    togglePostForm,
  }, dispatch)
}

class PostDetail extends Component {
  
  componentDidMount() {
    const { postId } = this.props.match.params;
    this.props.fetchSinglePost(postId);
    this.props.fetchComments(postId);
  }

  onDeleteComment = (id) => {
    const shouldDelete = window.confirm("Delete this Comment?");
    if (shouldDelete === true) {
      this.props.deleteComment(id)
    }
  }

  onEditingComment = (comment) => {
    this.formRef.reset();
    this.props.editComment(comment);
  }

  onDeletePost = () => {
    const shouldDelete = window.confirm("Delete this Post?");
    if (shouldDelete === true) {
      this.props.deletePost(this.props.post.id)
      this.props.history.push('/')
    }
  }

  handleSubmit = (e, isEditing) => {
    e.preventDefault();
    const { post, editingComment } = this.props;
    const values = serializeFrom(e.target, { hash: true });

    isEditing ? 
      this.props.updateComment(editingComment.id, values) : 
      this.props.createComment({ ...values, parentId: post.id });

    this.formRef.reset();
  }

  cancelForm = () => {
    this.props.editComment({})
    this.formRef.reset();
  }

  render() {
    const isOpen = true;
    const { 
      post, 
      isFetchingPost, 
      votePost, 
      comments,
      voteComment,
      orderType,
      editingComment,
    } = this.props;

    const isEditing = 
      Object.keys(editingComment).length > 0 && 
      !!comments.find(c => c.id === editingComment.id)

    const filteredComments = order(
      comments.concat(), orderType.order, orderType.by
    );

    return (
      <div className="post-detail">
        {
          !isFetchingPost && Object.keys(post).length > 0 ? (
            <div className="container">
              
              <div className="header">
                <span className="date">Published: {date(post.timestamp)}</span>
                <h2>{post.title}</h2>
                <p className="author">by {post.author} </p>
                
                <div className="meta">
                  <div className="likes-container">
                    <span className="likes-count">
                      {post.voteScore > 0 ? `+${post.voteScore}` : post.voteScore}
                    </span>
                    <div id="edit-anchor" className="likes-buttons">
                      <span onClick={() => votePost(post.id, 'upVote')} className="up-vote"></span>
                      <span onClick={() => votePost(post.id, 'downVote')} className="down-vote"></span>
                    </div>
                  </div>
                  <div className="danger-buttons">
                    <div onClick={() => this.props.togglePostForm(isOpen, post)} className="edit-button"></div>
                    <div onClick={this.onDeletePost} className="delete-button"></div>
                  </div>
                </div>
              </div>

              <div className="content">
                <p className="description">{post.body}</p>
                <div className="add-comment-container">
                  <form 
                    ref={(el) => this.formRef = el}
                    onSubmit={(e) => this.handleSubmit(e, isEditing)}
                  >
                    <fieldset>
                      <input  
                        name="author" 
                        type="text" 
                        placeholder="commenter" 
                        defaultValue={isEditing ? editingComment.author: ''}
                        className={isEditing ? 'edit-mode' : ''}
                        required 
                      />
                    </fieldset>
                    <fieldset>
                      <textarea 
                        name="body" 
                        placeholder="..." 
                        defaultValue={isEditing ? editingComment.body: ''} 
                        className={isEditing ? 'edit-mode' : ''}
                        required 
                      />
                    </fieldset>
                    <button 
                      type="button" 
                      className="cancel" 
                      onClick={() => this.cancelForm()}
                    >
                      Cancel
                    </button>
                    <button className="button button--primary" type="submit">
                      { isEditing ? 'Save comment' : 'Post comment' }
                    </button>
                  </form>
                </div>
        

                <div className="comments">
                  <div>
                    { !!filteredComments.length && <h3>Comments</h3> }
                    <ul>
                    {
                      !!filteredComments.length && filteredComments.map(comment => (
                        !comment.deleted && (
                          <Comment
                            key={comment.id}
                            comment={comment}
                            onEditingComment={this.onEditingComment}
                            onDeleteComment={this.onDeleteComment}
                            voteComment={voteComment}
                          />
                        )
                    ))}
                    </ul>
                  </div>
                  { !!filteredComments.length  && (
                    <div className="filter-wrapper">
                      <Order onOrderClick={this.props.orderComments}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
       
          ): (
            
            <div className="container">
              <div className="header">
                <h2>Post deleted!</h2>
                <Link className="safety-link" to='/'> Take me to Home </Link>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);