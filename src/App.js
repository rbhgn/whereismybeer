import React, { Component } from 'react'
import './App.css';
import * as request from 'superagent'
import { API_KEY } from './constants'

import SearchContainer from './components/SearchContainer'
import ListBreweries from './components/ListBreweries'
import { getWeekdays, getDistance } from './functions'
import ListBeers from './components/ListBeers';
import GoogleMap from './components/GoogleMap';
import TopBar from './components/TopBar';
import Animation from './components/Animation'

class App extends Component {

  state = {
    beerKegs: null,
    beerStyles: null,
    beers: null,
    breweries: null,
    currentBrewery: null,
    searchResults: null,
    weekDays: null,
    currentLocation: 'No location found'
  }

  searchContainerReady = () => {
    return this.state.beerKegs && this.state.beerStyles && this.state.weekDays && this.state.breweries && this.state.beers
  }

  searchResultsReady = () => {
    return this.state.searchResults && this.searchContainerReady()
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
        v.distance = v.coords && query.position ? getDistance(v.coords, query.position) : "Cannot Find Beer"
        return v
        })
        .sort((a, b) => a.distance - b.distance)
    const currentBrewery = this.state.currentBrewery && breweries.some(v => v.name === this.state.currentBrewery.name) ?this.state.currentBrewery : breweries[0]
    this.setState({searchResults: breweries, currentBrewery})
  }

  updateQuery = async (query) => {
    if (this.state.query && JSON.stringify(this.state.query.position) !== JSON.stringify(query.position)) {
      console.log(query)
      const getLocation = await this.getAddress(`${query.position.lat},${query.position.lng}`)
      const currentLocation = getLocation ? getLocation.formatted_address : 'No location found'
      this.setState({currentLocation})
    }
    this.setState({query})
    this.updateSearchResults(query)
  }

  updateCurrentBrewery = (currentBrewery) => {
    this.setState({currentBrewery})
  }

  getBeers = () => {
    request
    .get(`https://cors-anywhere.herokuapp.com/https://downloads.oberon.nl/opdracht/bieren.js`)
    // .set('Access-Control-Allow-Origin', '*')
    // .withCredentials()
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
    .get(`https://cors-anywhere.herokuapp.com/https://downloads.oberon.nl/opdracht/brouwerijen.js`)
    // .set('Access-Control-Allow-Origin', '*')
    // .withCredentials()
    .then(res => (JSON.parse(res.text).breweries))
    .then(async res => (
      await Promise.all(res.map(async v => {
        v.country = v.city.indexOf(',') === -1 ? 'nl' : 'be'
        v.city = v.city.indexOf(',') === -1 ? v.city : v.city.substring(0, v.city.indexOf(','))
        v.searchStr = `${v.address},${v.zipcode},${v.city},${v.country}`
        v.coords = await this.getCoords(v.searchStr)
        return v
      }))
    ))
    .then(res => this.setState({breweries: res, searchResults: res}))
    .catch(err => console.error(err))
  }
  getDays = () => {
    this.setState({weekDays: getWeekdays()})
  }
 
  getBreweryCoords = async () => {
    let results = []
    for (const brewery of this.state.breweries) {
      results.push(await this.getCoords(brewery.searchStr))
    }
  }
  getCoords = (searchStr) => {
    return request
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchStr}&key=${API_KEY}`)
      .then(res => JSON.parse(res.text).results[0].geometry.location)
      .catch(err => console.error(err))
  }

  getAddress = (searchStr) => {
    return request
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${searchStr}&key=${API_KEY}`)
      .then(res => JSON.parse(res.text).results[0])
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getBeers()
    this.getBreweries()
    this.getDays()
  }

  render() {
    return (
      <div style={ styles.container }>
      <TopBar />
        
      <Animation />
        <div style={ styles.wrapperSide }>
          { this.searchContainerReady() && <SearchContainer 
            beerStyles={ this.state.beerStyles} 
            beerKegs={ this.state.beerKegs} 
            weekDays={ this.state.weekDays }
            updateQuery={ this.updateQuery }
            getCoords={ this.getCoords }
            getAddress={ this.getAddress }
            currentLocation={ this.state.currentLocation }
          />}
        </div>
        <div style={ styles.wrapperMiddle }>
          { this.searchResultsReady() && <ListBreweries 
            selectedBreweries={ this.state.searchResults } 
            updateCurrentBrewery={ this.updateCurrentBrewery }
            currentBrewery={ this.state.currentBrewery }
          /> }
        </div>
        <div style={ styles.wrapperSide }>
          { this.state.query && this.state.currentBrewery && this.searchResultsReady && <GoogleMap 
            userLocation={ this.state.query.position } 
            breweryLocation={ this.state.currentBrewery.coords }
          /> }

           { this.state.currentBrewery && <ListBeers 
            beers={ this.state.currentBrewery.beers } 
          /> }
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
    display: 'flex',
    justifyContent: 'space-evenly',
    background: 'linear-gradient(135deg, #d2c200 0%,#b55c00 100%)',
  },
  wrapperSide: {
    width: '25%',
    margin: '10px',
    paddingTop: '40px',
    overflow: 'hidden',
    zIndex: '2'
  },
  wrapperMiddle: {
    width: '40%',
    margin: '10px',
    paddingTop: '40px',
    overflow: 'hidden',
    zIndex: '2'
  }
})
