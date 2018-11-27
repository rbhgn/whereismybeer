import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectBeerStyles from './SelectBeerStyles'
import SelectBeerKegs from './SelectBeerKegs'


class SearchContainer extends Component {
  state = {
      SelectBeerStyles: null,
      SelectBeerKegs: null
    } 

  updateQueryBeerStyles = (a) => {
    this.setState({SelectBeerStyles: a } )
  }

  updateQueryBeerKegs = (a) => {
    this.setState({SelectBeerKegs: a } )
  }

  render() {
    return (
      <div>
        <SelectBeerStyles beerStyles={ this.props.beerStyles } updateQuery={ this.updateQueryBeerStyles }/>
        <SelectBeerKegs beerStyles={ this.props.beerKegs } updateQuery={ this.updateQueryBeerKegs }/>
      </div>
    );
  }
}
export default SearchContainer

SearchContainer.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  beerKegs: PropTypes.array.isRequired
}