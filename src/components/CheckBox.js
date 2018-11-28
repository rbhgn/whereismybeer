import React, { Component } from 'react'
import PropTypes from 'prop-types'


class CheckBox extends Component {
  state = {checked: true}

  style = {
    container: {
      width: '100%',
      fontSize: '14px',
      fontFamily: 'Montserrat, sans-serif'
    }
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value, !this.state.checked)
    this.setState( (prev) => ({checked: !prev.checked}) )
  }
  render() {
    return (
      <div style={ this.style.container }>
        <label>
          <input type="checkbox" value={ this.props.value } onChange={ this.handleChange } checked= {this.state.checked}/>
          { this.props.label.toUpperCase() }
        </label>
        </div>
    )
  }
}

export default CheckBox;

CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}