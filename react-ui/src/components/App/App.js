import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

//components
import Header from 'components/Header/Header';
import PostForm from 'components/PostForm/PostForm';
//screens
import Home from 'screens/Home/Home';
//actions
import { togglePostForm } from 'models/PostForm/actions';

const mapStateToProps = ({ router }) => ({
  pathname: router.location.pathname,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    togglePostForm,
  }, dispatch)
}

class App extends Component {
  render() {
    const { togglePostForm } = this.props;

    return (
      <div className="container">
        <Header togglePostForm={togglePostForm} />
        <Route exact path="/:category?" component={Home}/>
        <PostForm/>
    </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
