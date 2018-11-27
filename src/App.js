import React, { Component } from 'react'
import './App.css';
import * as request from 'superagent'
// import BeerInfo from'./components/BeerInfo'
// import BreweryInfo from './components/BreweryInfo';
import SearchContainer from './components/SearchContainer'
import ListBreweries from './components/ListBreweries'
import { getWeekdays } from './functions'

class App extends Component {

  state = {
    beerKegs: null,
    beerStyles: null,
    beers: null,
    breweries: null,
    searchResults: null,
    selectedBeerKegs: null,
    selectedBeerStyles: null,
    selectedBreweryIndex: null,
    selectedWeekDays: null,
    userLocation: null,
    weekDays: null
  }
  setLocation = (lat, lon) => {
    this.setState({userLocation: {lat, lon} })
  }

  updateSearchResults = (beerKegs, beerStyles, weekDays) => {
    let searchResults
      if (
        beerKegs.length === this.state.beerKegs.length && 
        beerStyles.length === this.state.beerStyles.length
      ) {
        searchResults = this.state.breweries
      } else {
        searchResults = this.state.breweries
          .filter(v => this.state.beers
            .some(w => 
              (
                v.name === w.brewery && 
                beerKegs.includes(w.keg) && 
                beerStyles.includes(w.style)
              ) 
            )
          ).filter(x => x.open.some(y => weekDays.includes(y)))
      }
      this.selectBrewery(0)
    this.setState({searchResults})
  }

  selectBrewery = (i) => {
    this.setState({selectedBreweryIndex: i})
  }
  
  updateSelectedBeerKegs = (v) => {
    this.setState({selectedBeerKegs: v})

    this.state.selectedBeerStyles && 
      this.state.selectedWeekDays && 
      this.updateSearchResults(v, this.state.selectedBeerStyles, this.state.selectedWeekDays)
  }

  updateSelectedBeerStyles = (v) => {
    this.setState({selectedBeerStyles: v})

    this.state.selectedBeerKegs && 
      this.state.selectedWeekDays && 
      this.updateSearchResults(this.state.selectedBeerKegs, v, this.state.selectedWeekDays)
  }

  updateSelectedWeekDays = (v) => {
    this.setState({selectedWeekDays: v})

    this.state.selectedBeerKegs && 
      this.state.selectedBeerStyles && 
      this.updateSearchResults(this.state.selectedBeerKegs, this.state.selectedBeerStyles, v)
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

  getDays = () => {
    const weekDays = getWeekdays(2)
    this.setState({weekDays})
  }

  getCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => this.setLocation(pos.coords.latitude, pos.coords.longitude) )
    }
  }

  componentDidMount() {
    this.getBeers()
    this.getBreweries()
    this.getDays()
    this.getCurrentLocation()
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
          { this.state.searchResults && <ListBreweries 
            selectedBreweries={ this.state.searchResults } 
            selectBrewery={ this.selectBrewery }
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