import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api';

class App extends Component {
  
  state = {
    message: null,
    fetching: true
  };  

  componentDidMount() {
    api.get('/categories')
    .then(({data}) => {
      this.setState({
        message: data.categories.reduce((sum, value) => sum + value.name + ",", ""),
        fetching: false
      });
    })
    .catch(error => {
      if (error.response) {
        throw new Error(`status ${error.response.data}`);
      }

      this.setState({
        message: `API call failed: ${error}`,
        fetching: false
      });
    })
  }  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>        
      </div>
    );
  }
}

export default App;
