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
        <input type='text' value={ this.state.inputValue } onChange={ this.onChange }></input>
        <button>Submit</button>
      </form>
    )
  }
}

export default LocationInput;

LocationInput.propTypes = {
  getCoords: PropTypes.func.isRequired
}