import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import { fetchCategories } from 'models/Category/actions'

//components
import Category from './components/Category/Category';

/**
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 * [mapStateToProps(state, [ownProps]): stateProps] (Function)
 * ownProps:props passed to the connected component
 */
const mapStateToProps = ({ postForm, category, filter, router }) => ({
  categories: category.categories,
  pathname: router.location.pathname
})

/**
 * [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)
 */
const mapDispatchToProps = (dispatch, ownProps) => (
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