import React, { Component } from 'react'
import PropTypes from 'prop-types'


class GeoLocateButton extends Component {
  state = {
    geoLocateAvailable: false,
    geoLocatePermission: false
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
      this.state.geoLocateAvailable && this.state.geoLocatePermission && this.state.geoLocatePermission !== 'denied' && <button onClick={ this.handleClick }>FindMyPosition</button>
    )
  }
}

export default GeoLocateButton;

GeoLocateButton.propTypes = {
  updatePosition: PropTypes.func.isRequired
}