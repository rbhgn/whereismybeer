import React, { Component } from 'react'
import './App.css';
import * as request from 'superagent'
import SearchContainer from './components/SearchContainer'
import ListBreweries from './components/ListBreweries'
import { getWeekdays, getCoords } from './functions'

class App extends Component {

  state = {
    beerKegs: null,
    beerStyles: null,
    beers: [],
    breweries: [],
    searchResults: null,
    userLocation: null,
    weekDays: []
  }

  setLocation = (lat, lon) => {
    this.setState({userLocation: {lat, lon} })
  }
  updateSearchResults = (query) => {
    const beers = this.state.beers
      .filter(beer => query.beerStyles.includes(beer.style))
      .filter(beer => query.beerKegs.includes(beer.keg))
    const breweries = this.state.breweries
      .filter(brewery => brewery.open.some(day => query.weekDays.includes(day)))
      .filter(brewery => beers.some(beer => beer.brewery === brewery.name))
      .map(v => {
        v.beers = beers.filter(w => w.brewery === v.name)
        return v
        })
    this.setState({searchResults: breweries})
  }
  setQuery = (query) => {
    this.setState({query})
    this.updateSearchResults(query)
  }
  getBeers = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/bieren.js`)
    .then(result  => {
      const beers = JSON.parse(result.text).beers
      const beerStyles = [...new Set(beers.map(e => e.style))]
      const beerKegs = [...new Set(beers.map(e => e.keg))]
      this.setState({beers, beerStyles, beerKegs, searchResults:{beers}})
    })
    .catch(err => console.error(err))
  }
  getBreweries = () => {
    request
    .get(`https://downloads.oberon.nl/opdracht/brouwerijen.js`)
    .then(result => {
      const breweries = JSON.parse(result.text).breweries.map(v => {
        v.country = v.city.indexOf(',') === -1 ? 'nl' : 'be'
        v.city = v.city.indexOf(',') === -1 ? v.city : v.city.substring(0, v.city.indexOf(','))
        return v
      })
      this.setState({breweries, searchResults: breweries})
    })
    .catch(err => console.error(err))
  }
  getDays = () => {
    this.setState({weekDays: getWeekdays()})
  }
  getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => this.setLocation(pos.coords.latitude, pos.coords.longitude) )
    }
  }

  getGeoLocation = (searchStr) => {
    request
    .get(`https://eu1.locationiq.com/v1/search.php?key=bf365b22732a9f&${searchStr}&format=json`)
    .then(result => {
      const rawData = JSON.parse(result.text)
      const data = rawData.length > 0 ? { lat: rawData[0].lat, lon: rawData[0].lon } : null
      console.log(data)
      return data
      })
    .catch(err =>  null)
  }
  componentDidMount() {
    this.getBeers()
    this.getBreweries()
    this.getDays()
    this.getCurrentLocation()
    // getCoords(2593, 'CT', 134)
    // this.getGeoLocation()
  }

  render() {
    return (
      <div style={ styles.container }>
        <div>
          {this.state.beerStyles && this.state.beerKegs && this.state.weekDays && <SearchContainer 
            beerStyles={ this.state.beerStyles} 
            beerKegs={ this.state.beerKegs} 
            weekDays={ this.state.weekDays }
            updateSelectedBeerKegs={ this.updateSelectedBeerKegs } 
            updateSelectedBeerStyles={ this.updateSelectedBeerStyles }
            updateSelectedWeekDays={ this.updateSelectedWeekDays }
            setQuery={ this.setQuery }
          />}
        </div>
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
        <div>
          {/* { this.state.searchResults && <ListBreweries 
            selectedBreweries={ this.state.searchResults } 
            selectBrewery={ this.selectBrewery }
          /> } */}
        </div>
      </div>
    );
  }
}

export default App;

const styles = ({
  container: {
    width: '100vw',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
    display: 'flex'
  },
  breweryInfoName: {
    fontSize: '20px'
  },
  breweryInfoAddress: {
    fontSize: '10px'
  }
})

//bf365b22732a9f

