import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BeerInfo from './BeerInfo';

class ListBeers extends Component {
  styles = {
    container: {
      background: '#ffffff',
      padding: '10px',
      borderRadius: '10px',
      boxShadow: '0px 0px 25px 1px #d2c200'
    },
    title: {
      fontFamily: 'Raleway, sans-serif',
      fontSize: '22px',
      textAlign: 'center',
      color: '#ffffff'
    }
  }

  render() {
    return (
      <div>
      <h1 style={ this.styles.title }>- Beers -</h1>
      <div style={ this.styles.container }>
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
      </div>
    )
    
    
  }
}

export default ListBeers

ListBeers.propTypes = {
  beers: PropTypes.array.isRequired
}