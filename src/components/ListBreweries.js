import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BreweryInfo from './BreweryInfo'

class ListBreweries extends Component {
  state = {selectBrewery: null}
  selectBrewery = (i) => {
    this.setState({selectBrewery: this.props.selectedBreweries[i]})
  }
  render() {
    return (
        this.props.selectedBreweries.map((v,i) => (
          <BreweryInfo 
            address={ v.address }
            city={ v.city }
            name={ v.name }
            open={ v.open }
            zipcode={ v.zipcode }
            key={ i }
            index={ i }
            selectBrewery={ this.selectBrewery }
          />
          ))
    )  
  }
}

export default ListBreweries

ListBreweries.propTypes = {
  selectedBreweries: PropTypes.array.isRequired,
  selectBrewery: PropTypes.func.isRequired
}