import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BeerInfo from './BeerInfo';

class ListBeers extends Component {
  styles = {
    container: {
      background: '#ffffff'
    }
  }

  render() {
    return (
      <div style={ this.styles.container }>
        <h1>Beers</h1>
        {this.props.beers.map((v,i) => (
          <BeerInfo 
          alcohol={v.alcohol}
          brewery={v.brewery}
          keg={v.keg}
          name={v.name}
          style={v.style}
          volume={v.volume}
          key={ i }
          />
          ))}
      </div>
    )
    
    
  }
}

export default ListBeers

ListBeers.propTypes = {
  beers: PropTypes.array.isRequired
}