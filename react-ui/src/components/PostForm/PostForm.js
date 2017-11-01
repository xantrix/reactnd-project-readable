import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import './PostForm.css'
//actions
import { togglePostForm } from 'models/PostForm/actions';

const mapStateToProps = ({ postForm }) => ({
  isOpen: postForm.isOpen,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    togglePostForm,
  }, dispatch)
}

class PostForm extends Component {
  render() {
    return (
      <Modal
          isOpen={this.props.isOpen}
          onRequestClose={() => this.props.togglePostForm(this.isOpen)}
          contentLabel="Post Modal"
      >
        <div>Post Form</div>
      </Modal>
      
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);