import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BreweryInfo extends Component {

  render() {
    return (
      <div className="App">
        <p>{ this.props.name }</p>
        <p>{ this.props.address }</p>
        <p>{ this.props.zipcode }</p>
        <p>{ this.props.city }</p>
      </div>
    );
  }
}
export default BreweryInfo;

BreweryInfo.propTypes = {
  address:  PropTypes.string.isRequired,
  beers:    PropTypes.array.isRequired,
  city:     PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  open:     PropTypes.array.isRequired,
  zipcode:  PropTypes.string.isRequired
}

