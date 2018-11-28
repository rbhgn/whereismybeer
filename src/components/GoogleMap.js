import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { API_KEY } from '../constants'

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

export class MapContainer extends Component {
  getCenter = () => { 
    const latCenter = (this.props.breweryLocation.lat + this.props.userLocation.lat) / 2
    const lngCenter = (this.props.breweryLocation.lng + this.props.userLocation.lng) / 2
    return {lat: latCenter, lng: lngCenter}
  }

  getBounds = () => { 
    const bounds = new this.props.google.maps.LatLngBounds()
    this.props.breweryLocation && bounds.extend(this.props.breweryLocation)
    this.props.userLocation && bounds.extend(this.props.userLocation)
    return bounds
  }

  render() {
 

    const center = this.props.breweryLocation && this.props.userLocation ? this.getCenter() : this.props.breweryLocation
    const bounds = this.props.breweryLocation && this.props.userLocation ?this.getBounds() : null

    return (
<div 
  style={{ height: 350, 
    width: '100%', 
    display: 'flex', 
    flexFlow: 'row nowrap', 
    justifyContent: 'center',
    position: 'relative', 
    padding: 0 
  }}
>
  <Map google={this.props.google} 
    initialCenter={ center} 
    zoom={ 12 }
    center={ center }
    style={ mapStyles }
    bounds={ bounds }
    scrollwheel={ false }
    zoomControl={ false }
    mapTypeControl={ false }
    scaleControl={ false }
    streetViewControl={ false }
    rotateControl={ false }
    fullscreenControl={ false }
  >
    <Marker name={'Brewery'} position={ this.props.breweryLocation }/>
    <Marker name={'User'} position={ this.props.userLocation }/>
  </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);