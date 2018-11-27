import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BreweryInfo from './BreweryInfo'

class ListBeers extends Component {

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
            selectBrewery={ this.props.selectBrewery }
          />
          ))
    )
  
    
  }
}

export default ListBeers

ListBeers.propTypes = {
  selectedBreweries: PropTypes.array.isRequired,
  selectBrewery: PropTypes.func.isRequired
}