import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BeerInfo from './BeerInfo';

class ListBeers extends Component {
  styles = {
    container: {
      background: '#ffffff',
      padding: '10px'
    },
    title: {
      fontFamily: 'Raleway, sans-serif',
      fontSize: '22px',
      textAlign: 'center'
    }
  }

  render() {
    return (
      <div style={ this.styles.container }>
        <h1 style={ this.styles.title }>- Beers -</h1>
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