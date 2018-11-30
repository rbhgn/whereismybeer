import React, { Component } from 'react';
import PropTypes from 'prop-types';


class BreweryInfo extends Component {

  styles = {
    breweryInfoContainer: {
      width: '100%',
      padding: '4px 10px',
      margin: '0',
      overflow: 'hidden',
      display: 'inline-block',
      cursor: 'pointer'
    },
    selected: {
      width: '100%',
      padding: '4px 10px',
      margin: '0',
      overflow: 'hidden',
      display: 'inline-block',
      cursor: 'pointer',
      background: '#eeeeee'
    },
    breweryInfoName: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '20px',
      color: '#333333'
    },
    breweryInfoAddress: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '10px',
      color: '#333333'
    }
  }

  render() {
    return (
      <div style={ this.props.selected ? this.styles.selected : this.styles.breweryInfoContainer } onClick={ this.props.selectBrewery(this.props.index) } >
        <div style={ this.styles.breweryInfoName }>
          { !isNaN(this.props.distance) &&  Math.round(this.props.distance) + ' KM'} { this.props.name.toUpperCase() }
        </div>
        <div style={ this.styles.breweryInfoAddress }>
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
  selected: PropTypes.bool.isRequired,
  distance: PropTypes.number
}