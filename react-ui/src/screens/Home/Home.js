import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import { fetchCategories } from 'models/Category/actions'

//components
import Category from './components/Category/Category';

const mapStateToProps = ({ post, category, filter, router }) => ({
  categories: category.categories,
})

const mapDispatchToProps = (dispatch, { onPostClick }) => (
  bindActionCreators({
    fetchCategories,
  }, dispatch)
)

class Home extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, pathname  } = this.props;

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
            <div>posts...</div>
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