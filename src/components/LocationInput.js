import React, { Component } from 'react'
import PropTypes from 'prop-types'


class LocationInput extends Component {
  state = {inputValue: ''}

  onChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  onSubmit = async (e) => {
    e.preventDefault()
    if (this.state.inputValue !== '' && this.state.inputValue.length > 3) {
      const coords = await this.props.getCoords(this.state.inputValue)
      if (coords) {
      this.props.updatePosition(coords.lat, coords.lng)
      }
    }
    this.setState({inputValue: ''})
  }
  render() {
    return (
      <form onSubmit={ this.onSubmit }>
        <input type='text' value={ this.state.inputValue } onChange={ this.onChange } style={{width: 'calc(100% - 12px)',fontFamily: 'Montserrat, sans-serif', fontSize: '16px',padding:'4px',color: '#333333'}} placeholder='Your Address'></input>
        <button style={{width: '100%',fontFamily: 'Montserrat, sans-serif', fontSize: '16px',padding:'4px', background: '#b55c00', color: '#ffffff'}}>Find Address</button>
      </form>
    )
  }
}

export default LocationInput;

LocationInput.propTypes = {
  getCoords: PropTypes.func.isRequired
}