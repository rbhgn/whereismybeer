import React, { Component } from 'react';
import PropTypes from 'prop-types';


class CheckBox extends Component {
  state = {checked: true}

  handleChange = (e) => {
    this.props.onChange(e.target.value, !this.state.checked)
    this.setState( (prev) => ({checked: !prev.checked}) )
  }
  render() {
    return (
        <label>
          { this.props.value }
          <input type="checkbox" value={ this.props.value } onChange={ this.handleChange } checked= {this.state.checked}/>
        </label>
    );
  }
}

export default CheckBox;

CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired

}