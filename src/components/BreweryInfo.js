import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import BeerInfo from './BeerInfo'
class BreweryInfo extends Component {

  selectBrewery = (i) => (e) => {
    this.props.selectBrewery(i)
  }

  render() {
    return (
      <div style={ styles.breweryInfoContainer } onClick={ this.selectBrewery(this.props.index) } >
        <div style={ styles.breweryInfoName }>
          { this.props.name.toUpperCase() }
        </div>
        <div style={ styles.breweryInfoAddress }>
          { this.props.address }, { this.props.zipcode }, { this.props.city }
        </div>
      </div>
    );
  }
}
export default BreweryInfo;

BreweryInfo.propTypes = {
  address:  PropTypes.string.isRequired,
  city:     PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  open:     PropTypes.array.isRequired,
  zipcode:  PropTypes.string.isRequired
}

const styles = ({
  breweryInfoContainer: {
    width: '100%',
    padding: '0',
    margin: '4px',
    overflow: 'hidden',
    display: 'inline-block',
    cursor: 'pointer'
  },
  breweryInfoName: {
    fontSize: '20px'
  },
  breweryInfoAddress: {
    fontSize: '10px'
  }
})