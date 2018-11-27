import React, { Component } from 'react';
import './App.css';
import * as request from 'superagent'

class App extends Component {
  state = {
    beers: null,
    breweries: null
  }

  getBeers = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/bieren.js`)
    .then(result => this.setState({beers: JSON.parse(result.text).beers}))
    .catch(err => console.error(err))
  }

  getBreweries = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/brouwerijen.js`)
    .then(result => this.setState({breweries: JSON.parse(result.text).breweries }))
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getBeers()
    this.getBreweries()
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
