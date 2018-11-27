import React, { Component } from 'react';
import './App.css';
const request = require('superagent');
class App extends Component {
  state = {
    breweries: null
  }

  getBeers = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/brouwerijen.js`)
    .then(result => this.setState({breweries: JSON.parse(result.text).breweries }))
    .catch(err => console.error(err))
    }   
  
    componentDidMount() {
      this.getBeers()
    }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
