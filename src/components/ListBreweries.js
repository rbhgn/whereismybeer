import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BreweryInfo from './BreweryInfo'

class ListBreweries extends Component {
  styles = {
    container: {
      background: '#ffffff',
      padding: '10px',
      borderRadius:'10px',
      boxShadow: '0px 0px 25px 1px #d2c200'
    },
    header: {
      fontFamily: 'Raleway, sans-serif',
      fontSize: '22px',
      textAlign: 'center',
      color: '#ffffff'
    }
  }
  selectBrewery = (i) => (e) => {
    const selectedBrewery = this.props.selectedBreweries[i]
    this.props.updateCurrentBrewery(selectedBrewery)
  }

  render() {
    return (
      <div>
        <h1 style={ this.styles.header }> - Breweries - </h1>
        <div style={ this.styles.container }>
        { this.props.selectedBreweries.map((v,i) => (
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
          )) }
          </div>
          </div>
    )  
  }
}

export default ListBreweries

ListBreweries.propTypes = {
  selectedBreweries: PropTypes.array.isRequired,
  updateCurrentBrewery: PropTypes.func.isRequired,
  currentBrewery: PropTypes.object
}