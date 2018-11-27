import React, { Component } from 'react';
import './App.css';
import { getBeersApi } from'./actions/actions'
import * as request from 'superagent'

class App extends Component {
  state = {
    beers: null,
    breweries: null,
    userLocation: null
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

  setLocation = (lat, lon) => {
    this.setState({userLocation: {lat, lon} })
  }
  
  getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => this.setLocation(pos.coords.latitude, pos.coords.longitude) )
    }
}
  componentDidMount() {
    this.getBeers()
    this.getBreweries()
    this.getCurrentLocation()
  }
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
