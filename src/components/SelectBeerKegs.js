import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'

class SelectBeerKegs extends Component {
  state = { selectedBeerKegs: null }
  styles = {display: 'flex', flexDirection: 'column'}
  handleChange = (value, checked) => {
    let newState = null
    if (!checked && this.state.selectedBeerKegs.includes(value)) {
      newState = this.state.selectedBeerKegs.filter(v => v !== value)
    } else if (checked && !this.state.selectedBeerKegs.includes(value)) {
      newState = [value, ...this.state.selectedBeerKegs]
    }
    newState && this.props.updateSelectedBeerKegs(newState)
    newState && this.setState({selectedBeerKegs: newState})
  }

  componentDidMount() {
    this.setState({selectedBeerKegs: this.props.beerKegs})
  }

  render() {
    return (
      <div style={ this.styles }>
      { this.props.beerKegs.map((v, i) => (
        <CheckBox onChange={ this.handleChange } value={ v } key={ i }/>
       )) }
      </div> 
    )
  }
}

SelectBeerKegs.propTypes = {
  beerKegs: PropTypes.array.isRequired,
  updateSelectedBeerKegs: PropTypes.func.isRequired
}

export default SelectBeerKegs