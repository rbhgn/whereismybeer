import React, { Component } from 'react'
import PropTypes from 'prop-types'


class GeoLocateButton extends Component {
  state = {
    geoLocateAvailable: false,
    geoLocatePermission: false
  }
  styles = {
    button: {
      width: '100%',
      fontFamily: 'Montserrat, sans-serif', 
      fontSize: '16px',
      padding:'4px', 
      background: '#b55c00', 
      color: '#ffffff'
    },
    text: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      padding:'4px',
      color:'#333333'
    }
  }
  checkGeoLocate = () => {
    const geoLocateAvailable = navigator.geolocation ? true : false
    if (geoLocateAvailable) {
      navigator.permissions.query({'name': 'geolocation'}).then( permission => this.setState({geoLocatePermission: permission.state}))
    }
    this.setState({geoLocateAvailable})
  }

  handleClick = () => {
    navigator.geolocation.getCurrentPosition(pos => this.props.updatePosition(pos.coords.latitude, pos.coords.longitude))
  }
  componentDidMount(){
    this.checkGeoLocate()
  }
  render() {
    return (
      this.state.geoLocateAvailable && this.state.geoLocatePermission && this.state.geoLocatePermission !== 'denied' && 
        <div style={{textAlign: 'center'}}>
        <button onClick={ this.handleClick } style={ this.styles.button }>Find My Location</button>
          <span style={ this.styles.text } >Or </span>
        </div>
    )
  }
}

export default GeoLocateButton;

GeoLocateButton.propTypes = {
  updatePosition: PropTypes.func.isRequired
}