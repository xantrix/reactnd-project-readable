import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {
    message: null,
    fetching: true
  };  

  componentDidMount() {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "whatever-you-want");
    myHeaders.append("Accept", "application/json");

    let myInit = {
      method: 'GET',
      headers: myHeaders,
      //mode: 'cors',
      cache: 'default'
    };

    fetch('/categories', myInit)
    .then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    })
    .then(json => {
      this.setState({
        message: json.categories.reduce((sum, value) => sum + value.name + ",", ""),
        fetching: false
      });
    }).catch(e => {
      this.setState({
        message: `API call failed: ${e}`,
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
