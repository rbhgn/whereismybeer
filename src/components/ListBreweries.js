import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BreweryInfo from './BreweryInfo'

class ListBreweries extends Component {
  
  selectBrewery = (i) => (e) => {
    const selectedBrewery = this.props.selectedBreweries[i]
    this.props.updateCurrentBrewery(selectedBrewery)
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
            selected={ this.props.currentBrewery && this.props.currentBrewery.name === v.name ? true : false }
            distance={ v.distance }
          />
          ))
    )  
  }
}

export default ListBreweries

ListBreweries.propTypes = {
  selectedBreweries: PropTypes.array.isRequired,
  updateCurrentBrewery: PropTypes.func.isRequired,
  currentBrewery: PropTypes.object
}