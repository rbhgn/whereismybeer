import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BeerInfo extends Component {

  render() {
    return (
      <div className="App">
        <p>this.props.name</p>
        <p>this.props.keg</p>
        <p>this.props.style</p>
        <p>this.props.volume</p>
        <p>this.props.alcohol</p>
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
  volume:   PropTypes.number.isRequired,
}