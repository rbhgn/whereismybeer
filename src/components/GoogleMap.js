import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { API_KEY } from '../constants'

const mapStyles = {
  width: '50vh',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    const bounds = new this.props.google.maps.LatLngBounds()
    this.props.breweryLocation && bounds.extend(this.props.breweryLocation)
    this.props.userLocation && bounds.extend(this.props.userLocation)
    return (

  <Map google={this.props.google} 
    initialCenter={ this.props.breweryLocation } 
    center={ this.props.breweryLocation }
    style={ mapStyles }
    bounds={ bounds }
    scrollwheel={ false }
  >
    <Marker name={'MARKER1'} position={ this.props.breweryLocation }/>
    <Marker name={'MARKER2'} position={ this.props.userLocation }/>
  </Map>
    
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);