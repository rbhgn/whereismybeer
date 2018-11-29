import React, { Component } from 'react'
import PropTypes from 'prop-types'


class CurrentLocation extends Component {
  style = {
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '16px',
    padding:'4px',
    color:'#333333',
    lineHeight: '1em',
    height: '48px'
  }
  render() {
    return (
        <div style={this.style}>
          { this.props.currentLocation.split(',').map((v, i) =><div key={ i }> { v  }</div>  ) }
        </div>
    )
  }
}

export default CurrentLocation;
CurrentLocation.propTypes = {
  currentLocation: PropTypes.string.isRequired
}