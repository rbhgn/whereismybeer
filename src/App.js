import React, { Component } from 'react';
import './App.css';
import * as request from 'superagent'
// import BeerInfo from'./components/BeerInfo'
// import BreweryInfo from './components/BreweryInfo';
import SearchContainer from './components/SearchContainer';

class App extends Component {
  state = {
    beerKegs: null,
    beerStyles: null,
    beers: null,
    breweries: null,
    userLocation: null
  }

  getBeers = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/bieren.js`)
    .then(result  => this.setState({beers: JSON.parse(result.text).beers}))
    .then(()      => this.setState({beerStyles: [...new Set(this.state.beers.map(e => e.style))]}))
    .then(()      => this.setState({beerKegs: [...new Set(this.state.beers.map(e => e.keg))]}))
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
        {this.state.beerStyles && this.state.beerKegs && <SearchContainer beerStyles={ this.state.beerStyles} beerKegs={ this.state.beerKegs}/>}

        {/* { this.state.beers && this.state.breweries && <BeerInfo 
          alcohol={ this.state.beers[2].alcohol }
          brewery={ this.state.breweries.find(e => e.name === this.state.beers[2].brewery) }
          keg={ this.state.beers[2].keg }
          name={ this.state.beers[2].name }
          style={ this.state.beers[2].style }
          volume={ this.state.beers[2].volume }
        /> }

        { this.state.beers && this.state.breweries && <BreweryInfo 
          address={ this.state.breweries[2].address }
          beers={ this.state.beers.filter(e => e.brewery === this.state.breweries[2].name) }
          city={ this.state.breweries[2].city }
          name={ this.state.breweries[2].name }
          open={ this.state.breweries[2].open }
          zipcode={ this.state.breweries[2].zipcode }
        /> } */}

      </div>
    );
  }
}

export default App;
