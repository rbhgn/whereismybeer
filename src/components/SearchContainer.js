import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectBeerStyles from './SelectBeerStyles'
import SelectBeerKegs from './SelectBeerKegs'
import SelectDays from './SelectDays'

class SearchContainer extends Component {
  state = {
    beerStyles: [],
    beerKegs: [],
    weekDays: []
  }

  style = {
    padding: '10px',
    minWidth: '200px',
    fontSize: '10px'
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

  componentDidMount() {
    const state = {
      beerStyles: this.props.beerStyles,
      beerKegs: this.props.beerKegs,
      weekDays: this.props.weekDays
    }
    this.setState(state)
    this.props.updateQuery(state)
  }

  render() {
    return (
      <div style={ this.style }>

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