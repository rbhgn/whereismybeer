import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectBeerStyles from './SelectBeerStyles'
import SelectBeerKegs from './SelectBeerKegs'

class SearchContainer extends Component {

  render() {
    return (
      <div>

        <SelectBeerStyles 
          beerStyles={ this.props.beerStyles } 
          updateSelectedBeerStyles={ this.props.updateSelectedBeerStyles }
        />

        <SelectBeerKegs 
          beerStyles={ this.props.beerKegs } 
          updateSelectedBeerKegs={ this.props.updateSelectedBeerKegs }
        />

      </div>
    );
  }
}

SearchContainer.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  beerKegs: PropTypes.array.isRequired,
  updateSelectedBeerKegs: PropTypes.func.isRequired,
  updateSelectedBeerStyles: PropTypes.func.isRequired
}

export default SearchContainer