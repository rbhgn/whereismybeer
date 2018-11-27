import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckBox from './CheckBox'

class SelectBeerStyles extends Component {
  state = { selectedBeerStyles: null }

  styles = {display: 'flex', flexDirection: 'column'}

  handleChange = (value, checked) => {
    let newState = null

    if (!checked && this.state.selectedBeerStyles.includes(value)) {
      newState = this.state.selectedBeerStyles.filter(v => v !== value)
    } else if (checked && !this.state.selectedBeerStyles.includes(value)) {
      newState = [value, ...this.state.selectedBeerStyles]
    }
    newState && this.props.updateSelectedBeerStyles(newState)
    newState && this.setState({selectedBeerStyles: newState})
  }

  componentDidMount() {
    this.setState({selectedBeerStyles: this.props.beerStyles})
    this.props.updateSelectedBeerStyles(this.props.beerStyles)
  }

  render() {
    return (
      <div style={ this.styles }>
        { this.props.beerStyles.map((v, i) => (
          <CheckBox onChange={ this.handleChange } value={ v } key={ i }/>
        )) }
       </div> 
    )
  }
}

SelectBeerStyles.propTypes = {
  beerStyles: PropTypes.array.isRequired,
  updateSelectedBeerStyles: PropTypes.func.isRequired
}

export default SelectBeerStyles