import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import { fetchCategories } from 'models/Category/actions'
import { fetchPostsAndComments, votePost } from 'models/Post/actions'

//components
import Category from './components/Category/Category';
import PostList from './components/PostList/PostList';

/**
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 * [mapStateToProps(state, [ownProps]): stateProps] (Function)
 * ownProps:props passed to the connected component
 */
const mapStateToProps = ({ postForm, category, filter, router, post }) => ({
  categories: category.categories,
  pathname: router.location.pathname,
  posts: post.posts,
  isFetching: post.isFetching,
})

/**
 * [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)
 */
const mapDispatchToProps = (dispatch, ownProps) => (
  bindActionCreators({
    fetchCategories,
    fetchPostsAndComments,
    votePost,
  }, dispatch)
)

class Home extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPostsAndComments();
  }

  render() {
    const { categories, pathname, posts, isFetching  } = this.props;
    let filteredPosts = posts; //tbd

    return (
      <div className="container">
        <div className="main-container">
          <div className="left-container">
            <Category 
              categories={categories}
              pathname={pathname} 
            />
          </div>
          <div className="middle-container">
          <PostList
              posts={filteredPosts}
              isFetching={isFetching}
              onClickVote={this.props.votePost}
              onPostClick={pathname => this.props.history.push(pathname)}
            />
          </div>
          <div className="right-container">
            <div>filter...</div>
          </div>
        </div>
      </div>
    )
  }
    
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);