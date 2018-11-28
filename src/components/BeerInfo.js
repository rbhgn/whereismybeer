import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BeerInfo extends Component {
  styles = {
    container: {
      width: '100%'
    }
  }
  render() {
    return (
      <div style={ this.styles.container }>
        <div style={ this.styles.header }>
          { this.props.name.toUpperCase() }
        </div>
        <p>Keg: { this.props.keg }</p>
        <p>style: { this.props.style }</p>
        <p>Volume:{ this.props.volume }</p>
        <p>Alcohol: { this.props.alcohol } %</p>
      </div>
    );
  }
}
export default BeerInfo;

BeerInfo.propTypes = {
  alcohol:  PropTypes.number.isRequired,
  keg:      PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  style:    PropTypes.string.isRequired,
  volume:   PropTypes.number.isRequired
}