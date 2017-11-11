import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import { fetchCategories } from 'models/Category/actions'
import { fetchPostsAndComments, votePost } from 'models/Post/actions'
import { orderPosts } from 'models/Order/actions';

//components
import Category from './components/Category/Category';
import PostList from './components/PostList/PostList';
import Order    from 'components/Order/Order';

import order from 'app/util/order';

/**
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 * [mapStateToProps(state, [ownProps]): stateProps] (Function)
 * ownProps:props passed to the connected component
 */
const mapStateToProps = ({ postForm, category, order, router, post }) => ({
  categories: category.categories,
  pathname: router.location.pathname,
  posts: post.posts,
  orderType: order.post,
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
    orderPosts,
  }, dispatch)
)

class Home extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPostsAndComments();
  }

  filterPostByCategory(posts, pathname) {
    if (posts.length !== 0) {
      let clonedPost = posts.concat();

      // filter posts by category
      if (pathname !== '/') {
        const path = pathname.concat().replace('/', '');
        
        clonedPost = posts.filter(p =>
          p.category.toLowerCase() === path
        )
      }

      // order posts
      const { orderType } = this.props;
      return order(clonedPost, orderType.order, orderType.by);

    } else {
      return []
    }
  }

  render() {
    const { categories, pathname, posts, isFetching  } = this.props;
    let filteredPosts = this.filterPostByCategory(posts, pathname);

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
          <Order onOrderClick={this.props.orderPosts} />
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