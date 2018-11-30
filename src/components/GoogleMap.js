import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { API_KEY } from '../constants'

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relative',
  title: {
    fontFamily: 'Raleway, sans-serif',
    fontSize: '22px',
    textAlign: 'center',
    color: '#ffffff'
  }
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
      <div>
        <h1 style={ mapStyles.title }> - Map - </h1>
      
<div 
  style={{ 
    width: '100%', 
    height: '250px',
    display: 'flex', 
    flexFlow: 'row nowrap', 
    justifyContent: 'center',
    position: 'relative', 
    padding: 0,borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0px 0px 25px 1px #d2c200'
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
    </div></div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);