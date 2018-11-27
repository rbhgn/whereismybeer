import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'
import SelectBeerStyles from './SelectBeerStyles';


class SearchContainer extends Component {
  state = {query: {SelectBeerStyles: null}}

  updateQueryBeerStyles = (a) => {
    this.setState({query: {SelectBeerStyles: a }} )
  }

  render() {
    return (
      <div>
        <SelectBeerStyles beerStyles={ this.props.beerStyles } updateQuery={ this.updateQueryBeerStyles }/>
      </div>
    );
  }
}
export default SearchContainer

SearchContainer.propTypes = {
  beerStyles: PropTypes.array.isRequired
}