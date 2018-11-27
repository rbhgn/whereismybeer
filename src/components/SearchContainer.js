import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectBeerStyles from './SelectBeerStyles'
import SelectBeerKegs from './SelectBeerKegs'
import SelectDays from './SelectDays'

class SearchContainer extends Component {
  style = {
    padding: '10px',
    minWidth: '200px',
    fontSize: '10px'
  }
  render() {
    return (
      <div style={ this.style }>
      
        <h2>Styles</h2>
        <SelectBeerStyles 
          beerStyles={ this.props.beerStyles } 
          updateSelectedBeerStyles={ this.props.updateSelectedBeerStyles }
        />

        <h2>Kegs</h2>
        <SelectBeerKegs 
          beerStyles={ this.props.beerKegs } 
          updateSelectedBeerKegs={ this.props.updateSelectedBeerKegs }
        />

        <h2>Open</h2>
        <SelectDays 
          weekDays={ this.props.weekDays } 
          updateSelectedWeekDays={ this.props.updateSelectedWeekDays }
        />

      </div>
    );
  }
}

SearchContainer.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  beerKegs: PropTypes.array.isRequired,
  weekDays: PropTypes.array.isRequired,
  updateSelectedBeerKegs: PropTypes.func.isRequired,
  updateSelectedBeerStyles: PropTypes.func.isRequired,
  updateSelectedWeekDays: PropTypes.func.isRequired
}

export default SearchContainer