import React, { Component } from 'react'
import './App.css';
import * as request from 'superagent'
import SearchContainer from './components/SearchContainer'
import ListBreweries from './components/ListBreweries'
import { getWeekdays } from './functions'
import ListBeers from './components/ListBeers';

class App extends Component {

  state = {
    beerKegs: null,
    beerStyles: null,
    beers: null,
    breweries: null,
    currentBrewery: null,
    searchResults: null,
    userLocation: null,
    weekDays: null
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
        return v
        })
    this.setState({searchResults: breweries})
  }
  updateQuery = (query) => {
    this.setState({query})
    this.updateSearchResults(query)
  }

  updateCurrentBrewery = (currentBrewery) => {
    this.setState({currentBrewery})
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
      console.log(JSON.parse(result.text).breweries)
      const breweries = JSON.parse(result.text).breweries.map(v => {
        v.country = v.city.indexOf(',') === -1 ? 'nl' : 'be'
        v.city = v.city.indexOf(',') === -1 ? v.city : v.city.substring(0, v.city.indexOf(','))
        return v
      })
      console.log(breweries)
      this.setState({breweries, searchResults: breweries})
    })
    .catch(err => console.error(err))
  }
  getDays = () => {
    this.setState({weekDays: getWeekdays()})
  }
 

  componentDidMount() {
    this.getBeers()
    this.getBreweries()
    this.getDays()
  }

  render() {
    return (
      <div style={ styles.container }>
        <div>
          { this.searchContainerReady() && <SearchContainer 
            beerStyles={ this.state.beerStyles} 
            beerKegs={ this.state.beerKegs} 
            weekDays={ this.state.weekDays }
            updateQuery={ this.updateQuery }
          />}
        </div>
        <div>
          { this.searchResultsReady() && <ListBreweries 
            selectedBreweries={ this.state.searchResults } 
            updateCurrentBrewery={ this.updateCurrentBrewery }
          /> }
        </div>
        <div>
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

