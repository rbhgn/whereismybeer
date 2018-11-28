import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BeerInfo extends Component {
  styles = {
    container: {
      width: '100%'
    },
    header: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '20px'
    },
    info: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '10px' 
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  }
  render() {
    return (
      <div style={ this.styles.container }>
        <div style={ this.styles.header }>
          { this.props.name.toUpperCase() }
        </div>
        <div style={ this.styles.infoContainer}>
          {/* <div> */}
            <p style={ this.styles.info }>Keg: { this.props.keg }</p>
            <p style={ this.styles.info }>Style: { this.props.style }</p>
          {/* </div>
          <div> */}
            <p style={ this.styles.info }>Volume: { this.props.volume }ml</p>
            <p style={ this.styles.info }>Alcohol: { this.props.alcohol }%</p>
          {/* </div> */}
        </div>
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