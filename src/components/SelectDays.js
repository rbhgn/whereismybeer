import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'


class SelectDays extends Component {
  state = ({weekDays: null})

  styles = {display: 'flex', flexDirection: 'column'}

  handleChange = (value, checked) => {

    let newState = null
    if (!checked && this.state.weekDays.includes(value)) {
      newState = this.state.weekDays.filter(v => v !== value)
    } else if (checked && !this.state.weekDays.includes(value)) {
      newState = [value, ...this.state.weekDays]
    }
    this.props.updateSelectedWeekDays(newState)
    this.setState({weekDays: newState})
  }

  componentDidMount() {
    this.setState({weekDays: this.props.weekDays})
  }

  render() {
    return (
      <div style={ this.styles }>
        { this.state.weekDays && this.props.weekDays.map((v, i) => (
            <CheckBox 
              value={ v }
              onChange={ this.handleChange }
              key={ i }
            />
        )) }
      </div>
    )
  }
}

SelectDays.propTypes = {
  weekDays: PropTypes.array.isRequired,
  updateSelectedWeekDays: PropTypes.func.isRequired
}

export default SelectDays