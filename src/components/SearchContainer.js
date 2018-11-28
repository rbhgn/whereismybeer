import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectBeerStyles from './SelectBeerStyles'
import SelectBeerKegs from './SelectBeerKegs'
import SelectDays from './SelectDays'
import GeoLocateButton from './GeoLocateButton';
import LocationInput from './LocationInput';

class SearchContainer extends Component {
  state = {
    beerStyles: [],
    beerKegs: [],
    weekDays: [],
    position: null
  }

  style = {
    location: {
    width: '100%',
    background: '#ffffff'
    },
    filters: {
      width: '100%',
      background: '#ffffff' 
    }

  }

  updateSelectedBeerStyles = (v) => {
    this.setState({beerStyles: v})
    const newState = {...this.state, beerStyles: v}
    this.props.updateQuery(newState)
  }

  updateSelectedBeerKegs = (v) => {
    this.setState({beerKegs: v})
    const newState = {...this.state, beerKegs: v}
    this.props.updateQuery(newState)
  }

  updateSelectedWeekDays = (v) => {
    this.setState({weekDays: v})
    const newState = {...this.state, weekDays: v}
    this.props.updateQuery(newState)
  }

  updatePosition = (lat, lon) => {
    this.setState({position: {lat,lng: lon}})
    this.props.updateQuery({...this.state, position:{lat, lng: lon}})
  }

  componentDidMount() {
    const state = {
      beerStyles: this.props.beerStyles,
      beerKegs: this.props.beerKegs,
      weekDays: this.props.weekDays,
      position: null
    }
    this.setState(state)
    this.props.updateQuery(state)
  }

  render() {
    return (
      <div>
        <div style={ this.style.location }>
          <h1>Location</h1>
          <p>{ this.props.currentLocation }</p>
          { <GeoLocateButton updatePosition={ this.updatePosition }/> }
          { <LocationInput getCoords={ this.props.getCoords } updatePosition={ this.updatePosition } />}
        </div>
        <div style={ this.style.filters }>
          <h1>Filter</h1>
          <h2>Styles</h2>
          <SelectBeerStyles 
            beerStyles={ this.props.beerStyles } 
            updateSelectedBeerStyles={ this.updateSelectedBeerStyles }
          />

          <h2>Kegs</h2>
          <SelectBeerKegs 
            beerKegs={ this.props.beerKegs } 
            updateSelectedBeerKegs={ this.updateSelectedBeerKegs }
          />

          <h2>Open</h2>
          <SelectDays 
            weekDays={ this.props.weekDays } 
            updateSelectedWeekDays={ this.updateSelectedWeekDays }
          />
          </div>

      </div>
    );
  }
}

SearchContainer.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  beerKegs: PropTypes.array.isRequired,
  weekDays: PropTypes.array.isRequired,
  updateQuery: PropTypes.func.isRequired
}

export default SearchContainer