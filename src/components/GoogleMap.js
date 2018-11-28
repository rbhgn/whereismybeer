import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { API_KEY } from '../constants'

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
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
    <Marker name={'Brewery'} position={ this.props.breweryLocation }/>
    <Marker name={'User'} position={ this.props.userLocation }/>
  </Map>
    
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);