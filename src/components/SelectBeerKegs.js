import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'

class SelectBeerKegs extends Component {
  
  handleChange = (value, checked) => {
    let newState = null
    if (!checked && this.state.selectedBeerStyles.includes(value)) {
      newState = this.state.selectedBeerStyles.filter(v => v !== value)
    } else if (checked && !this.state.selectedBeerStyles.includes(value)) {
      newState = [value, ...this.state.selectedBeerStyles]
    }
    newState && this.props.updateSelectedBeerKegs(newState)
    newState && this.setState({selectedBeerStyles: newState})
  }

  componentDidMount() {
    this.setState({selectedBeerStyles: this.props.beerStyles})
    this.props.updateSelectedBeerKegs(this.props.beerStyles)
  }

  render() {
    return (
      this.props.beerStyles.map((v, i) => (
        <CheckBox onChange={ this.handleChange } value={ v } key={ i }/>
       )) 
    )
  }
}

SelectBeerKegs.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  updatupdateSelectedBeerKegseQuery: PropTypes.func.isRequired
}

export default SelectBeerKegs