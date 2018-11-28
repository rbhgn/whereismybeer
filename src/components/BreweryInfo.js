import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BreweryInfo extends Component {

  render() {
    return (
      <div style={ styles.breweryInfoContainer } onClick={ this.props.selectBrewery(this.props.index) } >
        <div style={ styles.breweryInfoName }>
          { !isNaN(this.props.distance) &&  Math.round(this.props.distance) + ' KM'} { this.props.name.toUpperCase() } { this.props.selected && '*' }
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
  zipcode:  PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
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
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '20px'
  },
  breweryInfoAddress: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '10px'
  }
})